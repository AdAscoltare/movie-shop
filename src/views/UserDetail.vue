<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Wang Wenzheng
 * @Date: 2020-12-22 22:53:13
 * @LastEditors: Wang Wenzheng
 * @LastEditTime: 2020-12-23 21:00:01
-->
<template>
  <div class="view">
    <!-- 页面标题 -->
    <div class="view-title">
      <h1>用户详情</h1>
    </div>

    <!-- 页面标题 end -->
    <!-- 用户信息 -->
    <div>
      <el-row>
        <el-col :span="4" :offset="4">用户号 : {{ userid }}</el-col>
        <el-col :span="4">总购买数量 : {{ totalNum }}</el-col>
      </el-row>
    </div>
    <!-- 用户信息 end -->
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

        <el-col :span="8">
          <!-- 饼图 -->
          <transition v-if="this.pieDataReady" name="el-fade-in-linear">
            <pie-chart
              :title="'评分分布图'"
              :tag="'score'"
              :data="scoreData"
            ></pie-chart>
          </transition>

          <!-- 饼图 end -->
          <!-- 折线图 -->
          <transition v-if="this.lineDataReady" name="el-fade-in-linear">
            <line-chart
              :tag="'spend'"
              :title="'购买时间图'"
              :configMap="lineDataConfig"
              :data="spendData"
              :tooltip="'{b} : 消费额{c}'"
            ></line-chart>
          </transition>
          <!-- 折线图 end -->
        </el-col>
      </el-row>
    </div>

    <div class="pagination" style="text-align:center">
      <el-row>
        <el-col :span="16">
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
import PieChart from "../components/PieChart.vue";
import LineChart from "../components/LineChart.vue";
//!测试数据
import OrderData from "../testData/orderData.json";
import ScoreData from "../testData/scoreData.json";
import SpendData from "../testData/spendData.json";
export default {
  name: "user-detail",
  components: {
    BasicTable,
    PieChart,
    LineChart,
  },
  data() {
    return {
      userid: this.$route.params.userid,
      totalNum: 0,
      orders: [],
      orderTableTitle: [
        { label: "商品号", prop: "pid" },
        { label: "用户号", prop: "userid" },
        { label: "购买时间", prop: "time" },
        { label: "评分", prop: "score" },
        { label: "评价", prop: "comment" },
      ],
      //饼图配置
      scoreData: [],
      pieDataReady: false,
      //折线图配置

      spendData: [],
      lineDataReady: false,
    };
  },
  computed: {
    lineDataConfig: function() {
      return [
        {
          key: "time",
        },
        {
          key: "spend",
          name: "消费额",
          color: "#ff7f50",
        },
      ];
    },
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
          //userid:this.userid
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
          //真实参数应该是userid
          //userid:this.userid
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
    //获取销量数据
    getSpendData() {
      //todo: 将数据更改为真实电影商店数据
      this.$axios({
        method: "get",
        url: "http://119.45.194.177:8080/getLinePoint",
        params: {
          year: "2017",
          commuteType: "com",
          datatype: "with_main_top",
          //真实参数应该是userid
          //userid:this.userid
        },
      })
        .then((res) => {
          console.log("get data", res);
          this.spendData = SpendData;
          this.lineDataReady = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    console.log(this.userid);
    this.getOrdersData(1);
    this.getScoreData();
    this.getSpendData();
  },
};
</script>
