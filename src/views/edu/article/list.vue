<template>
  <div class="app-container">
    <div class="search-container">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="标题">
          <el-input v-model="searchForm.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="searchForm.author" placeholder="请输入作者"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="searchForm.status" placeholder="文章状态">
            <el-option
              v-for="item in articleStatusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="content-container">
      <el-table :data="articleList" border style="width: 100%" >
        <el-table-column prop="author" label="文章作者"></el-table-column>
        <el-table-column prop="title" label="文章标题" width="180">
          <template slot-scope="scope">
            <el-link type="success" :underline="false" @click.prevent="toUpdateArticle(scope.row)">{{ scope.row.title }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="cover" label="文章封面">
          <template slot-scope="scope">
            <img :src="scope.row.cover" alt="" style="width: 100px; ">
          </template>
        </el-table-column>
        <el-table-column prop="type" label="文章类型"></el-table-column>
        <el-table-column prop="gmtCreate" label="发布时间"></el-table-column>
        <el-table-column prop="status" label="文章状态" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0">未发布</span>
            <span v-else-if="scope.row.status == 1">已发布</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleGoUp(scope.row)">
              {{ scope.row.status == 0 ? '发布' : '下架' }}
            </el-button>
            <el-button type="danger" size="mini" @click="handleGoDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
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

import articleApi from "@/api/edu/article";

export default {
  //写核心代码位置
  data() {
    //定义变量和初始值
    return {
      articleStatusList: [
        {label: '全部', value: ''},
        {label: '未发布', value: 0},
        {label: '已发布', value: 1},
      ],
      article: [],
      searchForm: {
        title: '',
        author: '',
        status: ''
      },
      pageInfo: {
        pageNum: 1,
        pageSize: 5,
        total: 0
      }
    }
  },
  created() {
    //初始化数据
    this.getArticleList();
  },
  methods: {

    //去更新文章
    toUpdateArticle(row) {
      this.$router.push(`/article/edit/${row.id}`);
    },

    handleGoDelete(row) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        articleApi.deleteArticle(row.id).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getArticleList();
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleGoUp(row) {
      var options = '';
      if (row.status == 0) {
        options = '发布';
      } else {
        options = '下架';
      }
      //提示
      this.$confirm(`此操作将${options}该文章, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        articleApi.publishArticle(row.id).then(response => {
          this.$message({
            type: 'success',
            message: `${options}成功!`
          });
          // this.getArticleList();
          //重新加载页面
          window.location.reload();
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: `已取消${options}`
        });
      });
    },
    search() {
      this.pageInfo.pageNum = 1;
      this.getArticleList();
    },
    getArticleList() {
      articleApi.getList(this.pageInfo.pageNum, this.pageInfo.pageSize, this.searchForm).then(response => {
        this.articleList = response.data.records;
        this.pageInfo.total = response.data.total;
      })
    },
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      this.getArticleList();
    },
    handleCurrentChange(val) {
      this.pageInfo.pageNum = val;
      this.getArticleList();
    },
  }
};
</script>

<style lang="scss" scoped>

</style>
