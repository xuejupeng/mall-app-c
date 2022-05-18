<template>
  <div class="search-container">
    <div class="top">
      <van-icon name="arrow-left" class="icon" @click="$router.goBack()" />
      <van-search
        class="search-box"
        v-model="value"
        show-action
        :placeholder="place"
        @search="onSearch"
        @input="onInput(value)"
        @focus="onFocus"
      >
        <template #action v-if="showList">
          <span @touchend="onSearch(value)">搜索</span>
        </template>
        <template #action v-else>
          <span class="shop-car" @click="$router.push('/home/shopping')">
            <van-icon name="shopping-cart-o" id="shop-car" :badge="badge" />
          </span>
        </template>
      </van-search>
    </div>
    <div class="like-list" v-if="likeList.length && showList">
      <van-list>
        <van-cell v-for="item in likeList" :key="item" @click="onSearch(item)">
          <template>
            <span class="item-color" v-html="formatHTML(item)"></span>
          </template>
        </van-cell>
      </van-list>
    </div>
    <div class="search-list" v-if="!showList">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
      >
        <shopCard
          v-for="item in shopList"
          :key="item.id"
          v-bind="item"
          :num="counterMap[item.id]"
        />
      </van-list>
    </div>
    <div class="history" v-if="likeList.length <= 0 && showList">
      <my-history :searchList="searchList" @search="onSearch"></my-history>
    </div>
  </div>
</template>

<script>
import shopCard from '../components/shopCard.vue';
import MyHistory from '../components/MyHistory.vue';

export default {
  components: {
    shopCard,
    MyHistory,
  },
  data() {
    return {
      place: '酒',
      value: this.place,
      likeList: [],
      timer: null,
      loading: false,
      finished: false,
      page: 1,
      size: 5,
      shopList: [],
      showList: true,
      total: 0,
      searchList: [],
    };
  },
  computed: {
    counterMap() {
      return this.$store.state.counterMap;
    },
    badge() {
      const data = this.$store.state.counterMap;
      const count = Object.values(data).reduce((prev, next) => prev + next, 0);
      if (count > 99) {
        return '99+';
      }
      return count;
    },
  },
  created() {
    this.searchList = JSON.parse(localStorage.getItem('searchList')) || [];
  },
  methods: {
    async onLoad() {
      this.showList = false;
      const value = await this.$api.search(this.value, this.page, this.size);
      this.shopList = [...this.shopList, ...value.list];
      this.total = value.total;
      this.loading = false;
      if (this.shopList.length >= this.total) {
        this.finished = true;
      } else {
        this.page += 1;
      }
    },
    onSearch(value) {
      if (value) {
        this.value = value;
      } else {
        this.value = this.place;
      }
      const result = this.searchList.find((item) => item.value === this.value);
      if (result) {
        result.time = new Date().getTime();
        this.searchList.sort((a, b) => b.time - a.time);
      } else {
        this.searchList.unshift({
          value: this.value,
          time: new Date().getTime(),
        });
        if (this.searchList.length >= 11) {
          this.searchList.pop();
        }
      }
      localStorage.setItem('searchList', JSON.stringify(this.searchList));
      this.likeList = [];
      this.shopList = [];
      this.page = 1;
      this.finished = false;
      this.loading = true;
      this.onLoad();
    },
    async onInput() {
      if (this.value === '') {
        this.likeList = [];
        return;
      }
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      } else {
        this.timer = setTimeout(async () => {
          const value = await this.$api.likeSearch(this.value);
          this.likeList = value.result;
          clearTimeout(this.timer);
          this.timer = null;
        }, 300);
      }
    },
    onFocus() {
      this.showList = true;
    },
    formatHTML(item) {
      const reg = new RegExp(this.value);
      return item.replace(reg, this.value.fontcolor('red'));
    },
  },
};
</script>

<style scoped lang="less">
.search-container {
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 1000;
  .top {
    position: fixed;
    top: 0;
    width: 375px;
    margin: 0 auto;
    background: #fff;
    display: flex;
    align-items: center;
    z-index: 100;
    box-sizing: border-box;
    padding: 0 10px;
    .icon {
      font-size: 20px;
      color: gray;
    }
    .van-search__action {
      line-height: normal !important;
    }
    .search-box {
      flex: 1;
      .shop-car {
        font-size: 22px;
        display: inline-block;
        padding-top: 6px;
        box-sizing: border-box;
      }
    }
  }
  .like-list {
    box-sizing: border-box;
    padding-left: 30px;
    position: relative;
    top: 50px;
  }
  .search-list {
    width: 296px;
    margin: 48px auto 0;
    background: #fff;
    z-index: 10;
  }
  .history {
    width: 350px;
    background: #fff;
    position: absolute;
    top: 35px;
    left: 10px;
    z-index: 1;
  }
}
</style>
