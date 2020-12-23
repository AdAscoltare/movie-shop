<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Wang Wenzheng
 * @Date: 2020-12-17 23:42:32
 * @LastEditors: Wang Wenzheng
 * @LastEditTime: 2020-12-23 20:45:45
-->
<template>
  <el-row>
    <el-col :span="24">
      <div style="height:300px" v-bind:id="this.tag + '-line-chart'"></div>
    </el-col>
  </el-row>
</template>
<script>
var echarts = require("echarts");
export default {
  name: "line-table",
  props: {
    title: String,
    tag: String,
    data: {
      type: Array,
      default: () => [],
    },
    configMap: {
      type: Array,
      default: () => [],
    },
    tooltip: String,
  },
  data() {
    return {
      option: {},
      modifiedData: {},
    };
  },
  methods: {
    initOption() {
      const rawOption = {
        title: { text: this.title },
        tooltip: {
          trigger: "axis",
          formatter: this.tooltip,
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        toolbox: {
          feature: {
            saveAsImage: {},
            dataZoom: {
              yAxisIndex: "none",
            },
            restore: {},
          },
        },
        dataZoom: [
          {
            type: "slider",
            realtime: true,
            start: 0,
            end: 100,
          },
          {
            type: "inside",
            realtime: true,
            start: 0,
            end: 8,
          },
        ],
        legend: {
          data: [],
        },
        xAxis: {
          type: "category",
          data: null,
        },
        yAxis: {
          type: "value",
        },
        series: [],
      };
      this.option = rawOption;
    },
    modifyData() {
      for (let key of Object.keys(this.data[0])) {
        let result = this.data.map((obj) => {
          return obj[key];
        });
        this.modifiedData[key] = result;
      }
    },
    configXAxisOption() {
      this.option.xAxis.data = this.modifiedData[this.configMap[0].key];
    },
    configSeriesOption() {
      for (let i = 1; i < this.configMap.length; i++) {
        let dataOption = {
          name: this.configMap[i].name,
          data: this.modifiedData[this.configMap[i].key],
          lineStyle: { color: this.configMap[i].color },
          type: "line",
        };
        this.option.series.push(dataOption);
        //图例
        this.option.legend.data.push(this.configMap[i].name);
      }
    },
    makechart() {
      this.lineChart = echarts.init(
        document.getElementById(this.tag + "-line-chart")
      );
      this.lineChart.setOption(this.option);
    },
  },
  mounted() {
    this.initOption();
    this.modifyData();
    this.configXAxisOption();
    this.configSeriesOption();
    this.makechart();
    console.log("config:", this.configMap);
    console.log("config option:", this.option);
  },
};
</script>
