<template>
    <div class="toast" v-show="iShow">
        {{message}}
    </div>
</template>

<script>
export default {
    name: 'Toast',
    components: {},
   
    data() {
        return {
           message:'',
           iShow:false
        };
    },
    methods:{
        show(message,duration=1500){
            this.message = message;
            this.iShow = true;
            setTimeout(()=>{
               this.iShow = false;
            },duration)
        }
    }

};
</script>

<style scoped>
.toast{
    position:fixed;
    z-index:999;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    padding:8px 10px;
   background: rgba(0, 0, 0, 0.7);
   color:#fff;

}
</style>