/* eslint-disable import/extensions */
<template>
  <div class="one-tab-container" ref='oneTab'>
    <div
      class="item"
      v-for="(item, i) in menuList"
      :key="item.title"
      @touchend="handleEnd(i, $event)"
      @touchmove="move = true"
      @touchstart="move = false"
      :class="{active: index === i}"
    >
      <div class="image">
        <img :src="item.imgURL" />
      </div>
      <div class="title">
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import moveTo from '../util/scroll';

export default {
  data() {
    return {
      index: 0,
      move: false,
      menuList: [
        {
          title: '时令水果',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/时令水果.jpg',
        },
        {
          title: '酒水冲调',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/酒水冲调.jpg',
        },
        {
          title: '安心乳品',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/安心乳品.jpg',
        },
        {
          title: '休闲零食',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/休闲零食.jpg',
        },
        {
          title: '肉蛋食材',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/肉蛋食材.jpg',
        },
        {
          title: '新鲜蔬菜',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/新鲜食材.jpg',
        },
        {
          title: '熟食餐饮',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/熟食餐饮.jpg',
        },
        {
          title: '海鲜水产',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/海鲜水产.jpg',
        },
        {
          title: '粮油调味',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/粮油调味.jpg',
        },
        {
          title: '某手美食',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/某手美食.jpg',
        },
        {
          title: '纸杯清洁',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/纸品清洁.jpg',
        },
        {
          title: '个人护理',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/个人护理.jpg',
        },
        {
          title: '美妆护肤',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/美妆护肤.jpg',
        },
        {
          title: '家居收纳',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家居收纳.jpg',
        },
        {
          title: '家用电器',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家用电器.jpg',
        },
        {
          title: '3C数码',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/3C数码.jpg',
        },
        {
          title: '母婴用品',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/母婴用品.jpg',
        },
        {
          title: '鲜花绿植',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/鲜花绿植.jpg',
        },
        {
          title: '宠物用品',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/宠物用品.jpg',
        },
        {
          title: '图书玩具',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/图书文具.jpg',
        },
        {
          title: '手表配饰',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/手表配饰.jpg',
        },
      ],
    };
  },
  methods: {
    ...mapActions(['setBarList']),
    handleEnd(i, e) {
      if (this.move) {
        return;
      }
      this.index = i;
      const wrapWidth = this.$refs.oneTab.offsetWidth;
      const sLeft = e.target.getBoundingClientRect().left;
      const sWidth = e.target.offsetWidth;
      const scrollCenter = (sWidth / 2) + sLeft - (wrapWidth / 2);
      moveTo(this.$refs.oneTab.scrollLeft, scrollCenter, this.$refs.oneTab, 'scrollLeft');
      this.$store.commit('resetShopList');
      this.setBarList(this.menuList[i].title);
    },
  },
  created() {
    this.$store.commit('resetShopList');
    this.setBarList(this.menuList[0].title);
  },
};
</script>

<style lang="less" scoped>
.one-tab-container::-webkit-scrollbar{
    width:0;
    background:none;
  };
.one-tab-container {
  display: flex;
  width: 375px;
  height: 104px;
  overflow-y: auto;
  box-sizing: border-box;
  position: fixed;
  top:45px;
  background: #fff;
  .item {
    height: 70px;
    width: 50px;
    padding: 10px 5px;
    .image {
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-content: center;
      border: 2px solid #fff;
      border-radius: 23px;
      img {
        align-self: center;
        height: 45px;
        width: 45px;
        border-radius: 50%;
      }
    }
    .title {
      font-size: 12px;
      text-align: center;
      margin-top: 5px;
    }
  }
  .active {
    .image {
      border: 2px solid #d13193;
    }
    .title {
      background: #d13193;
      color: #fff;
      font-weight: bold;
      border-radius: 60px;
    }
  }
}
</style>
