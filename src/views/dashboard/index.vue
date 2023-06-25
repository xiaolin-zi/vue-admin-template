<template>
  <div class="dashboard-container">
    <el-row type="flex" justify="center">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-card class="box-card" shadow="hover">
            <div>
              <div style="display: inline-block; vertical-align: middle;">
                <img style="width: 100px;"
                     src="https://edu20230513.oss-cn-guangzhou.aliyuncs.com/2023/06/24/3d5362a7dbe24b9e8323a1517af28410.jpg"/>
              </div>
              <div style="display: inline-block; margin-left: 60px">
                <div class="dashboard-text" style="color: rgb(255, 102, 153)">{{ userInfo.nickname }}</div>
                <el-tag type="success" style="color: #5a5e66;font-size: 14px;margin-right: 5px" v-if="!roles.length">
                  超级管理员
                </el-tag>
                <template v-else>
                  <el-tag type="success" style="color: #5a5e66;font-size: 14px;margin-right: 5px" :key="role.id"
                          v-for="role in roles">{{ role.roleName }}
                  </el-tag>
                </template>
              </div>
            </div>
            <el-divider></el-divider>
            <div style="color: #5a5e66;font-size: 14px">
              上次登录时间：{{ userInfo.lastLoginTime }}
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="15" style="margin-left: 20px">
        <div class="grid-content bg-purple-light">
          <el-row type="flex" justify="center" :gutter="10">
            <el-col :span="4">
              <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <div style="width: 100%; height: 154px; background-color: rgb(45, 140, 240); display: table;">
                  <div style="display: table-cell; vertical-align: middle; text-align: center;">
                    <i class="el-icon-user-solid" style="font-size: 50px;color: white"></i>
                    <div
                      style=" vertical-align: middle; font-size: 20px;color: white">{{ countData.userNum }}
                    </div>
                  </div>
                </div>
                <div style="padding: 14px;text-align: center; ">
                  <span
                    style="display: inline-block; vertical-align: middle; font-size: 14px; color: #5a5e66; margin-left: 5px">用户数</span>
                </div>
              </el-card>
            </el-col>
            <el-col :span="4">
              <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <div style="width: 100%; height: 154px; background-color: rgb(100, 213, 114); display: table;">
                  <div style="display: table-cell; vertical-align: middle; text-align: center;">
                    <i class="el-icon-s-custom" style="font-size: 50px;color: white"></i>
                    <div
                      style=" vertical-align: middle; font-size: 20px; color: white">{{ countData.teacherNum }}
                    </div>
                  </div>
                </div>
                <div style="padding: 14px;text-align: center;">

                  <span
                    style="display: inline-block; vertical-align: middle; font-size: 14px; color: #5a5e66; margin-left: 5px">
                    讲师数
                  </span>
                </div>
              </el-card>
            </el-col>
            <el-col :span="4">
              <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <div style="width: 100%; height: 154px; background-color: rgb(45, 140, 240); ; display: table;">
                  <div style="display: table-cell; vertical-align: middle; text-align: center;">
                    <i class="el-icon-reading" style="font-size: 50px;color: white"></i>
                    <div
                      style="vertical-align: middle; font-size: 20px; color: white">{{ countData.articleNum }}
                    </div>
                  </div>
                </div>
                <div style="padding: 14px;text-align: center;">

                  <span
                    style="display: inline-block; vertical-align: middle; font-size: 14px; color: #5a5e66; margin-left: 5px">
                    文章总数
                  </span>
                </div>
              </el-card>
            </el-col>
            <el-col :span="4">
              <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <div style="width: 100%; height: 154px; background-color: rgb(100, 213, 114);display: table;">
                  <div style="display: table-cell; vertical-align: middle; text-align: center;">
                    <i class="el-icon-sell" style="font-size: 50px;color: white"></i>
                    <div
                      style="vertical-align: middle; font-size: 20px; color: white">{{ countData.upCourseNum }}
                    </div>
                  </div>
                </div>
                <div style="padding: 14px;text-align: center;">

                  <span
                    style="display: inline-block; vertical-align: middle; font-size: 14px; color: #5a5e66; margin-left: 5px">
                    上架课程数
                  </span>
                </div>
              </el-card>
            </el-col>
            <el-col :span="4">
              <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <div style="width: 100%; height: 154px; background-color: rgb(45, 140, 240); ; display: table;">
                  <div style="display: table-cell; vertical-align: middle; text-align: center;">
                    <i class="el-icon-sold-out" style="font-size: 50px;color: white"></i>
                    <div
                      style="vertical-align: middle; font-size: 20px; color: white">{{ countData.soldCourseNum }}
                    </div>
                  </div>
                </div>
                <div style="padding: 14px;text-align: center;">

                  <span
                    style="display: inline-block; vertical-align: middle; font-size: 14px; color: #5a5e66; margin-left: 5px">
                    已售课程数
                  </span>
                </div>
              </el-card>
            </el-col>
            <el-col :span="4">
              <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <div style="width: 100%; height: 154px; background-color: #fa353c; display: table;">
                  <div style="display: table-cell; vertical-align: middle; text-align: center;">
                    <i class="el-icon-wallet" style="font-size: 50px;color: white"></i>
                    <div
                      style="vertical-align: middle; font-size: 20px; color: white">{{ countData.soldMoney }}
                    </div>
                  </div>
                </div>
                <div style="padding: 14px;text-align: center">

                  <span
                    style="display: inline-block; vertical-align: middle; font-size: 14px; color: #5a5e66; margin-left: 5px">
                    成交金额
                  </span>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px" type="flex" justify="center">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-card class="box-card" shadow="hover" style="height: 386px">
            <div slot="header" class="clearfix">
              <span>上架课程讲师占比详情（仅展示前8）</span>
            </div>
            <div class="text item">
              <div v-for="(teacher,index) in teachers" :key="index">
                <span>{{ teacher.name }}</span>
                <el-progress :percentage="teacher.percentage" :color="customColors"></el-progress>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="15" style="margin-left: 20px">
        <div class="grid-content bg-purple-light">
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
              <span>最近上架课程（仅展示前5）</span>
            </div>
            <div class="text item">
              <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  prop="title"
                  label="课程名"
                >
                </el-table-column>
                <el-table-column
                  prop="gmtModified"
                  label="上架时间"
                >
                </el-table-column>

              </el-table>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px" type="flex" justify="center">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-card class="box-card" shadow="hover" style="height: 520px;overflow-y: scroll">
            <div slot="header" class="clearfix">
              <span>最近注册用户（仅展示前8）</span>
            </div>
            <div class="text item">
              <el-table
                :data="tableData1"
                style="width: 100%;">
                <el-table-column label="头像">
                  <template slot-scope="scope">
                    <img style="width: 50px;height: 50px" :src="scope.row.avatar" alt="头像">
                  </template>
                </el-table-column>
                <el-table-column
                  prop="mobile"
                  label="手机号"
                  width="120px"
                >
                </el-table-column>
                <el-table-column
                  prop="nickname"
                  label="昵称"
                >
                </el-table-column>
                <el-table-column
                  prop="gmtCreate"
                  label="注册时间"
                  width="150px"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.gmtCreate | formatDate }}</span>
                  </template>
                </el-table-column>

              </el-table>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="15" style="margin-left: 20px">
        <div class="grid-content bg-purple-light">
          <el-card class="box-card" shadow="hover" style="height: 520px">
            <div id="chart" class="chart" style="height: 500px; width: 100%;"/>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import * as echarts from "echarts";
