<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="bannerQuery.title" placeholder="轮播图名" />
      </el-form-item>

      <el-form-item label="添加时间">
        <el-date-picker
          v-model="bannerQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-form-item>
        <el-date-picker
          v-model="bannerQuery.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getbannerList()"
        >查 询</el-button
      >
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <el-table :data="bannerList" border fit highlight-current-row>
      <el-table-column label="序号" width="100" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="名称" width="200" />

      <el-table-column label="轮播图" width="349">
        <template slot-scope="scope">
          <div class="pic">
            <img
              :src="scope.row.imageUrl"
              :alt="scope.row.title"
              width="320px"
            />
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="linkUrl" label="跳转地址" width="200" />

      <el-table-column prop="gmtCreate" label="添加时间" width="200" />

      <el-table-column prop="sort" label="排序" width="100" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="openBanner(scope.row.id)"
            >修改</el-button
          >

          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>


    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :page-sizes="[5, 10, 20, 30,40,50,100]"
      :total="total"
      style="padding: 30px 0; text-align: center"
      layout="total, sizes, prev, pager, next, jumper"
      @current-change="getbannerList"
      @size-change="changeSize"
    />

    <el-dialog title="编辑课程基本信息" :visible.sync="openupdateBanner">
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
          <el-button type="primary" @click="update">更新</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
//引入调用teacher.js文件
import banner from "@/api/edu/banner";

export default {
  //写核心代码位置
  data() {
    //定义变量和初始值
    return {
      page: 1, //当前页码
      limit: 5, //每页显示的条数
      bannerQuery: {}, //查询条件
      total: 0, //总记录数
      bannerList: [], //列表
      openupdateBanner: false,
      banner: {
        title: "",
        sort: 0,
        imageUrl: process.env.VUE_APP_OSS_PATH + "/default/a.jpg",
        linkUrl: "",
      },
      BASE_API: process.env.VUE_APP_BASE_API, //获取.env.development里面的值
    };
  },
  created() {
    //页面渲染之前执行，一般调用methods定义的方法
    this.getbannerList();
  },
  methods: {

    // 当页码发生改变的时候
    changeSize(size) {
      console.log(size)
      this.limit = size
      this.getbannerList(1)
    },


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
    update() {
      banner.updateBanner(this.banner).then((res) => {
        //提示
        this.$message({
          type: "success",
          message: "更新成功!",
        });
        //关闭
        this.openupdateBanner = false;
        //刷新页面
        this.getbannerList();
      });
    },
    openBanner(id) {
      (this.banner = {
        title: "",
        sort: 0,
        imageUrl: process.env.VUE_APP_OSS_PATH + "/default/a.jpg",
        linkUrl: "",
      }),
        //根据id查询banner
        banner.getBannerInfo(id).then((res) => {
          this.banner = res.data.item;
        });

      this.openupdateBanner = true;
    },
    //创建具体的方法，调用teacher.js定义的方法
    getbannerList(page = 1) {
      this.page = page;
      banner
        .getBannerListPage(this.page, this.limit, this.bannerQuery)
        .then((response) => {
          //response接口返回的数据
          //   console.log(response);
          this.bannerList = response.data.items; //获取讲表
          this.total = response.data.total; //获取总记录数
        }) //请求成功
        .catch((error) => {
          console.log(error);
        }); //请求失败
    },
    resetData() {
      //清空的方法
      //清空查询条件
      this.bannerQuery = {};
      //重新查询
      this.getbannerList();
    },
    //删除
    removeDataById(id) {
      //询问是否删除
      this.$confirm("是否删除此条banner记录？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //点击确定执行
          //调用删除的方法
          banner
            .deleteBannerId(id)
            .then((response) => {
              //删除成功
              //提示信息
              this.$message({
                type: "success",
                message: "删除成功",
              });
              //重新查询
              this.getbannerList(this.page);
            })
            .catch((error) => {
              //删除失败
              console.log(error);
              //提示信息
              this.$message({
                type: "error",
                message: "删除失败",
              });
            });
        })
        .catch(() => {
          //点击取消执行
          //提示信息
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
