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
      <el-table :data="orderList" border style="width: 100%">
        <el-table-column prop="orderNo" label="订单号" width="180"></el-table-column>
        <el-table-column prop="courseTitle" label="课程名称" width="180"></el-table-column>
        <el-table-column prop="teacherName" label="讲师名称"></el-table-column>
        <el-table-column prop="mobile" label="会员手机"></el-table-column>
        <el-table-column prop="nickname" label="会员昵称"></el-table-column>
        <el-table-column prop="totalFee" label="应付金额" width="100"></el-table-column>
        <el-table-column prop="payType" label="支付类型" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.payType == 1">微信</span>
            <span v-else-if="scope.row.payType == 2">支付宝</span>
            <span v-else>其他</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="订单状态" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0">未支付</span>
            <span v-else-if="scope.row.status == 1">已支付</span>
          </template>
        </el-table-column>
        <el-table-column prop="gmtCreate" label="下单时间" width="180"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleGoUpdate(scope.row)">修改</el-button>
            <el-button type="danger" size="mini" @click="handleGoDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.pageNum"
        :page-sizes="[5, 10, 20, 50, 100]"
        :page-size="pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total"
      ></el-pagination>
    </div>

    <!--修改订单弹窗-->
    <el-dialog title="订单信息更新" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="会员手机" label-width="120px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="支付金额" label-width="120px">
          <el-input v-model="form.totalFee" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="支付状态" label-width="120px">
          <el-select v-model="form.status" placeholder="请选择">
            <el-option label="未支付" :value="0"></el-option>
            <el-option label="已支付" :value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="toUpdateOrder">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import orderApi from '@/api/edu/order';

export default {
  //写核心代码位置
  data() {
    //定义变量和初始值
    return {
      dialogFormVisible: false,
      orderList: [],
      orderStatusList: [
        {label: '全部', value: ''},
        {label: '未支付', value: 0},
        {label: '已支付', value: 1},
      ],
      form: {
        id: '',
        totalFee: '',
        mobile: '',
        status: '',
      },
      searchObj: {
        orderNo: '',
        status: '',
      },
      pageInfo: {
        pageNum: 1,
        pageSize: 5,
        total: 0,
      },

    };
  },
  created() {
    //初始化数据
    this.getOrderList();
  },
  methods: {
    //更新订单
    toUpdateOrder() {
      orderApi.updateOrder(this.form).then(() => {
        this.$message({
          type: 'success',
          message: '更新成功!',
        });
        this.dialogFormVisible = false;
        this.getOrderList();
      });
    },


    //删除订单
    handleGoDelete(row) {
      this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        orderApi.deleteOrder(row.orderNo).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!',
          });
          this.getOrderList();
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        });
      });
    },


    //获取订单列表
    getOrderList() {
      orderApi.getOrderList(this.pageInfo.pageNum, this.pageInfo.pageSize, this.searchObj).then((res) => {
        this.orderList = res.data.rows;
        this.pageInfo.total = res.data.total;
      });
    },

    //打开订单修改页面
    handleGoUpdate(row) {
      this.dialogFormVisible = true;
      this.form = row;
    },

    //分页
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      this.getOrderList();
    },
    handleCurrentChange(val) {
      this.pageInfo.pageNum = val;
      this.getOrderList();
    },
  }
};
</script>

<style lang="scss" scoped>

</style>
