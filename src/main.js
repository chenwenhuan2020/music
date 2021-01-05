import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'lib-flexible/flexible'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vant)
Vue.use(VueAxios, axios)

Vue.prototype.appkey = "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=";
// 配置请求基础路径
axios.defaults.baseURL = 'http://www.kangliuyong.com:10002';

// axios 拦截器，在发送请求之前执行
axios.interceptors.request.use(config => {
  // 处理post请求参数，进行参数序列化
  if (config.method == 'post') {
    // 序列化post请求参数
    let paramsString = '';
    for (let key in config.data) {
      paramsString += `${key}=${config.data[key]}&`;
    }
    // 重新赋值config.data
    config.data = paramsString.slice(0, -1);
  }
  // 必须返回config
  return config;
})


//过滤小数
Vue.filter("mun", (v) => {
  let indexS = v.toString().split(".");
  //整数部分
  let intS = indexS[0];
  let intNumS = [];
  for (let i = intS.length - 1; i >= 0; i--) {
    let index = i - 2 <= 0 ? 0 : i - 2;
    let int = intS.slice(index, i + 1);
    // 往数组前面添加元素
    intNumS.unshift(int);
  }
  intNumS = intNumS.join(".");

  // 判断是否存在小数
  if (indexS[1] != undefined) {
    intNumS = `${intNumS}.${indexS[1]}`;
  }
  let newString = intNumS.substr(0, 4);
  return newString;
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')