<template>
  <div class="shop-card-container">
    <div class="shop-list" >
      <div class="image">
        <img :src="images[0]" ref="image"/>
      </div>
      <div class="title">
        <h3 class="title-item">{{ title }}</h3>
        <p class="desc">{{ desc }}</p>
        <div class="tags">
            <div v-for="i in tags" :key="i">
                {{ i }}
            </div>
        </div>
        <div class="price">
          <span>{{
            "¥" + price
          }}</span>
        </div>
        <div class="counter">
            <span @touchend="handleCounter(id, -1)" v-if="num">
                <van-icon name="minus" class="minus"/></span>
            <span class="num" v-if="num">{{num}}</span>
            <span @touchend="handleCounter(id, 1)"><van-icon name="plus" class="plus"/></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Animate from '../tools/animate/index';

export default {
  props: ['images', 'tags', 'title', 'price', 'desc', 'id', 'num', 'nofly'],
  methods: {
    handleCounter(id, num) {
      this.$store.commit('storyChange', { id, value: num });
      if (num === -1) {
        return;
      }
      if (this.nofly) {
        return;
      }
      const { offsetWidth: imgWidth, offsetHeight: imgHeight } = this.$refs.image;
      const { left: imageLeft, top: imageTop } = this.$refs.image.getBoundingClientRect();
      const shopCar = document.getElementById('shop-car');
      const { offsetWidth: carWidth, offsetHeight: carHeight } = shopCar;
      const { left: carLeft, top: carTop } = shopCar.getBoundingClientRect();
      const endX = carWidth / 2 + carLeft;
      const endY = carHeight / 2 + carTop;
      Animate({
        startX: imageLeft,
        startY: imageTop,
        endX,
        endY,
        src: this.$refs.image.src,
        width: imgWidth,
        height: imgHeight,
      });
    },
  },
};
</script>

<style scoped lang="less">
.shop-card-container{
   border-bottom:2px solid #eee;
  .shop-list {
    height: 100px;
    width: 296px;
    display: flex;
    margin-top: 11px;
    .counter{
      display: flex;
      justify-content: flex-end;
      margin-top:-16px;
      .plus, .minus{
          height: 16px;
          width: 16px;
          background: #ff1a90;
          border-radius: 50%;
          color: #fff;
          text-align:center;
          line-height: 16px;
          font-weight: bolder;
      }
      .num{
        padding:0 5px;
        font-weight: bold;
        font-size: 14px;
        line-height: 16px;
        width: 16px;
        height: 16px;
        text-align: center;
      }
    }
    .image {
      height: 90px;
      width: 90px;
      img {
        height: 90px;
        width: 90px;
      }
    }
    .title {
      margin-left: 20px;
      width: 170px;
      margin-top: 5px;
      box-sizing: border-box;
      .title-item {
        font-size: 13px;
        font-weight: normal;
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .desc {
        font-size: 11px;
        color: #cecece;
        margin-top: 5px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .tags {
        div{
 border: 1px solid #cecece;
        color: #cecece;
        font-size: 10px;
        padding: 2px;
        border-radius: 5px;
        margin-top: 4px;
        display: inline-block;
        margin-right: 5px;
        }
      }
      .price {
        margin-top: 4px;
        font-size: 14px;
        color: #ff1a90;
        font-weight: bold;
        .price-off {
          margin: 0 5px;
        }
      }
    }
  }
}
</style>
