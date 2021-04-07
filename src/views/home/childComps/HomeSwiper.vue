<template>
 <div class="Home-Swiper">
   <Swiper>
     <swiper-item v-for="item in banners">
       <a :href="item.link">
         <img :src="item.image" alt="">
       </a>
     </swiper-item>
   </Swiper>
 </div>
</template>

<script>

import {Swiper,SwiperItem} from 'common/swiper';

export default {
  name: "HomeSwiper",
  components:{
    Swiper,
    SwiperItem
  },
 props:{
    banners:{
      type: Array,
      default(){
        return []
      }
    }
 }
}
</script>

<style scoped>

</style>
