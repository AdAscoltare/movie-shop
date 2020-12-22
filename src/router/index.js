/*
 * @Descripttion:
 * @version: 1.0
 * @Author: Wang Wenzheng
 * @Date: 2020-12-22 18:14:20
 * @LastEditors: Wang Wenzheng
 * @LastEditTime: 2020-12-22 20:07:22
 */
import Vue from "vue";
import VueRouter from "vue-router";

import Purchase from "../views/Puechase.vue";
import SearchProduct from "../views/SearchProduct.vue";
import SearchUser from "../views/SearchUser.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "purchase",
    component: Purchase,
  },
  {
    path: "/SearchProduct",
    name: "SearchProduct",
    component: SearchProduct,
  },
  {
    path: "/SearchUser",
    name: "SearchUser",
    component: SearchUser,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
