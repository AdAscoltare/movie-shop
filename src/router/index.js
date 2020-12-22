/*
 * @Descripttion:
 * @version: 1.0
 * @Author: Wang Wenzheng
 * @Date: 2020-12-22 18:14:20
 * @LastEditors: Wang Wenzheng
 * @LastEditTime: 2020-12-22 22:57:09
 */
import Vue from "vue";
import VueRouter from "vue-router";

import Purchase from "../views/Puechase.vue";
import SearchProduct from "../views/SearchProduct.vue";
import SearchUser from "../views/SearchUser.vue";
import ProductDetail from "../views/ProductDetail.vue";
import UserDetail from "../views/UserDetail.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "purchase",
    component: Purchase,
  },
  {
    path: "/searchProduct",
    name: "SearchProduct",
    component: SearchProduct,
  },
  {
    path: "/searchUser",
    name: "SearchUser",
    component: SearchUser,
  },
  {
    path: "/productDetail",
    name: "ProductDetail",
    component: ProductDetail,
  },
  {
    path: "/userDetail",
    name: "UserDetail",
    component: UserDetail,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
