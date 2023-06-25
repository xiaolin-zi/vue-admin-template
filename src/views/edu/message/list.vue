<template>
  <div class="app-container">
    <div class="search-container">
      <el-form :inline="true" :model="searchObj" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="searchObj.nickname" placeholder="用户昵称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="searchObj.message" placeholder="留言内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getMessageList">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="content-container">
      <el-table :data="messageList" border style="width: 100%">
        <el-table-column prop="nickname" label="用户昵称" width="180"></el-table-column>
        <el-table-column prop="message" label="留言内容"></el-table-column>
        <el-table-column prop="gmtCreate" label="留言时间" width="180"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
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
  </div>
</template>

<script>

import messageApi from '@/api/edu/message';

export default {
  //写核心代码位置
  data() {
    //定义变量和初始值
    return {
      pageInfo: {
        pageNum: 1,
        pageSize: 5,
        total: 0,
      },
      searchObj: {
        nickname: '',
        message: '',
      },
      messageList: [],
    };
  },
  created() {
    //初始化数据
    this.getMessageList();
  },
  methods: {
    getMessageList() {
      messageApi.getMessages(this.pageInfo.pageNum, this.pageInfo.pageSize,this.searchObj).then(res => {
        this.messageList = res.data.rows;
        this.pageInfo.total = res.data.total;
      });
    },
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      this.getMessageList();
    },
    handleCurrentChange(val) {
      this.pageInfo.pageNum = val;
      this.getMessageList();
    },

    handleGoDelete(row) {
      this.$confirm('此操作将永久删除该留言, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          messageApi.deleteMessage(row.id).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!',
            });
            this.getMessageList();
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
    },
  }
};
</script>

<style lang="scss" scoped>

</style>
