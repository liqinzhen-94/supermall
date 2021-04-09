<template>
   <div class="wrapper" ref="wrapper">
     <div class="content">
       <!-- 插槽 -->
       <slot></slot>
     </div>
   </div>
</template>

<script>

import BScroll from 'better-scroll'

export default {
  name: "Scroll",
  data(){
    return {
      scroll: null,
    }
  },
  props:{
    probeType:{
      type: Number,
      default(){
        return 0
      }
    },
    pullUpLoad: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  mounted() {

     //1.创建bscroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      probeType: this.probeType,  //实时监听
      pullUpLoad: this.pullUpLoad,  //下来加载更多
      click: true

    })

    //2.实时监听滚动的位置
    this.scroll.on('scroll',position=>{
       this.$emit('scroll',position)

    })

    //3.上拉加载更多
    this.scroll.on('pullingUp',()=>{
      this.$emit('pullingUp')
    })





  },
  updated() {
    //重新计算高度
/*    this.scroll.refresh();
    //当数据加载完毕以后通知better-scroll
    this.scroll.finishPullUp();*/
  },
  methods:{

    refresh(){
      //确保this.scroll不为空
      this.scroll && this.scroll.refresh()
    },

    scrollTo(x,y,time){
      //回到顶部
      this.scroll && this.scroll.scrollTo(x,y,time)
    },

    //当数据加载完毕以后通知better-scroll
    finishPullUp(){
      this.scroll.finishPullUp()
    }
  }
}
</script>

<style scoped>

</style>
