/*
 * @Descripttion:
 * @version: 1.0
 * @Author: Wang Wenzheng
 * @Date: 2020-12-22 18:14:20
 * @LastEditors: Wang Wenzheng
 * @LastEditTime: 2020-12-22 22:32:19
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

//basic style
import "./style/basicStyle.scss";

//element ui
import ElementUi from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUi);

//引入全局变量
import GLOBAL_CONST from "./js/global";
Vue.prototype.GLOBAL_CONST = GLOBAL_CONST;

//axios
import Axios from "axios";
Vue.prototype.$axios = Axios;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
