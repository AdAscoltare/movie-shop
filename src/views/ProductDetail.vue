<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Wang Wenzheng
 * @Date: 2020-12-13 16:34:03
 * @LastEditors: Wang Wenzheng
 * @LastEditTime: 2020-12-23 09:49:49
-->
<template>
  <div class="view">
    <!-- 页面标题 -->
    <div class="view-title">
      <h1>商品详情</h1>
    </div>

    <!-- 页面标题 end -->
    <!-- 商品信息 -->
    <div>
      <el-row>
        <el-col :span="4" :offset="4">商品号 : {{ pid }}</el-col>
        <el-col :span="4">商品名 : {{ name }}</el-col>
        <el-col :span="4">商品价格 : {{ prize }}</el-col>
        <el-col :span="4">商品总销量 : {{ totalNum }}</el-col>
      </el-row>
    </div>
    <!-- 商品信息 end -->
    <el-divider></el-divider>

    <div class="table-show">
      <el-row>
        <!-- 页面的表格 -->
        <el-col :span="16">
          <basic-table
            :tableData="orders"
            :tableTitle="orderTableTitle"
          ></basic-table>
        </el-col>
        <!-- 页面的表格 end -->
        <!-- 饼图 -->
        <el-col :span="8" v-if="this.pieDataReady">
          <pie-chart
            :title="'评分分布图'"
            :tag="'score'"
            :data="scoreData"
          ></pie-chart>
        </el-col>
        <!-- 饼图 end -->
      </el-row>
    </div>

    <div class="pagination" style="text-align:center">
      <el-row>
        <el-col :span="16">
          <el-pagination
            background
            layout="prev, pager, next"
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
import PieChart from "../components/PieChart.vue";
//!测试数据
import OrderData from "../testData/orderData.json";
import ScoreData from "../testData/scoreData.json";

export default {
  name: "product-detail",
  components: {
    BasicTable,
    PieChart,
  },
  data() {
    return {
      pid: this.$route.params.pid,
      name: this.$route.params.name,
      prize: this.$route.params.prize,
      totalNum: 0,
      orders: [],
      orderTableTitle: [
        { label: "商品号", prop: "pid" },
        { label: "用户号", prop: "userid" },
        { label: "购买时间", prop: "time" },
        { label: "评分", prop: "score" },
        { label: "评价", prop: "comment" },
      ],
      scoreData: [],
      pieDataReady: false,
    };
  },
  methods: {
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
          //! 注意有两个参数
          //pageNum:0
          //pid:this.pid
        },
      })
        .then((res) => {
          console.log("get data", res);
          this.orders = OrderData.orders;
          this.totalNum = OrderData.totalNum;
          console.log(this.orders);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取评分数据
    getScoreData() {
      //todo: 将数据更改为真实电影商店数据
      this.$axios({
        method: "get",
        url: "http://119.45.194.177:8080/getLinePoint",
        params: {
          year: "2017",
          commuteType: "com",
          datatype: "with_main_top",
          //真实参数应该是pid
          //pid:this.pid
        },
      })
        .then((res) => {
          console.log("get data", res);
          this.scoreData = ScoreData;
          console.log(this.scoreData);

          this.pieDataReady = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    console.log(this.pid, this.name, this.prize);
    this.getOrdersData(1);
    this.getScoreData();
  },
};
</script>
