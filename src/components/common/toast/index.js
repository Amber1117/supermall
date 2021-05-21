const obj = {}
import Toast from './Toast'

obj.install = function(Vue) {
    //创建组件构造器
    const toastContrustor = Vue.extend(Toast);
    //创建一个组件对象
    const toast = new toastContrustor();
    //手动将组件对象挂载到某一元素上
    toast.$mount(document.createElement('div'));
    document.body.appendChild(toast.$el);
    Vue.prototype.$toast = toast
}
export default obj