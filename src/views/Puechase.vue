<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Wang Wenzheng
 * @Date: 2020-12-13 16:34:03
 * @LastEditors: Wang Wenzheng
 * @LastEditTime: 2020-12-22 21:16:30
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
          ></table-with-button>
        </el-col>
      </el-row>
    </div>
    <!-- 页面的表格 end -->
  </div>
</template>

<script>
import TableWithButton from "../components/TableWithButton.vue";
//! 测试数据
import ProductTestData from "../testData/product.json";

export default {
  components: { TableWithButton },
  data() {
    return {
      products: [],
      productTableTitle: [
        { label: "电影", prop: "name" },
        { label: "价格", prop: "prize" },
      ],
    };
  },
  methods: {
    getProductData(pageNum) {
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
          this.products = ProductTestData;
          console.log(this.products);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getProductData(0);
  },
};
</script>
