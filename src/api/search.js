import axios from '@/axios';

export default {
  search(type, page, size) {
    return axios.get('/search', { params: { type, page, size } });
  },
  likeSearch(likeValue) {
    return axios.get('/likeSearch', { params: { likeValue } });
  },
  getGoodsByIds(value) {
    return axios.get('/getGoodsByIds', { params: { value } });
  },
};
