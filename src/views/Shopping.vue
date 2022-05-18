<template>
  <div class="shopping-container">
    <div class="nav-top">
      <van-nav-bar
        title="购物车"
        right-text="删除"
        @click-right="del"
      />
    </div>
    <div class="shop-list">
      <van-checkbox-group v-model="result" ref="checkboxGroup">
        <div class="shop-box" v-for="item in list" :key="item.id">
        <van-checkbox class="check" :name="item.id"></van-checkbox>
        <shop-card v-bind="item" :num="counterMap[item.id]" :nofly="true"></shop-card>
        </div>
      </van-checkbox-group>
    </div>
    <van-submit-bar :price="allMoney" :button-text="`去结算(${totalNum})`" @submit="onSubmit">
  <van-checkbox v-model="checked" @click="checkAll">全选</van-checkbox>
</van-submit-bar>
  </div>
</template>

<script>
import { Toast, Dialog } from 'vant';
import shopCard from '../components/shopCard.vue';

export default {
  components: {
    shopCard,
  },
  data() {
    return {
      result: [],
      list: [],
      checked: false,
    };
  },
  watch: {
    result() {
      if (this.result.length === this.list.length) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    },
  },
  methods: {
    async del() {
      if (this.result.length === 0) {
        Toast('你没有选中商品');
        return;
      }
      try {
        await Dialog.confirm({ message: '您是否要删除已选中的商品' });
        this.result.forEach((id) => {
          this.$store.commit('storyChange', { id, value: -Infinity });
          this.list = this.list.filter((item) => !this.result.includes(item.id));
        });
      } catch (error) {
        Toast('您点击了取消');
      }
    },
    async getAllData() {
      const result = Object.keys(this.counterMap);
      const res = await this.$api.getGoodsByIds(result.join());
      this.list = res.list;
    },
    onSubmit() {},
    checkAll() {
      if (this.checked) {
        this.$refs.checkboxGroup.toggleAll(true);
      } else {
        this.$refs.checkboxGroup.toggleAll(false);
      }
    },
  },
  computed: {
    counterMap() {
      return this.$store.state.counterMap;
    },
    allMoney() {
      const resArr = this.list.filter((item) => this.result.includes(item.id));
      return resArr.reduce((prev, next) => {
        const num = this.counterMap[next.id] || 0;
        return Math.round(num * next.price * 100) + prev;
      }, 0);
    },
    totalNum() {
      const resArr = this.list.filter((item) => this.result.includes(item.id));
      const res = resArr.reduce((prev, next) => prev + (this.counterMap[next.id] || 0), 0);
      return res;
    },
  },
  created() {
    this.getAllData();
  },
};
</script>

<style scoped lang="less">
.shopping-container {
  background: #eee;
  min-height: 100vh;
  .nav-top {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10;
  }
  .shop-list{
    width: 100%;
    position: absolute;
    top: 46px;
    z-index: 0;
    box-sizing: border-box;
    padding: 10px 10px 100px 10px;
    background: #fff;
    .shop-box{
      display: flex;
      justify-content: center;
    }
    .check{
      margin-right:10px;
      flex-shrink: 0;
    }
  }
  .van-submit-bar{
    bottom: 50px;
  }
}
</style>
