import axios from '@/axios';

export default {
  getList(type, page, size, sort) {
    return axios.get('/getGoodsList', {
      params: {
        type, page, size, sort,
      },
    });
  },
};
