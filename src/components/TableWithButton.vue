<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Wang Wenzheng
 * @Date: 2020-12-22 20:50:57
 * @LastEditors: Wang Wenzheng
 * @LastEditTime: 2020-12-22 22:39:10
-->
<template>
  <el-table class="table-with-button" :data="tableData" :stripe="true">
    <el-table-column
      v-for="(title, key) in tableTitle"
      :key="key"
      :prop="title.prop"
      :label="title.label"
      :sortable="true"
    ></el-table-column>
    <!-- 增加一个按钮的列 -->
    <el-table-column :label="buttonName">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">
          {{ buttonName }}
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "table-with-button",
  props: {
    tableData: {
      type: Array,
      default: () => {},
    },
    tableTitle: {
      type: Array,
      default: () => {},
    },
    buttonName: String,
    handleClick: {
      type: Function,
    },
  },
  methods: {},
};
</script>
