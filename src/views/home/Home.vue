<template>
    <div id="home">
        <nav-bar class="class-nav">
            <div slot="center">购物街</div>
        </nav-bar>
 
<tab-control 
       :title="['流行','新款','精选']"
        class="tab-control"
        @tabClick="tabClick"
        ref="tabControl1"
        v-show="isTabFixed"
        ></tab-control>

        <scroll class="content" 
        ref="scroll" 
        :probe-type="3" 
        @scroll="contentScroll"
        :pull-up-load="true"
        @pullingUp="loadMore" >

         <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
       <recommend-views :recommends="recommends"></recommend-views>
       <feature-view></feature-view>
       <tab-control 
       :title="['流行','新款','精选']"
        class="tab-control"
        @tabClick="tabClick"
        ref="tabControl2"
        :class="{fixed:isTabFixed}"></tab-control>
       <goods-list :goods="goods[currentType].list"></goods-list>

        </scroll>
         <back-top @click.native="backClick" v-show="isShow"></back-top>
    </div>
</template>

<script>
//导入公共组件
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backtop/BackTop'
//导入首页组件
import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendViews from './childComps/RecommendViews.vue'
import FeatureView from './childComps/FeatureView.vue'
//导入封装后的网络请求方法
import {getHomeMultidata,getHomeGoods} from 'network/home.js'

import {debounce} from '../../common/utils.js'
import {itemListenerMixin} from '../../common/mixin.js'

export default {
    name: 'Home',
    mixins:[itemListenerMixin],
    data(){
       return {
        //保存请求来的轮播图与导航图片与文字
         banners:[],
         recommends:[],
         //保存请求过来的商品数据
         goods:{
             //根据后台数据命名，三种数据一一对应
             'pop':{page:0,list:[]},
             'new':{page:0,list:[]},
             'sell':{page:0,list:[]},
         },
         currentType:'pop',
         isShow:false,
         tabOffsetTop:0,
         isTabFixed:false,
         saveY:0,
         itemImgListener:null
       }       
    },
    components:{
       NavBar,
       HomeSwiper,
       GoodsList,
       Scroll,
       BackTop,
       TabControl,
       RecommendViews,
       FeatureView,
      getHomeMultidata,
      getHomeGoods
    },
    created(){
        //发送网络请求
      this.getHomeMultidata();
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');

    
    },
    activated(){
    this.$refs.scroll.scrollTo(0,this.saveY,1);
    this.$refs.scroll.refresh()
    },
        deactivated(){
            //保存Y值
    this.saveY = this.$refs.scroll.scroll.y;
    //取消全局时间的监听
    this.$bus.$off('itemImgLoad',this.itemImgListener)
    },
    mounted(){
    
    },
    methods:{
        //网络请求的具体操作
        //请求轮播图与导航图片与文字
      getHomeMultidata(){
       getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;

        })
      },
      //请求商品数数据
   getHomeGoods(type){
     const page = this.goods[type].page+1;
     getHomeGoods(type,page).then(res =>{
         this.goods[type].list.push(...res.data.list);
         this.goods[type].page++;   
         //better-scroll默认只加载一次要调用finishPullUp才会继续调用
         this.$refs.scroll.finishPullUp();
         
     }) 
   },
   tabClick(index){
      switch(index){
          case 0:
          this.currentType = 'pop';
          break;
           case 1:
          this.currentType = 'new';
          break;
           case 2:
          this.currentType = 'sell';
          break;
      }
      //同步两个tabControl的点击状态
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;

   },
   backClick(){
       //
     this.$refs.scroll.scrollTo(0,0,500); 
   },
   contentScroll(position){
       //1.回到顶部按钮的位置
       this.isShow = (-position.y)  > 1000;
       //2.判断tabcontrol是否吸顶
      this.isTabFixed = (-position.y)  > this.tabOffsetTop;
   },
   //上拉发送新的网络请求
   loadMore(){
       this.getHomeGoods(this.currentType);
   },
   //2.计算tabcontrol的offsetTop
swiperImageLoad(){
    this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
         
}

}
}
</script>

<style scoped>
.class-nav{
    background-color: var(--color-tint);
    color:#fff;
}
#home{
position: relative;
height:100%;
 /* margin-top:44px; */
height:100vh; 
}

.content{
    position: absolute;
    overflow: hidden;
    top:44px;
    bottom:49px;
    left:0;
    right:0;
    height:100%;

    
}
.content{
    height: calc(100% - 93px);
}
/* .fixed{
    position:fixed;
    top:44px;
    left:0;
    right:0;
} */
.tab-control {
    position: relative;
    z-index: 9;
}
</style>