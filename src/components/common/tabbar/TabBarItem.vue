<template>

     <div class="tabbar-item" @click="itemClick()">
       <div  v-if = "!isActive">
         <slot name = "item-icon" ></slot>
       </div>
       <div v-else>
         <slot  name = "item-icon-active" ></slot>
       </div>
       <div  :style="activeStyle" >
         <slot name = "item-text" ></slot>
       </div>

     </div>

</template>

<script>
export default {
  name: "TabBarItem",
  //父组件给子组件传值
  props: {
    path:{
      type: String
    },
    activeColor:{
      type:String,
      default: '#ff5777'
    }
  },
  data(){
    return{
      //isActive: true
    }
  },
  computed:{
    isActive(){
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle(){
      return this.isActive ? {color:this.activeColor} : {}
    }
  },
  methods:{
    itemClick(){
      console.log('ietmClick');
      this.$router.replace(this.path)
    }

  }
}
</script>

<style scoped>
.tabbar-item{
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tabbar-item img{
  width: 24px;
  height: 24px;
  margin-top:3px;
  vertical-align: middle;
  margin-bottom: 2px;
}/*
.active{
  color: red;
}*/
</style>
