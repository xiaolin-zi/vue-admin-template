<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="信息描述">
        <el-tag type="info">excel模版说明</el-tag>
        <el-tag>
          <i class="el-icon-download" />
          <a :href="OSS_PATH + '/default/template.xlsx'">点击下载模版</a>
        </el-tag>
      </el-form-item>

      <el-form-item label="选择Excel">
        <el-upload
          ref="upload"
          :auto-upload="false"
          :on-success="fileUploadSuccess"
          :on-error="fileUploadError"
          :disabled="importBtnDisabled"
          :limit="1"
          :action="BASE_API + '/eduservice/subject/addSubject'"
          name="file"
          accept=".xls,.xlsx"
        >
          <el-button slot="trigger" size="small" type="primary"
            >选取文件</el-button
          >
          <el-button
            :loading="loading"
            style="margin-left: 10px"
            size="small"
            type="success"
            @click="submitUpload"
            >上传到服务器</el-button
          >
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      BASE_API: process.env.VUE_APP_BASE_API, // 接口API地址
      OSS_PATH: process.env.VUE_APP_OSS_PATH, // 阿里云OSS地址
      importBtnDisabled: false, // 按钮是否禁用,
      loading: false, // 是否显示上传中
    };
  },
  created() {},
  methods: {
    //点击按钮上传文件到接口里面
    submitUpload() {
      //判断是否有文件
      if (this.$refs.upload.uploadFiles.length != 0) {
        this.importBtnDisabled = true;
        this.loading = true;
        this.$refs.upload.submit();
      } else {
        this.$message({
          type: "error",
          message: "您还未选择文件哦！",
        });
      }
    },
    //上传成功的回调
    fileUploadSuccess() {
      this.loading = false;
      this.$message({
        type: "success",
        message: "添加课程分类成功！",
      });
      // 上传成功之后清除历史记录;否则只能上传一次
      this.$refs.upload.clearFiles();

      //跳转到课程分类列表
      //路由跳转
      this.$router.push("/subject/list");
    },

    //上传失败的回调
    fileUploadError() {
      this.loading = false;
      this.$message({
        type: "error",
        message: "添加课程分类失败",
      });
      // 上传成功之后清除历史记录;否则只能上传一次
      this.$refs.upload.clearFiles();
    },
  },
};
</script>
