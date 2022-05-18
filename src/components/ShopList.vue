<template>
  <div class="shop-list-container">
    <TopScreen @handleClick="handleEnd" />
    <div
      class="shop-list-box"
    >
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="false"
        >
        <shopCard v-for="item in dataList.shopList" :key="item.id"
         v-bind="item" :num="dataList.counterMap[item.id]"/>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import TopScreen from './TopScreen.vue';
import shopCard from './shopCard.vue';

export default {
  data() {
    return {
      page: 1,
      size: 10,
      type: 'all',
      isLoading: false,
      loading: false,
      finished: false,
    };
  },
  components: {
    TopScreen,
    shopCard,
  },
  computed: {
    dataList() {
      return {
        shopList: this.$store.state.shopList,
        barList: this.$store.state.barList,
        counterMap: this.$store.state.counterMap,
      };
    },
  },
  methods: {
    onRefresh() {
      this.isLoading = true;
      this.loading = false;
      this.finished = false;
      this.page = 1;
      this.$store.commit('resetShopList');
      this.$store.dispatch('setShopList', {
        page: 1,
        size: this.size,
        sort: this.type,
      });
      this.isLoading = false;
    },
    async onLoad() {
      console.log('a');
      this.page += 1;
      this.loading = true;
      const result = await this.$store.dispatch('setShopList', {
        page: this.page,
        size: this.size,
        sort: this.type,
      });
      if (result) {
        this.loading = false;
      } else {
        this.finished = true;
      }
    },
    handleEnd(data) {
      this.type = data.type;
      this.onRefresh();
    },
  },
};
</script>

<style scoped lang="less">
.shop-list-box::-webkit-scrollbar {
  width: 0;
  background: none;
}
.shop-list-box {
  overflow-y: scroll;
  height: 100%;
  padding-bottom: 50px;
}
.shop-list-container {
  margin-left: 79px;
  width: 296px;
  margin-top: 160px;
  height: 476px;
}
.van-pull-refresh{
    overflow: unset !important;
}
</style>
