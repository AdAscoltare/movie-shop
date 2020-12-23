<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Wang Wenzheng
 * @Date: 2020-12-23 09:16:59
 * @LastEditors: Wang Wenzheng
 * @LastEditTime: 2020-12-23 20:44:37
-->
<template>
  <div style="height:600px" v-bind:id="this.tag + '-pie-chart'"></div>
</template>
<script>
var echarts = require("echarts");
export default {
  name: "pie-chart",
  props: {
    title: String,
    tag: String,
    //{name:"dataname",value:"datavalue"}
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      option: {},
    };
  },
  methods: {
    initOption() {
      const rawOption = {
        title: { text: this.title },
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)",
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
        legend: {},
        series: [
          {
            name: this.tag + "pie-chart",
            type: "pie",
            radius: "55%",
            center: ["40%", "50%"],
            data: this.data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 1)",
              },
            },
          },
        ],
      };
      this.option = rawOption;
    },
    configLegendOption() {
      const legendData = [];
      for (let item of this.data) {
        legendData.push(item.name);
      }
      let legend = {
        type: "scroll",
        orient: "vertical",
        right: 10,
        top: 20,
        bottom: 20,
        data: legendData,
        selected: legendData,
      };
      this.option.legend = legend;
    },
    makechart() {
      this.pieChart = echarts.init(
        document.getElementById(this.tag + "-pie-chart")
      );
      this.pieChart.setOption(this.option);
    },
  },
  mounted() {
    console.log(this.data);
    this.initOption();
    this.configLegendOption();
    this.makechart();
  },
};
</script>
