<template>
    <div class="goods-list">
        <goods-list-item v-for="item in goods" :goods-item="item"></goods-list-item>
    </div>
</template>

<script>
import GoodsListItem from 'components/content/goods/GoodsListItem'

export default {
    name: 'GoodsList',
    data() {
        return {
            
        };
    },
    props:{
      goods:{
          type:Array,
          default(){
              return []
          }
      }
    },
   
    components:{
        GoodsListItem
    }
};
</script>

<style scoped>
.goods-list{
    display:flex;
    flex-wrap: wrap;
    justify-content:space-evenly;
}
</style>