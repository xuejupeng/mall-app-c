import axios from '@/axios';

export default {
  getBarList(type) {
    return axios.get('/getsidebar', { params: { type } });
  },
};
