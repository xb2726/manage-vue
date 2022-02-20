import axios from 'axios';
import { ElMessage } from "element-plus";

const service = axios.create({
  // process.env.NODE_ENV === 'development' 来判断是否开发环境
  // easy-mock服务挂了，暂时不使用了
  // baseURL: 'http://123.56.68.131:9090/',
  timeout: 5000
});

service.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject();
  }
);

service.interceptors.response.use(
  response => {
    console.log(response);
    if (response.data.code === 200) {
      return response.data;
    } else {
      ElMessage.error(response.data.message);
      Promise.reject();
    }
  },
  error => {
    console.log(error);
    ElMessage.error(error.message);
    return Promise.reject();
  }
);

export default service;
