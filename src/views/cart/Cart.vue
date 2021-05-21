<template>
    <div class="cart">
        <nav-bar class="class-nav">
            <div slot="center">购物车({{cartLength}})</div>
        </nav-bar>
    <scroll class="content" ref="scroll">
        <cart-list></cart-list>
    </scroll>
     <bottom-bar></bottom-bar>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'

import CartList from './childComps/CartList.vue'
import BottomBar from './childComps/BottomBar.vue'

export default {
    name: 'Cart',
    components:{
      NavBar,
      Scroll,
      CartList,
      BottomBar
    },
    computed:{
        cartLength(){
            return this.$store.state.cartList.length;
        }
    },
    activated(){
        this.$refs.scroll.refresh();
    }
};
</script>

<style scoped>
.class-nav{
    background-color: var(--color-tint);
    color:#fff;
}
.cart{
    height:100vh;
}
.content{
    height:calc(100% - 44px - 49px);
    overflow: hidden;
}
</style>