import axios from 'axios';

const appkey = 'xuejp_1631502225673';

const instance = axios.create({
  baseURL: 'https://mallapi.duyiedu.com/goods/',
  params: {
    appkey,
  },
});

instance.interceptors.request.use((config) => config);

instance.interceptors.response.use((resp) => resp.data);

export default instance;
