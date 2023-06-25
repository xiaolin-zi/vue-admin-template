<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新课程</h2>
    <el-steps
      :active="1"
      process-status="wait"
      align-center
      style="margin-bottom: 40px"
    >
      <el-step title="填写课程基本信息"></el-step>
      <el-step title="创建课程大纲"></el-step>
      <el-step title="最终发布"></el-step>
    </el-steps>
    <el-form label-width="120px">
      <el-form-item label="课程标题">
        <el-input
          v-model="courseInfo.title"
          placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"
        />
      </el-form-item>

      <!-- 所属分类 TODO -->
      <el-form-item label="课程分类">
        <el-select
          v-model="courseInfo.subjectParentId"
          placeholder="一级分类"
          @change="subjectLevelOneChanged"
        >
          <el-option
            v-for="subject in subjectOneList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>

        <!-- 二级分类 -->
        <el-select v-model="courseInfo.subjectId" placeholder="二级分类">
          <el-option
            v-for="subject in subjectTwoList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>
      </el-form-item>

      <!-- 课程讲师 TODO -->
      <!-- 课程讲师 -->
      <el-form-item label="课程讲师">
        <el-select v-model="courseInfo.teacherId" placeholder="请选择">
          <el-option
            v-for="teacher in teacherList"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="总课时">
        <el-input-number
          :min="0"
          v-model="courseInfo.lessonNum"
          controls-position="right"
          placeholder="请填写课程的总课时数"
        />
      </el-form-item>

      <!-- 课程简介 TODO -->
      <el-form-item label="课程简介">
        <!-- <el-input v-model="courseInfo.description" placeholder=" " /> -->
        <tinymce :height="300" v-model="courseInfo.description" />
      </el-form-item>

      <!-- 课程封面 TODO -->
      <!-- 课程封面-->
      <el-form-item label="课程封面">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :action="BASE_API + '/eduoss/fileoss'"
          class="avatar-uploader"
        >
          <img :src="courseInfo.cover" style="width: 300px" />
        </el-upload>
      </el-form-item>

      <el-form-item label="课程价格">
        <el-input-number
          :min="0"
          v-model="courseInfo.price"
          controls-position="right"
          placeholder="免费课程请设置为0元"
        />
        元
      </el-form-item>

      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate"
          >保存并下一步</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import course from "@/api/edu/course";
import subject from "@/api/edu/subject";
import Tinymce from "@/components/Tinymce"; //引入组件
export default {
  //声明组件
  components: {
    Tinymce,
  },
  data() {
    return {
      saveBtnDisabled: false,
      courseInfo: {
        title: "",
        subjectId: "",
        subjectParentId: "",
        teacherId: "",
        lessonNum: 0,
        description: "",
        cover: process.env.VUE_APP_OSS_PATH + "/default/a.jpg",
        price: 0,
      },
      courseId: "",
      teacherList: [], //讲师列表
      subjectOneList: [], //一级分类列表
      subjectTwoList: [], //二级分类列表
      BASE_API: process.env.VUE_APP_BASE_API, // 接口API地址
    };
  },
  created() {
    //获取路由中的id
    if (this.$route.params && this.$route.params.id) {
      this.courseId = this.$route.params.id;
      //获取课程信息
      this.getCourseInfo();
    } else {
      //获取讲师列表
      this.getTeacherList();
      //初始化一级分类
      this.getOneSubject();
    }
  },
  methods: {
    //根据课程id查询课程信息
    getCourseInfo() {
      course
        .getCourseInfoById(this.courseId)
        .then((response) => {
          //在courseInfo中有课程基本信息，包含一级分类id，二级分类id
          this.courseInfo = response.data.courseInfo;
          //1查询所有分类，包含一级和二级
          subject.getSubjectList().then((response) => {
            //2一级分类列表
            this.subjectOneList = response.data.list;
            //3把所有一级分类数据进行遍历。比较当前courseInfo里面一级分类id和所有一级分类id是否一致
            for (let i = 0; i < this.subjectOneList.length; i++) {
              //4如果一致，把当前一级分类的二级分类赋值给subjectTwoList
              if (
                this.subjectOneList[i].id == this.courseInfo.subjectParentId
              ) {
                this.subjectTwoList = this.subjectOneList[i].children;
              }
            }
            //获取讲师列表
            this.getTeacherList();
          });
        })
        .catch((error) => {
          this.$message.error(error.message || "课程信息获取失败");
        });
    },
    //上传封面成功后调用
    handleAvatarSuccess(res, file) {
      this.courseInfo.cover = res.data.url;
    },
    //上传之前调用
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //点击一级分类时触发
    subjectLevelOneChanged(value) {
      //value是一级分类的id
      //根据一级分类id查询二级分类
      //遍历所有分类,包含一级和二级
      for (let i = 0; i < this.subjectOneList.length; i++) {
        let subject = this.subjectOneList[i];
        if (subject.id == value) {
          //应该要把二级分类清空
          this.courseInfo.subjectId = "";
          //找到了一级分类的children
          this.subjectTwoList = subject.children;
        }
      }
    },
    //查询所有一级分类
    getOneSubject() {
      subject.getSubjectList().then((response) => {
        this.subjectOneList = response.data.list;
      });
    },
    getTeacherList() {
      course.getTeacherList().then((response) => {
        this.teacherList = response.data.items;
      });
    },
    //添加课程
    addCourse() {
      //保存课程基本信息
      course.addCourseInfo(this.courseInfo).then((response) => {
        //提示
        this.$message({
          message: "添加课程成功！",
          type: "success",
        });

        this.saveBtnDisabled = false;

        //跳转到下一步
        this.$router.push("/course/chapter/" + response.data.courseId);
      });
    },
    //修改课程
    updateCourse() {
      course.updateCourseInfo(this.courseInfo).then((response) => {
        this.$message({
          message: "修改课程成功！",
          type: "success",
        });

        this.saveBtnDisabled = false;

        //跳转到下一步
        this.$router.push("/course/chapter/" + this.courseId);
      });
    },
    saveOrUpdate() {
      this.saveBtnDisabled = true;
      //判断是添加还是修改
      if (!this.courseId) {
        //添加
        this.addCourse();
      } else {
        console.log(this.courseId);
        //修改
        this.updateCourse();
      }
    },
  },
};
</script>
<style scoped>
.tinymce-container {
  line-height: 29px;
}
</style>