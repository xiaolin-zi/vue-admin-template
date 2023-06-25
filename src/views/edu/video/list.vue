<template>
  <div class="app-container">
    <div class="search-container">
      <el-form :inline="true" :model="searchObj" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="searchObj.orderNo" placeholder="订单号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="searchObj.status" placeholder="订单状态">
            <el-option
              v-for="item in orderStatusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getOrderList">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="content-container">


    </div>
  </div>
</template>

<script>



export default {
  //写核心代码位置
  data() {
    //定义变量和初始值
    return {
      searchObj: {

      },
    };
  },
  created() {

  },
  methods: {

  }
};
</script>

<style lang="scss" scoped>

</style>
