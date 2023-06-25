<template>
  <div class="type">
    <h2 style="text-align: center">文章分类</h2>
    <div style="width: 600px;margin: 0 auto">
      <div style="width: 100%;">
        <el-tag
          v-for="tag in tags"
          :key="tag.name"
          closable
          style="margin: 10px"
          @close="handleClose(tag)"
          :type="tag.type">
          {{tag.name}}

        </el-tag>
      </div>
      <div style="width: 100%;margin-top: 50px;margin-left: 10px">
        <el-input type="text" v-model="articleType.name" size="small" style="width: 50%;" placeholder="标签名"></el-input>
        <br><br>
        <el-button type="primary" size="small" style="width: 100px;" @click="addTag">添加标签</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import articleApi from "@/api/edu/article";
export default {
  data() {
    return {
      articleType: {
        name:""
      },
      tags: [],
    };
  },
  created() {
    this.getTags();
  },
  methods: {
    getTags() {
      articleApi.getArticleType().then(response => {
        console.log(response);
        //轮流注入type，有五种类型，success、info、warning、danger、''，''表示默认
        var type = ['success', 'info', 'warning', 'danger', ''];
        var result = response.data.list;
        for (var i = 0; i < result.length; i++) {
          result[i].type = type[i % 5];
        }
        this.tags = result;
      })
    },
    addTag() {
      articleApi.saveArticleType(this.articleType).then(response => {
        console.log(response);
        //清空输入框
        this.articleType.name = "";
        //提示
        this.$message({
          message: "添加成功",
          type: 'success'
        });
        //重新获取标签
        this.getTags();
      })
    },
    handleClose(tag) {
      //删除标签
      //提示
      this.$confirm('此操作将永久删除该标签, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        articleApi.deleteArticleType(tag.id).then(response => {
          console.log(response);
          //提示
          this.$message({
            message: "删除成功",
            type: 'success'
          });
          //重新获取标签
          this.getTags();
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
}
</script>
