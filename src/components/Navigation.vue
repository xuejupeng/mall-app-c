<template>
  <div class="navigation-container">
    <van-tabbar route fixed>
      <van-tabbar-item :to="{name:'Home'}" icon="wap-home-o" >首页</van-tabbar-item>
      <van-tabbar-item :to="{name:'Classification'}" icon="apps-o" >分类</van-tabbar-item>
      <van-tabbar-item :to="{name: 'Shopping'}" :badge="badge" icon="shopping-cart-o" id="shop-car">
        购物车</van-tabbar-item>
      <van-tabbar-item :to="{name: 'My'}" icon="user-circle-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    badge() {
      const data = this.$store.state.counterMap;
      const count = Object.values(data).reduce((prev, next) => prev + next, 0);
      if (count > 99) {
        return '99+';
      }
      return count;
    },
  },
};
</script>

<style>
</style>
