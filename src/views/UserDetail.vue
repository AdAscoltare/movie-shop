<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Wang Wenzheng
 * @Date: 2020-12-22 22:53:13
 * @LastEditors: Wang Wenzheng
 * @LastEditTime: 2020-12-22 23:01:30
-->
<template>
  <div class="view">
    <h1>This is an empty user detail page</h1>
    userid:{{ userid }}
  </div>
</template>

<script>
export default {
  name: "user-detail",
  data() {
    return {
      userid: this.$route.params.userid,
    };
  },
  mounted() {
    console.log(this.userid);
  },
};
</script>
