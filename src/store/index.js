/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/api/twoBar.js';
import showList from '@/api/listPage.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    barList: [],
    showContent: false,
    shopList: [],
    type: null,
    counterMap: {},
  },
  mutations: {
    setBarList(state, list) {
      state.barList = list;
    },
    setShowContent(state, bool) {
      state.showContent = bool;
    },
    setShopList(state, list) {
      state.shopList = [...state.shopList, ...list];
    },
    resetShopList(state) {
      state.shopList = [];
    },
    setShopType(state, type) {
      state.type = type;
    },
    setCounterMap(state, map) {
      state.counterMap = map;
    },
    storyChange(state, { id, value }) {
      if (state.counterMap[id]) {
        if ((value === -1 && state.counterMap[id] === 1) || value === -Infinity) {
          Vue.delete(state.counterMap, id);
        } else {
          Vue.set(state.counterMap, id, state.counterMap[id] + value);
        }
      } else {
        Vue.set(state.counterMap, id, 1);
      }
      localStorage.setItem('goods', JSON.stringify(state.counterMap));
    },
  },
  actions: {
    async setBarList(ctx, type) {
      ctx.commit('setShowContent', false);
      const value = await api.getBarList(type);
      ctx.commit('setBarList', value);
      ctx.commit('setShowContent', true);
    },
    async setShopList(ctx, options) {
      const {
        page, size, sort,
      } = options;
      const type = options.type || ctx.state.type;
      const value = await showList.getList(type, page, size, sort);
      ctx.commit('setShopList', value.list);
      ctx.commit('setShopType', type);
      if (value.total > ctx.state.shopList.length) {
        return true;
      }
      return false;
    },
  },
  modules: {
  },
});
