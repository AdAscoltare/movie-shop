<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Wang Wenzheng
 * @Date: 2020-12-13 16:34:03
 * @LastEditors: Wang Wenzheng
 * @LastEditTime: 2020-12-23 09:05:25
-->
<template>
  <div class="view">
    <!-- 页面标题 -->
    <div class="view-title">
      <h1>查询商品</h1>
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
            :total="totalNum"
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
import ProductData from "../testData/product2.json";

export default {
  name: "search-product",
  components: { TableWithButton },
  data() {
    return {
      totalNum: 0,
      products: [],
      productTableTitle: [
        { label: "商品号", prop: "pid" },
        { label: "商品名", prop: "name" },
      ],
      buttonName: "查看详情",
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
          this.products = ProductData.products;
          this.totalNum = ProductData.totalNum;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //传入表格按钮的方法
    handleClick(row) {
      //向后端传pid,请求其详情数据
      const pid = row.pid;
      const name = row.name;
      const prize = row.prize;
      //跳转至该详情页
      this.$router.push({
        name: "ProductDetail",
        params: {
          pid,
          name,
          prize,
        },
      });
    },
  },
  mounted() {
    //在函数中-1
    this.getProductData(1);
  },
};
</script>
