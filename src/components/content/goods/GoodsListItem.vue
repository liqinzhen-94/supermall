<template>
  <div class="goods-item">
     <img :src="goodsItem.show.img" alt="" @load="imageLoad">
     <div class="goods-info">
       <p>{{goodsItem.title}}</p>
       <span class="price">{{goodsItem.price}}</span>
       <span class="collect">{{goodsItem.cfav}}</span>
     </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "GoodsListItem",
  props:{
    goodsItem: {
      type: Object,
      default(){
        return {}
      }
    }
  },
  methods:{
    //监听图片的加载
    imageLoad(){
      //事件总线监听，$bus发出的事件会发送到事件总线
      //设置事件总线：Vue实例可以作为一个事件总线
      //在main.js中设置Vue.prototype.$bus = new Vue，即设置一个事件总线，也就是说$bus是一个vue实例
      this.$bus.$emit('itemImageLoad')
      console.log('图片加载监听')
    }
  }
}
</script>
sas
<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;

  width: 48%;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
