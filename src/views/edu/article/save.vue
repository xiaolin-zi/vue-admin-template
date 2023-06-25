<template>
  <div class="app-container">
    <h2 style="text-align: center">{{ mytitle }}</h2>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="文章标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="文章作者">
        <el-input v-model="form.author"></el-input>
      </el-form-item>
      <el-form-item label="文章类型">
        <el-select v-model="form.type" placeholder="请选择活动区域">
          <el-option
            v-for="item in types"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章封面">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :action="BASE_API + '/eduoss/fileoss'"
          class="avatar-uploader"
        >
          <img :src="form.cover" style="width: 300px"/>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容">
        <tinymce :height="400" v-model="form.content"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即发布</el-button>
        <el-button @click="toList">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Tinymce from "@/components/Tinymce"; //引入组件
import articleApi from "@/api/edu/article";

export default {
  //声明组件
  components: {
    Tinymce,
  },
  //写核心代码位置
  data() {
    //定义变量和初始值
    return {
      types:[],
      mytitle: "添加文章",
      form: {
        id: "",
        author: "",
        title: "",
        cover: process.env.VUE_APP_OSS_PATH + "/default/a.jpg",
        content: "",
        type: "",
      },
      BASE_API: process.env.VUE_APP_BASE_API, // 接口API地址
    }
  },
  created() {
    //初始化数据
    this.init();

  },
  methods: {
    toList() {
      this.$router.push("/article/list");
    },
    //init初始化数据
    init() {
      if (this.$route.params && this.$route.params.id) {
        this.getArticleById(this.$route.params.id);
        this.mytitle = "编辑文章";
      }
      //获取文章类型
      this.getArticleType();
    },
    getArticleType() {
      articleApi.getArticleType().then(response => {
        console.log(response);
        this.types = response.data.list;
      })
    },
    //根据id查询文章
    getArticleById(id) {
      articleApi.getArticleById(id).then(response => {
        this.form = response.data.article;
      });
    },

    //上传封面成功后调用
    handleAvatarSuccess(res, file) {
      this.form.cover = res.data.url;
    },
    //添加文章
    onSubmit() {
      if (this.form.id) {
        this.updateArticle();
      } else {
        this.saveArticle();
      }

    },

    //修改文章
    updateArticle() {
      articleApi.updateArticle(this.form).then(response => {
        this.$message({
          message: "修改成功",
          type: "success",
          duration: 1500,
        });
        this.$router.push("/article/list");
      });
    },

    //添加文章
    saveArticle() {
      articleApi.saveArticle(this.form).then(response => {
        this.$message({
          message: "添加成功",
          type: "success",
          duration: 1500,
        });
        this.$router.push("/article/list");
      });
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
