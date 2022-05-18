<template>
  <div class="classification-container">
    <div class="search-wap">
      <router-link
        :to="{ name: 'Search' }"
        custom
        v-slot="{ navigate }"
        class="search-btn"
      >
        <div @click="navigate" @keypress.enter="navigate" role="link">
          <van-icon name="search" />
          <div>苹果特价1元1斤</div>
        </div>
      </router-link>
    </div>
    <OneTab />
    <template v-if="showContent">
      <twoBar />
      <ShopList />
    </template>
    <van-loading vertical v-else />
  </div>
</template>

<script>
// eslint-disable-next-line import/no-unresolved
import OneTab from '@/components/OneTab.vue';
// eslint-disable-next-line import/no-unresolved
import TwoBar from '@/components/TwoBar.vue';
// eslint-disable-next-line import/no-unresolved
import ShopList from '@/components/ShopList.vue';

export default {
  components: {
    OneTab,
    TwoBar,
    ShopList,
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    showContent() {
      return this.$store.state.showContent;
    },
    barList() {
      return this.$store.state.barList;
    },
  },
  watch: {
    showContent() {
      if (this.showContent) {
        this.$store.commit('resetShopList');
        this.$store.dispatch('setShopList', {
          type: this.barList[0],
          page: 1,
          size: 10,
          sort: 'all',
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.classification-container {
  width: 375px;
  .search-wap {
    height: 55px;
    width: 375px;
    background: #fff;
    position: fixed;
    top: 0;
  }
  .search-btn {
    width: 355px;
    height: 33px;
    margin: 11px auto 0;
    border-radius: 10px;
    background: #eee;
    text-align: center;
    > * {
      display: inline-block;
      line-height: 33px;
      font-size: 14px;
      color: #a1a1a1;
      vertical-align: middle;
    }
  }
}
</style>
