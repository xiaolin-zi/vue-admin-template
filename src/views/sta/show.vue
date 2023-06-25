<template>
  <div class="app-container">
    <!--表单-->
    <el-form :inline="true" class="demo-form-inline" style="text-align: center">
      <el-form-item>
        <el-select v-model="searchObj.type" clearable placeholder="请选择">
          <el-option label="学员登录数统计" value="login_num" />
          <el-option label="学员注册数统计" value="register_num" />
          <el-option label="课程播放数统计" value="video_view_num" />
          <el-option label="每日课程数统计" value="course_num" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="searchObj.begin"
          type="date"
          placeholder="选择开始日期"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="searchObj.end"
          type="date"
          placeholder="选择截止日期"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-button
        :disabled="btnDisabled"
        type="primary"
        icon="el-icon-search"
        @click="showChart()"
        >查询</el-button
      >
    </el-form>
    <div class="chart-container">
      <div id="chart" class="chart" style="height: 500px; width: 100%" />
    </div>
  </div>
</template>
<script>
import * as echarts from "echarts";
import staApi from "@/api/sta";
export default {
  data() {
    return {
      searchObj: {
        type: "",
        begin: "",
        end: "",
      },
      btnDisabled: false,
      chart: null,
      title: "",
      xData: [],
      yData: [],
    };
  },
  created() {},
  methods: {
    showChart() {
      if (
        !this.searchObj.type ||
        !this.searchObj.begin ||
        !this.searchObj.end
      ) {
        this.$message({
          type: "warning",
          message: "请填写好完整信息哦！",
        });
        return;
      }
      this.xData = [];
      this.yData = [];
      // 准备图表数据
      staApi.getDataSta(this.searchObj).then((res) => {
        this.xData = res.data.date_calculatedList;
        this.yData = res.data.numDataList;
        // 当前统计类别
        switch (this.searchObj.type) {
          case "register_num":
            this.title = "学员注册数统计";
            break;
          case "login_num":
            this.title = "学员登录数统计";
            break;
          case "video_view_num":
            this.title = "课程播放数统计";
            break;
          case "course_num":
            this.title = "每日课程数统计";
            break;
        }
        if (this.xData.length || this.yData.length) {
          //生成图
          this.setChart();
        } else {
          this.$message({
            type: "info",
            message: "此时间段查不到有效信息",
          });
        }
      });
    },
    // 设置图标参数
    setChart() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(document.getElementById("chart"));
      // console.log(this.chart)
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: this.title,
        },
        //x轴y轴触发提示
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        // //区域缩放
        // dataZoom: [
        //   {
        //     show: true,
        //     height: 30,
        //     xAxisIndex: [0],
        //     bottom: 30,
        //     start: 10,
        //     end: 80,
        //     handleIcon:
        //       "path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",
        //     handleSize: "110%",
        //     handleStyle: {
        //       color: "#d3dee5",
        //     },
        //     textStyle: {
        //       color: "#fff",
        //     },
        //     borderColor: "#90979c",
        //   },
        //   {
        //     type: "inside",
        //     show: true,
        //     height: 15,
        //     start: 1,
        //     end: 35,
        //   },
        // ],
        // x轴是类目轴（离散数据）,必须通过data设置类目数据
        xAxis: {
          type: "category",
          data: this.xData,
          axisPointer: {
            type: "shadow",
          },
        },
        // y轴是数据轴（连续数据）
        yAxis: {
          type: "value",
        },
        // 系列列表。每个系列通过 type 决定自己的图表类型
        series: [
          {
            // 系列中的数据内容数组
            data: this.yData,
            // 折线图
            type: "line",
          },
        ],
      };
      this.chart.setOption(option);
    },
  },
};
</script>
