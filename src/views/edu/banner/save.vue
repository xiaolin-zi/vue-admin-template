<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="轮播图名称">
        <el-input v-model="banner.title" />
      </el-form-item>
      <el-form-item label="轮播图排序">
        <el-input-number
          v-model="banner.sort"
          controls-position="right"
          :min="0"
        />
      </el-form-item>

      <el-form-item label="链接地址">
        <el-input v-model="banner.linkUrl" :rows="10" type="text" />
      </el-form-item>

      <el-form-item label="轮播图">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :action="BASE_API + '/eduoss/fileoss'"
          class="avatar-uploader"
        >
          <img :src="banner.imageUrl" style="width: 300px" />
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import banner from "@/api/edu/banner";

export default {
  data() {
    return {
      banner: {
        title: "",
        sort: 0,
        imageUrl: process.env.VUE_APP_OSS_PATH + "/default/a.jpg",
        linkUrl: "",
      },
      BASE_API: process.env.VUE_APP_BASE_API, //获取.env.development里面的值
    };
  },
  created() {},

  methods: {
    //上传封面成功后调用
    handleAvatarSuccess(res, file) {
      console.log(res.data.url);
      this.banner.imageUrl = res.data.url;
    },
    //上传之前调用
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!isLt2M) {
        this.$message.error("上传轮播图图片大小不能超过 5MB!");
      }
      return isLt2M;
    },
    //添加轮播图
    save() {
      banner.addBanner(this.banner).then((res) => {
        //添加成功
        //提示信息
        this.$message({
          type: "success",
          message: "添加成功！",
        });

        //回到列表页面 路由跳转
        this.$router.push({ path: "/banner/list" });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>