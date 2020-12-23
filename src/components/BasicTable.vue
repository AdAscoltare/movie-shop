<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Wang Wenzheng
 * @Date: 2020-12-22 20:50:57
 * @LastEditors: Wang Wenzheng
 * @LastEditTime: 2020-12-23 08:26:47
-->
<template>
  <el-table class="basic-table" :data="tableData" :stripe="true">
    <el-table-column
      v-for="(title, key) in tableTitle"
      :key="key"
      :prop="title.prop"
      :label="title.label"
      :sortable="true"
    ></el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "basic-table",
  props: {
    tableData: {
      type: Array,
      default: () => {},
    },
    tableTitle: {
      type: Array,
      default: () => {},
    },
  },
  methods: {},
};
</script>
