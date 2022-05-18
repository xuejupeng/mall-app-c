<template>
  <div class="top-screen-container">
    <ul>
        <li v-for="(item,i) in shopScreen" :key="i"
        @touchend="handleEnd(i)" :class="{active: i === index}">{{item.title}}
        <template v-if="item.child">
            <span class="top" :class="{activeTop: item.top}"></span>
            <span class="bottom" :class="{activeBottom: item.bottom}"></span>
        </template>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      index: 0,
      count: 0,
      shopScreen: [
        { title: '综合', type: 'all' },
        { title: '销量', type: 'sale' },
        {
          title: '价格', name: '', child: true, top: false, bottom: false, type: 'price-up',
        },
      ],
    };
  },
  methods: {
    handleEnd(i) {
      this.$emit('handleClick', this.shopScreen[i]);
      this.index = i;
      this.changeActive();
    },
    changeActive() {
      if (this.index === 2) {
        this.shopScreen[2].top = true;
        this.shopScreen[2].bottom = false;
        this.shopScreen[2].type = 'price-down';
        this.count += 1;
        if (this.count % 2 === 0) {
          this.shopScreen[2].bottom = true;
          this.shopScreen[2].top = false;
          this.shopScreen[2].type = 'price-up';
        }
      } else {
        this.shopScreen[2].top = false;
        this.shopScreen[2].bottom = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
  .top-screen-container{
      position: fixed;
      top: 135px;
      border: 2px solid #eee;
      box-sizing: border-box;
      border-left-style:none;
      border-right-style:none;
      height: 25px;
      width: 296px;
      background: #fff;
      ul{
          list-style:none;
          display: flex;
          justify-content: flex-end;
          margin-right:10px;
          li{
              font-size: 12px;
              width: 50px;
              line-height: 20px;
              text-align:center;
              color: #cecece;
              position: relative;
              .top{
                display: inline-block;
                border: 4px solid transparent;
                border-bottom-color: #cecece;
                position: absolute;
                right: 0;
                top:1px;
              }
              .bottom{
                display: inline-block;
                border: 4px solid transparent;
                border-top-color: #cecece;
                position: absolute;
                right: 0;
                bottom:1px;
              }
              .activeTop{
                  border-bottom-color: #ff1a90;
              }
              .activeBottom{
                  border-top-color: #ff1a90;
              }
          }
           .active{
              font-weight: bold;
              color: #ff1a90;
          }
      }
  }
</style>
