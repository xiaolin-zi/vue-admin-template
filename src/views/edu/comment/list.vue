<template>
  <div class="app-container">
    <div class="search-container">
      <el-form :inline="true" :model="searchObj" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="searchObj.courseName" placeholder="课程名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="searchObj.content" placeholder="评论内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getCommentList">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="content-container">
      <el-table :data="commentList" border style="width: 100%">
        <el-table-column prop="nickname" label="用户昵称" width="180"></el-table-column>
        <el-table-column prop="avatar" label="用户头像" width="180">
          <template slot-scope="scope">
            <img :src="scope.row.avatar" alt="" style="width: 50px; height: 50px; border-radius: 50%;" />
          </template>
        </el-table-column>
        <el-table-column prop="courseName" label="评论课程"></el-table-column>
        <el-table-column prop="content" label="评论内容"></el-table-column>
        <el-table-column prop="agreeCount" label="获赞数"></el-table-column>
        <el-table-column  label="回复详情">
          <template slot-scope="scope">
            {{scope.row.nickname}} 回复 {{scope.row.toNickname}}
          </template>
        </el-table-column>
        <el-table-column prop="gmtCreate" label="评论时间" width="180"></el-table-column>
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
        :page-sizes="[4,8,12, 20, 50, 100]"
        :page-size="pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>

import commentApi from '@/api/edu/comment';

export default {
  //写核心代码位置
  data() {
    //定义变量和初始值
    return {
      pageInfo: {
        pageNum: 1,
        pageSize: 4,
        total: 0,
      },
      searchObj: {
        courseName: '',
        content: '',
      },
      commentList: [],
    };
  },
  created() {
    //初始化数据
    this.getCommentList();
  },
  methods: {
    getCommentList() {
      commentApi.getCommentList(this.pageInfo.pageNum, this.pageInfo.pageSize,this.searchObj).then(res => {
        console.log(res);
        this.commentList = res.data.commentList;
        this.pageInfo.total = res.data.total;
      });
    },
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      this.getCommentList();
    },
    handleCurrentChange(val) {
      this.pageInfo.pageNum = val;
      this.getCommentList();
    },

    handleGoDelete(row) {
      this.$confirm('此操作将永久删除该留言, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          commentApi.deleteComment(row.id).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!',
            });
            this.getCommentList();
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
