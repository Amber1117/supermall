<template>
    <div class="detail">
        <detail-nav-bar class="nav-bar" @itemClick="titleClick" ref="nav"></detail-nav-bar>
      <scroll class="content" 
      ref="scroll" 
      @scroll="contentScroll"
      :probe-type="3">
            <detail-swiper :top-images="topImages"></detail-swiper>
            <detail-base-info :goods="goods"></detail-base-info>
            <detail-shop-info :shop="shop"></detail-shop-info>
            <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
            <detail-param-info :param-info="paramInfo" ref="param"></detail-param-info>
            <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
            <goods-list :goods="recommendGoods" ref="recommend"></goods-list>
      </scroll>
      <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
      <back-top @click.native="backClick" v-show="isShow"></back-top>
      
    </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import DetailBottomBar from './childComps/DetailBottomBar.vue'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backtop/BackTop'
import Toast from 'components/common/toast/Toast'

import {getDetailData,Goods,Shop,GoodsParam,getRecommendGood} from 'network/detail.js'
import {debounce} from '../../common/utils.js'
import {itemListenerMixin,backTopMixin} from '../../common/mixin.js'
import { setTimeout } from 'timers';

export default {
    name: 'Detail',
    mixins:[itemListenerMixin,backTopMixin],
    data() {
        return {
            iid:null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            paramInfo: {},
            commentInfo:{},
            recommendGoods:[],
            itemImgListener:null,
            themeTops:[],
            currentIndex:0,
          
        };
    },
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        DetailBottomBar,
        Scroll,
        GoodsList,
        BackTop,
       
    },
    created(){
        //保存商品ID
        this.iid = this.$route.params.id
        //根据ID请求商品数据
        getDetailData(this.iid).then(res => {
            const data = res.result;
           this.topImages = data.itemInfo.topImages;
           console.log(res);
           //保存商品下方描述信息
           this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services);
           //保存商品店铺信息
           this.shop = new Shop(data.shopInfo);
           //保存商品详细信息
           this.detailInfo = data.detailInfo;
           //保存商品参数
           this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
             // 保存评论信息
           if (data.rate.list) {
            this.commentInfo = data.rate.list[0];
            }
            this.$nextTick(()=>{
                // this.themeTops=[];
                // this.themeTops.push(0);
                // this.themeTops.push(this.$refs.param.$el.offsetTop);
                // this.themeTops.push(this.$refs.comment.$el.offsetTop);
                // this.themeTops.push(this.$refs.recommend.$el.offsetTop);
                // console.log(this.themeTops)
            })
        })
        //请求推荐数据
        getRecommendGood().then(res => {
           this.recommendGoods = res.data.list;
        })
    },
    mounted(){
    
    },
    detroyed(){
          this.$bus.$off('itemImgLoad',this.itemImgListener)
    },
    methods: {
        imageLoad(){
            // console.log('refresh');
            this.$refs.scroll.refresh();
                this.themeTops=[];
                this.themeTops.push(0);
                this.themeTops.push(this.$refs.param.$el.offsetTop);
                this.themeTops.push(this.$refs.comment.$el.offsetTop);
                this.themeTops.push(this.$refs.recommend.$el.offsetTop);
                this.themeTops.push(Number.MAX_VALUE);
                
                console.log(this.themeTops)
        },
        //点击商品参数，推荐跳转本页面指定位置
         titleClick(index){
         this.$refs.scroll.scrollTo(0,-this.themeTops[index],200); 
      },
      //监听滚动，当滚动到指定区域，更换导航样式
      contentScroll(position){
          //保存滚动位置
          const positionY = -position.y
        //与themeTops进行比较
        let length = this.themeTops.length;
        for(let i = 0;i < length -1; i++){
            if(this.currentIndex!==i && (positionY >= this.themeTops[i] && positionY < this.themeTops[i+1])){
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex;
            }
        }
         //回到顶部按钮的位置
       this.isShow = (-position.y)  > 1000;
      },
      addToCart(){
           // 1.创建对象
        const obj = {}
        // 2.对象信息
        obj.iid = this.iid;
        obj.imgURL = this.topImages[0]
        obj.title = this.goods.title
        obj.desc = this.goods.desc;
        obj.newPrice = this.goods.realPrice;

        this.$store.dispatch('addCart',obj).then(res => {
            //传统的显示toast的方法
            // this.message = res;
            // this.iShow = true;
            // setTimeout(()=>{
            //    this.iShow = false;
            // },1500)
            // console.log(res)

            //使用封装后的toast插件的方法
            this.$toast.show(res,2000);
        });
        
      }
    },
};
</script>

<style scoped>
.detail{
    position:relative;
    z-index:9;
    height: 100vh;
    background-color: #fff;
}
.content{
    height:calc(100% - 44px - 55px);
    background-color: #fff;
}
.nav-bar{
    position: relative;
    background-color: #fff;
    z-index:9;
}
</style>