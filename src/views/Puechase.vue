<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Wang Wenzheng
 * @Date: 2020-12-13 16:34:03
 * @LastEditors: Wang Wenzheng
 * @LastEditTime: 2020-12-23 09:01:15
-->
<template>
  <div class="view">
    <!-- 页面标题 -->
    <div class="view-title">
      <h1>模拟订单生成</h1>
    </div>
    <!-- 页面标题 end -->
    <!-- 页面的表格 -->
    <div class="table-show">
      <el-row>
        <el-col :span="16" :offset="4">
          <table-with-button
            :tableData="products"
            :tableTitle="productTableTitle"
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
            layout="prev, pager, next"
            :page-size="this.GLOBAL_CONST.PAGE_SIZE"
            :total="7456"
            @current-change="getProductData"
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
import ProductTestData from "../testData/product2.json";

export default {
  name: "purchase",
  components: { TableWithButton },
  data() {
    return {
      products: [],
      productTableTitle: [
        { label: "电影", prop: "name" },
        { label: "价格", prop: "prize" },
      ],
      buttonName: "购买",
    };
  },
  methods: {
    //获取当前页码的商品数据
    getProductData(pageNum) {
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
          this.products = ProductTestData.products;
          this.totalNum = ProductTestData.totalNum;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //传入表格按钮的方法
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
          //pid:row.pid
          //userid:userId
          //score:"4.0"
          //time:
          //comment:
        },
      })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    //在函数中-1
    this.getProductData(1);
  },
};
</script>
