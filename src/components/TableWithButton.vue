<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Wang Wenzheng
 * @Date: 2020-12-22 20:50:57
 * @LastEditors: Wang Wenzheng
 * @LastEditTime: 2020-12-22 21:36:07
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
    <el-table-column :label="'购买'">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small"
          >购买
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
  },
  methods: {
    handleClick(row) {
      //向后端传新增的pid,userid,time,score,comment
      //!用户id固定
      const pid = row.pid;
      const userId = "A1007G0226CSWC";
      const time = Math.round(new Date().getTime() / 1000).toString();
      const comment = "挺好的";
      const score = "4.0";
      console.log(pid, userId, time, comment, score);
      //传输请求
      //todo: 将请求换为真实请求
      this.$axios({
        method: "get",
        url: "http://119.45.194.177:8080/getLinePoint",
        params: {
          year: "2017",
          commuteType: "com",
          datatype: "with_main_top",
          //真实参数应该是页码号
          //pid:row.pid
          //userid:userId
          //score:"4.0"
          //time:
          //comment:
        },
      })
        .then((res) => {
          console.log("get data", res);

          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
