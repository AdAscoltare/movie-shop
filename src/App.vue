<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Wang Wenzheng
 * @Date: 2020-12-22 18:14:20
 * @LastEditors: Wang Wenzheng
 * @LastEditTime: 2020-12-22 22:55:08
-->
<template>
  <div id="app">
    <div id="nav">
      <Navbar :pages="this.pages" :barTitle="this.navbarTitle"></Navbar>
    </div>
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/Navbar";

export default {
  name: "App",
  components: {
    Navbar,
  },
  data() {
    return {
      //navbar 的标题
      navbarTitle: "电影商城后台管理系统",
      //navbar 的各个子页面标题和路由
      pages: [
        { title: "模拟订单生成", router: "/", children: [] },
        {
          title: "查询产品",
          router: "/searchProduct",
          children: ["/productDetail"],
        },
        { title: "查询用户", router: "/searchUser", children: ["/userDetail"] },
        { title: "查询订单", router: "/searchOrder", children: [] },
      ],
    };
  },
};
</script>
