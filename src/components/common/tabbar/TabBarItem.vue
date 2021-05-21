<template>
    <div class="tab-bar-item" @click="itemClick()">
        <div v-if="!isActive"><slot name="item-icon"></slot></div>
        <div v-else><slot name="item-icon-active" ></slot></div>        
        <div :style="isActive?{color:this.activeColor}:{}"><slot name="item-text"></slot></div>
        
    </div>
</template>

<script>
export default {
    name: 'TabBarItem',
    data() {
        return {
            // isActive:true,

        };
    },
    props:{
       path:{
           type:String
       },
       activeColor:{
           type:String,
           dafault:'red'
       }
    },
    computed:{
        isActive(){
            return this.$route.path.indexOf(this.path)!==-1
        },
    },
   
    methods: {
        itemClick(){
            // console.log(this.path)
            // console.log(this.$router)
            // this.$router.replace(this.path).catch(err => err)
            this.$router.replace(this.path)
            
        }
    },
};
</script>

<style scoped>
.tab-bar-item{
  flex:1;
  text-align:center;
  height: 49px;
  font-size:14px;
  margin-top:5px;
  vertical-align: center;
}
.tab-bar-item img{
    width:25px;
}

</style>