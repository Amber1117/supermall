import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index'
import toast from 'components/common/toast'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false
    //当执行Vue.use(toast)，实际上是去执行toast的install方法
Vue.use(toast)

//使用懒加载
Vue.use(VueLazyLoad)

//添加事件总线
Vue.prototype.$bus = new Vue();
new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')