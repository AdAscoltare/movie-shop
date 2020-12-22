<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Wang Wenzheng
 * @Date: 2020-12-13 16:34:03
 * @LastEditors: Wang Wenzheng
 * @LastEditTime: 2020-12-22 23:01:18
-->
<template>
  <div class="view">
    <h1>This is an empty product detail page</h1>
    pid:{{ pid }}
  </div>
</template>

<script>
export default {
  name: "product-detail",
  data() {
    return {
      pid: this.$route.params.pid,
    };
  },
  mounted() {
    console.log(this.pid);
  },
};
</script>
