<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
      <Scroll class="content"
              ref="scroll"
              :probe-type="3"
              :pull-up-load="true"
              @scroll="contentScroll"
              @pullingUp="loadMore">
        <home-swiper :banners="banners"></home-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
        <feature-view></feature-view>
        <tab-control class="tab-control"
                     :titles="['流行','新品','精选']"
                     @tabClick="tabClick">
        </tab-control>
        <good-list :goods="showGoods"></good-list>
      </Scroll>
      <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>


import Scroll from "@/components/common/scroll/Scroll";
import NavBar from "common/navbar/NavBar";
import TabControl from "@/components/content/tabControl/TabControl";
import BackTop from "@/components/content/backTop/BackTop";

import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import RecommendView from "@/views/home/childComps/RecommendView";
import FeatureView from "@/views/home/childComps/FeatureView";
import GoodList from "@/components/content/goods/GoodList";

import {getHomeMultiData,getHomeGoods} from 'network/home';

export default {
  name: "Home",
  components: {
    BackTop,
    TabControl,
    FeatureView,
    RecommendView,
    NavBar,
    HomeSwiper,
    GoodList,
    Scroll

  },
  data(){
    return{
      banners: [],
      recommends: [],
      goods: {
        'pop' : {page : 0,list : []},
        'new' : {page : 0,list : []},
        'sell' : {page : 0,list: []}
      },
      currentType: 'pop',
      isShowBackTop: false

    }
  },

  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },

  created() {
    //获取首页多个数据
    this.getHomeMultiData()
    //获取首页商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },

  mounted() {
    //监听事件总线:item中的图片加载完成
    //在main.js中设置Vue.prototype.$bus = new Vue，即设置一个事件总线，也就是说$bus是一个vue实例
    this.$bus.$on('itemImageLoad',()=>{
      //在created中可能拿不到$refs
      this.$refs.scroll.refresh()
    })

  },
  methods:{
    /**
     *事件监听相关的方法
     * */

    //监听下拉加载更多事件
    loadMore(){
      //调用获取商品数据的方法
      this.getHomeGoods(this.currentType)
      //刷新scroll,重新计算可滚动高度
      this.$refs.scroll.scroll.refresh()
    },

    //监听回到顶部事件
    contentScroll(position){
      //如果当前位置的y值大于1000，则显示回到顶部图标
       this.isShowBackTop = (-position.y) > 1000
    },

    //监听回到顶部事件
    backClick(){
      console.log('回到顶部按钮')
       this.$refs.scroll.scrollTo(0,0,500)
    },

    //监听点击事件
    tabClick(index){
      console.log(index)
      switch (index){
        case 0:
          this.currentType = 'pop'
          break;
        case 1:
          this.currentType = 'new'
          break;
        case 2:
          this.currentType = 'sell'
      }

    },

     /**
      * 网络请求相关的方法
     * */
    //获取首页多个数据
     getHomeMultiData(){
       getHomeMultiData().then(res => {
         this.banners = res.data.banner.list;
         this.recommends = res.data.recommend.list;
       })
     },

    //获取首页商品数据
    getHomeGoods(type){

       //页码等于当前页面加1
       const page = this.goods[type].page += 1

       getHomeGoods(type,page).then(res=>{

         //将获取到的数据保存到goods对象对应的类型的数组中
         this.goods[type].list.push(...res.data.list)

         //页码加1
         this.goods[type].page += 1

         //当数据加载完毕以后通知better-scroll
         this.$refs.scroll.finishPullUp()

       })
    },



  },

}
</script>

<style scoped>
#home{
  padding: 44px;
  height: 100vh; /*100视口*/
  position: relative;
}
.home-nav{
  background-color: var(--color-tint);
  color: white;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.tab-control{
/*  position: sticky;*/
  top: 44px;
  z-index: 9;
}
.content{
  position: absolute;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 0;
  overflow: hidden;
}
/*.content{
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;

}*/

</style>
