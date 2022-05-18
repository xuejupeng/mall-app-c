<template>
  <div class="twobar-container" ref="twobar">
      <div v-for="(item, i) in barList" :key='item' :class="{active: i === index}"
           @touchend="handleEnd(i, $event)"
           @touchstart="move=false"
           @touchmove="move=true">
          {{ i === 0 ? '全部' : item }}
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import moveTo from '../util/scroll';

export default {
  computed: {
    ...mapState({
      barList: (state) => state.barList,
    }),
  },
  data() {
    return {
      index: 0,
      move: false,
    };
  },
  methods: {
    handleEnd(i, e) {
      if (this.move) {
        return;
      }
      this.index = i;
      const { twobar } = this.$refs;
      const sTop = e.target.getBoundingClientRect().top;
      const sHeight = e.target.offsetHeight;
      const wrapTop = twobar.getBoundingClientRect().top;
      const wrapHeight = twobar.offsetHeight;
      const scrollCenter = sTop + (sHeight / 2) - wrapTop - (wrapHeight / 2);
      moveTo(twobar.scrollTop, scrollCenter, twobar, 'scrollTop');
      this.$store.commit('resetShopList');
      this.$store.dispatch('setShopList', {
        type: this.barList[i], page: 1, size: 10, sort: 'all',
      });
    },
  },
};
</script>

<style lang="less" scoped>
.twobar-container{
  position: fixed;
  left: 0;
  top: 135px;
  width: 79px;
  bottom: 50px;
  background:#f8f8f8;
  overflow: auto;
  div{
      width: 79px;
      text-align:center;
      height: 40px;
      line-height: 40px;
      position: relative;
  }
  .active{
      font-weight: bold;
      color: #ff1a90;
  }
  .active::before{
      position: absolute;
      width: 6px;
      height: 18px;
      background: #ff1a90;
      top: 50%;
      transform: translateY(-50%);
      left: 0;
      content: '';
  }
}
.twobar-container::-webkit-scrollbar{
  width:0;
  background: none;
}
</style>
