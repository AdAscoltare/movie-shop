<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Wang Wenzheng
 * @Date: 2020-12-15 14:22:40
 * @LastEditors: Wang Wenzheng
 * @LastEditTime: 2020-12-22 22:47:25
-->
<template>
  <!-- navbar -->
  <div id="nav" style="height:4rem;padding:0;margin:0,1rem;background:#447ed9">
    <el-row style="text-align: left;">
      <el-col :span="8">
        <h2
          style="margin:0;padding:0;padding-top:0.75rem; padding-left:1rem; color:#fff"
        >
          {{ barTitle }}
        </h2>
      </el-col>
      <el-col :span="16">
        <el-menu
          mode="horizontal"
          :router="true"
          :default-active="this.currPage"
          background-color="#447ed9"
          text-color="#fff"
          active-text-color="#ffd966"
          style="height:4rem"
        >
          <el-menu-item
            v-for="(page, key) in this.pages"
            :key="key"
            :index="page.router"
            style="border-bottom: none"
          >
            <div style="font-size:1.25rem;padding:0 2rem">{{ page.title }}</div>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "navbar",
  props: {
    pages: {
      type: Array,
      default: () => [],
    },
    barTitle: String,
  },
  data() {
    return {};
  },
  computed: {
    //保持刷新后menu高亮仍为当前路由
    currPage: function() {
      //获取当前路由
      const currRouter = this.$route.path;
      //找到其属于哪一个页面或子页面
      for (let page of this.pages) {
        if (currRouter == page.router) {
          return page.router;
        }
        for (let child of page.children) {
          if (currRouter == child) {
            return page.router;
          }
        }
      }
      return "/";
    },
  },
};
</script>
