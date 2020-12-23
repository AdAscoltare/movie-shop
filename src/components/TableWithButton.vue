<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Wang Wenzheng
 * @Date: 2020-12-22 20:50:57
 * @LastEditors: Wang Wenzheng
 * @LastEditTime: 2020-12-23 21:22:02
-->
<template>
  <div>
    <el-row>
      <el-col :span="3" :offset="20">
        <el-button type="primary" @click="downloadTable">
          <i class="el-icon-download"></i>导出至Excel
        </el-button>
      </el-col>
    </el-row>
    <el-table
      id="table"
      class="table-with-button"
      :data="tableData"
      :stripe="true"
    >
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
  </div>
</template>

<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";

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
  methods: {
    downloadTable() {
      var wb = XLSX.utils.table_to_book(document.getElementById("table"));
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });

      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          "电影商城.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }

      return wbout;
    },
  },
};
</script>
