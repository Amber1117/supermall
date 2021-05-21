<template>
    <div>
       <swiper class="swiper-item">
           <swiper-item v-for="item in topImages" >
           <img :src="item" alt="">
           </swiper-item>
       </swiper> 
    </div>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper/index.js'

export default {
    name: 'DetailSwiper',
    components: {
        Swiper,
        SwiperItem,
     },
  
    data() {
        return {
            
        };
    },
    props:{
      topImages:{
          type:Array,
          default(){
              return []
          }
      }
    },
    mounted() {
        
    },
    methods: {
        
    },
};
</script>

<style scoped>
.swiper-item{
    height:300px;
}
</style>