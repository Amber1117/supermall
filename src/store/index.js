import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        cartList: []
    },
    mutations: {
        addCounter(state, payload) {
            payload.count += 1

        },
        addGoodsToCart(state, payload) {
            payload.checked = true
            state.cartList.push(payload)
        }
    },
    actions: {
        addCart(context, payload) {
            //判断之前数组中是否有该商品
            return new Promise((resolve, reject) => {
                let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);
                if (oldProduct) {
                    context.commit('addCounter', oldProduct)
                    resolve('当前商品数量+1')
                } else {
                    payload.count = 1
                    context.commit('addGoodsToCart', payload)
                    resolve('添加了新的商品')
                }
            })

        }
    },
    getters: {
        cartList(state) {
            return state.cartList
        },
        cartCount(state) {
            return state.cartList.filter(item => {
                return item.checked
            }).reduce((counter, item) => {
                return counter + item.count
            }, 0)
        }
    }
})

export default store