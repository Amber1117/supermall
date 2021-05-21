import { debounce } from './utils.js'
import BackTop from 'components/content/backtop/BackTop'

export const itemListenerMixin = {
    mounted() {
        //1.图片完场加载的时间监听
        let newrefresh = debounce(this.$refs.scroll.refresh, 200)
        this.itemImgListener = () => {
            //每张图片加载完成都重新计算可滚动高度
            newrefresh()
        }
        this.$bus.$on('itemImageLoad', this.itemImgListener)
            // console.log('你好')
    }
}

export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isShow: false,
        }
    },
    methods: {
        backClick() {
            this.$refs.scroll.scrollTo(0, 0, 500);
        },
    }
}