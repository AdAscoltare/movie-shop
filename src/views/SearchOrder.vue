<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Wang Wenzheng
 * @Date: 2020-12-13 16:34:03
 * @LastEditors: Wang Wenzheng
 * @LastEditTime: 2020-12-23 21:19:15
-->
<template>
  <div class="view">
    <!-- 页面标题 -->
    <div class="view-title">
      <h1>查询订单</h1>
    </div>
    <!-- 页面标题 end -->
    <div class="table-show">
      <el-row>
        <!-- 页面的表格 -->
        <el-col :span="16" :offset="4">
          <basic-table
            :tableData="orders"
            :tableTitle="orderTableTitle"
          ></basic-table>
        </el-col>
        <!-- 页面的表格 end -->
      </el-row>
    </div>
    <div class="pagination" style="text-align:center">
      <el-row>
        <el-col :span="16" :offset="4">
          <el-pagination
            background
            layout="total, prev, pager, next"
            :page-size="this.GLOBAL_CONST.PAGE_SIZE"
            :total="this.totalNum"
            @current-change="getOrdersData"
          >
          </el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import BasicTable from "../components/BasicTable.vue";
//!测试数据
import OrderData from "../testData/orderData.json";

export default {
  name: "search-order",
  components: { BasicTable },
  data() {
    return {
      totalNum: 0,
      orders: [],
      orderTableTitle: [
        { label: "商品号", prop: "pid" },
        { label: "用户号", prop: "userid" },
        { label: "购买时间", prop: "time" },
        { label: "评分", prop: "score" },
        { label: "评价", prop: "comment" },
      ],
    };
  },
  methods: {
    //获取当前页码的商品数据
    getOrdersData(pageNum) {
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
          this.orders = OrderData.orders;
          this.totalNum = OrderData.totalNum;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    //在函数中-1
    this.getOrdersData(1);
  },
};
</script>
