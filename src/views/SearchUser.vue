<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Wang Wenzheng
 * @Date: 2020-12-13 16:34:03
 * @LastEditors: Wang Wenzheng
 * @LastEditTime: 2020-12-23 21:23:59
-->
<template>
  <div class="view">
    <!-- 页面标题 -->
    <div class="view-title">
      <h1>查询用户</h1>
    </div>
    <!-- 页面标题 end -->
    <el-row>
      <el-col :span="16" :offset="4">
        <el-input placeholder="请输入用户号" v-model="inputUserid">
          <el-button
            @click="searchUserid"
            slot="append"
            icon="el-icon-search"
          ></el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <!-- 页面的表格 -->
    <div class="table-show">
      <el-row>
        <el-col :span="16" :offset="4">
          <table-with-button
            :tableData="users"
            :tableTitle="userTableTitle"
            :handleClick="handleClick"
            :buttonName="this.buttonName"
          ></table-with-button>
        </el-col>
      </el-row>
    </div>
    <!-- 页面的表格 end -->
    <div class="pagination" style="text-align:center">
      <el-row>
        <el-col :span="16" :offset="4">
          <el-pagination
            background
            layout="total, prev, pager, next"
            :page-size="this.GLOBAL_CONST.PAGE_SIZE"
            :total="totalNum"
            @current-change="getuserData"
          >
          </el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import TableWithButton from "../components/TableWithButton.vue";
//! 测试数据
import UserData from "../testData/userData.json";

export default {
  name: "search-user",
  components: { TableWithButton },
  data() {
    return {
      totalNum: 0,
      users: [],
      userTableTitle: [
        { label: "用户号", prop: "userid" },
        { label: "用户名", prop: "username" },
      ],
      buttonName: "查看详情",
      inputUserid: "",
    };
  },
  methods: {
    //获取当前页码的商品数据
    getuserData(pageNum) {
      pageNum--;
      console.log("页码数", pageNum);
      //todo: 将数据更改为真实电影商店数据
      this.$axios({
        method: "get",
        url: "http://119.45.194.177:8080/getLinePoint",
        params: {
          year: "2017",
          commuteType: "com",
          datatype: "with_main_top",
          //真实参数应该是页码号
          //pageNum:0
        },
      })
        .then((res) => {
          console.log("get data", res);
          this.users = UserData.users;
          this.totalNum = UserData.totalNum;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    searchUserid() {
      this.$router.push({
        name: "UserDetail",
        params: {
          userid: this.inputUserid,
        },
      });
    },
    //传入表格按钮的方法
    handleClick(row) {
      //向后端传userid,请求其详情数据
      const userid = row.userid;
      //跳转至该详情页
      this.$router.push({
        name: "UserDetail",
        params: {
          userid: userid,
        },
      });
    },
  },
  mounted() {
    //在函数中-1
    this.getuserData(1);
  },
};
</script>