import userApi from "@/api/acl/user";
import staApi from "@/api/sta";

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    return {
      countData: {},
      userInfo: {},
      roles: [],
      teachers: [],
      title: "最近一周注册用户数量",
      chart: null,
      xData: [],
      yData: [],
      tableData: [],
      tableData1: [],
      customColors: [
        {color: '#ff0000', percentage: 10},
        {color: '#da1010', percentage: 20},
        {color: '#c02727', percentage: 30},
        {color: '#f56c6c', percentage: 40},
        {color: '#ff9400', percentage: 50},
        {color: '#da8715', percentage: 60},
        {color: '#05f854', percentage: 70},
        {color: '#20c455', percentage: 80},
        {color: '#1989fa', percentage: 90},
        {color: '#6f7ad3', percentage: 100}
      ]
    };

  },
  filters: {
    formatDate(value) {
      const date = new Date(value);
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = ('0' + date.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    }
  },
  created() {
    this.getUserInfo();
    this.getCountData();
    this.getHotTeacher();
    this.getRecentUpCourse();
    this.getRecentRegister();
    this.getRegistData();
  },
  mounted() {
    this.showChart()
  },
  methods: {
    formatDateString(date) {
      var year = date.getFullYear();
      var month = ("0" + (date.getMonth() + 1)).slice(-2);
      var day = ("0" + date.getDate()).slice(-2);
      return year + "-" + month + "-" + day;
    },
    getRegistData() {
      var today = new Date(); // 获取当前日期
      var sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000); // 获取七天前的日期
      //最近七天注册人数
      var searchObj = {
        type: "register_num",
        begin: this.formatDateString(sevenDaysAgo),
        end: this.formatDateString(today)
      };
      staApi.getDataSta(searchObj).then(res => {
        console.log(res);
        this.xData = res.data.date_calculatedList;
        this.yData = res.data.numDataList;
        this.showChart();
      })
    },


    //最近上架的前5个课程
    getRecentUpCourse() {
      staApi.getRecentCourse().then(response => {
        this.tableData = response.data.list;
      })
    },


    //最近注册的前8个用户
    getRecentRegister() {
      staApi.getRecentUser().then(response => {
        this.tableData1 = response.data.list;
      })
    },


    getHotTeacher() {
      staApi.getHotTeacher().then(response => {
        let result = response.data.items;
        const total = result.reduce((acc, item) => acc + item.percentage, 0);
        result = result.map(item => ({
          ...item,
          percentage: parseInt((item.percentage / total * 100).toFixed(2))
        }));
        this.teachers = result;
      })
    },


    getCountData() {
      staApi.getCountData().then(response => {
        this.countData = response.data.item;
      })
    },

    getUserInfo() {
      userApi.getUserInfo().then(response => {
        this.userInfo = response.data.user;
        this.roles = response.data.roles.assignRoles;
      })
    },
    showChart() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(document.getElementById("chart"));
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
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ["line", "bar"]},
            restore: {show: true},
            saveAsImage: {show: true},
          },
        },
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
      option.xAxis.data = this.xData
      option.series[0].data = this.yData
      option && this.chart.setOption(option, true)
      // this.chart.setOption(option);
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  .el-row {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
