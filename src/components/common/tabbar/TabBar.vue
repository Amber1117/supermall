<template>
     <div id="tab-bar">
     <slot></slot>
   </div>
</template>

<script>
export default {
    name: 'TabBar',

    data() {
        return {
            
        };
    },
    mounted() {
        
    },
    methods: {
        
    },
};
</script>

<style scoped>

#tab-bar{
  display:flex;
  position: fixed;
  bottom:0;
  left:0;
  right:0;
  height:49px;
  background-color: #f6f6f6;
  box-shadow: 0 2px 2px rgba(100,100,100,0.2);
}

</style>