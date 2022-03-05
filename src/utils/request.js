import axios from 'axios';
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";

const service = axios.create({
  // process.env.NODE_ENV === 'development' 来判断是否开发环境
  // easy-mock服务挂了，暂时不使用了
  // baseURL: 'http://123.56.68.131:9090/',
  // baseURL: 'http://127.0.0.1:9090/',
  baseURL: '/cms',
  timeout: 5000
});

service.interceptors.request.use(
  config => {
    console.log(localStorage);
    if (localStorage.SD_TOKEN) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.SD_TOKEN = `${localStorage.SD_TOKEN}`;
    }

    return config;
  },
  error => {
    console.log("error" + error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(

  response => {
    console.log(response);

    if (response.data.code === 200) {
      return response.data;
    } else if (response.data.code === 401) {
      ElMessage.error("登录超时，请重新登录！");
      console.log("登录超时，请重新登录！")
      localStorage.setItem("ele_login", '0');

    }
    else {
      ElMessage.error(response.data.message);
      Promise.reject();
    }
  },
  error => {
    console.log("222");
    console.log(error);
    ElMessage.error(error.message);
    return Promise.reject(error);
  }
);

export default service;
