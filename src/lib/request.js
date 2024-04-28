import axios from 'axios';

const BASEURL = 'http://10.8.12.247:3000/'

function buildUrlWithParams(params) {
  const queryString = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
  return queryString;
}
// 创建一个 Axios 实例
const api = axios.create({
  // 设置基础的请求路径
  baseURL: BASEURL
  // 可选：添加其他默认配置
});

// 请求拦截器：在请求发送之前执行
api.interceptors.request.use(
  (config) => {

    // 在发送请求之前做些什么
    // 比如添加公共的请求头等
    // config.headers['Authorization'] = 'Bearer your_token_here';
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器：在响应返回之后执行
api.interceptors.response.use(
  (response) => {
    // 对响应数据做些什么
    // 比如统一处理成功状态码等
    return response.data;
  },
  (error) => {
    // 对响应错误做些什么
    // 比如统一处理错误信息等
    return Promise.reject(error);
  }
);

// 将发送请求的函数封装到 api 对象中
api.sendRequest = ({ url, method, params }) => {
  let requestUrl = url;
  if (method === 'get') {
    console.log('url: ', url);

    console.log('params: ', params);
    const u = buildUrlWithParams(params);
    requestUrl = `${url}?${u}`
  }

  return api({
    url: requestUrl,
    method: method
  });
};

export default api;
