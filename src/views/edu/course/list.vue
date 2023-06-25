<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <!-- 所属分类：级联下拉列表 -->
      <!-- 一级分类 -->
      <el-form-item label="课程类别">
        <el-select
          v-model="courseQuery.subjectParentId"
          placeholder="请选择"
          @change="subjectLevelOneChanged"
        >
          <el-option
            v-for="subject in subjectNestedList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>
        <!-- 二级分类 -->
        <el-select v-model="courseQuery.subjectId" placeholder="请选择">
          <el-option
            v-for="subject in subSubjectList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>
      </el-form-item>
      <!-- 标题 -->
      <el-form-item>
        <el-input v-model="courseQuery.title" placeholder="课程标题" />
      </el-form-item>
      <!-- 讲师 -->
      <el-form-item>
        <el-select v-model="courseQuery.teacherId" placeholder="请选择讲师">
          <el-option
            v-for="teacher in teacherList"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"
          />
        </el-select>
      </el-form-item>
      <!-- 是否上架 -->
      <el-form-item>
        <el-select v-model="courseQuery.status" placeholder="请选择上架状态">
          <el-option label="已发布" value="Normal" />
          <el-option label="未发布" value="Draft" />
        </el-select>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getCourseList()"
        >查 询</el-button
      >
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!--表格-->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row
      row-class-name="myClassList"
    >
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="课程信息" width="470" align="center">
        <template slot-scope="scope">
          <div class="info">
            <div class="pic">
              <img
                :src="scope.row.cover"
                :alt="scope.row.title"
                width="150px"
              />
            </div>
            <div class="title">
              <a href="">{{ scope.row.title }}</a>
              <span>{{ scope.row.lessonNum }}</span>
              课时
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.gmtCreate.substr(0, 10) }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.gmtModified.substr(0, 10) }}
        </template>
      </el-table-column>

      <el-table-column label="课程发布" align="center">
        <template slot-scope="scope">
          <el-button @click="toDelisting(scope.row)" type="primary" v-if="scope.row.status === 'Draft'">
            上架
          </el-button>
          <el-button @click="toListing(scope.row)" type="danger" v-if="scope.row.status === 'Normal'">下架</el-button>
        </template>
      </el-table-column>


      <el-table-column label="价格" width="100" align="center">
        <template slot-scope="scope">
          {{
            Number(scope.row.price) === 0
              ? "免费"
              : "¥" + scope.row.price.toFixed(2)
          }}
        </template>
      </el-table-column>
      <el-table-column
        prop="buyCount"
        label="付费学员"
        width="100"
        align="center"
      >
        <template slot-scope="scope"> {{ scope.row.buyCount }}人 </template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <!-- <router-link :to="'/edu/course/info/' + scope.row.id"> -->
          <el-button
            type="text"
            size="mini"
            icon="el-icon-edit"
            @click="openupdateCourseInfo(scope.row.id)"
            >编辑课程信息</el-button
          >
          <!-- </router-link> -->
          <!-- <router-link :to="'/edu/course/chapter/' + scope.row.id"> -->
          <el-button
            type="text"
            size="mini"
            icon="el-icon-edit"
            @click="openupdateChapter(scope.row.id)"
            >编辑课程大纲</el-button
          >
          <!-- </router-link> -->
          <el-button
            type="text"
            size="mini"
            icon="el-icon-delete"
            @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>


    <el-dialog :visible.sync="dialogUpdateChapter" title="编辑课程大纲">
      <el-button type="text" @click="openChapterDialog">添加章节</el-button>
      <el-input
        placeholder="输入关键字进行过滤"
        v-model="filterText"
        style="margin-bottom: 20px"
      >
      </el-input>
      <el-collapse>
        <el-collapse-item
          :name="chapter.id"
          v-for="chapter in myList"
          :key="chapter.id"
          class="chapter-item"
        >
          <template slot="title">
            <p class="chapter-title" style="width: 60%">
              {{ chapter.title }}
            </p>
            <span class="operation">
              <el-button
                style=""
                type="text"
                @click.stop="openVideo(chapter.id)"
                >添加小节</el-button
              >
              <el-button
                style=""
                type="text"
                @click.stop="openEditChapter(chapter.id)"
                >编辑</el-button
              >
              <el-button type="text" @click.stop="removeChapter(chapter)"
                >删除</el-button
              >
            </span>
          </template>
          <ul class="chanpterList videoList">
            <li v-for="video in chapter.children" :key="video.id">
              <p>
                {{ video.title }}
                <span class="acts">
                  <el-button
                    style=""
                    type="text"
                    @click="openEditVideo(video.id)"
                    >编辑</el-button
                  >
                  <el-button type="text" @click="removeVideo(video.id)"
                    >删除</el-button
                  >
                </span>
              </p>
            </li>
          </ul>
        </el-collapse-item>
      </el-collapse>
      <el-button @click="dialogUpdateChapter = false" type="primary"
        >完成</el-button
      >
    </el-dialog>

    <!-- 添加和修改章节表单 -->
    <el-dialog
      :visible.sync="dialogChapterFormVisible"
      append-to-body
      :title="dialogText"
    >
      <el-form :model="chapter" label-width="120px">
        <el-form-item label="章节标题">
          <el-input v-model="chapter.title" />
        </el-form-item>
        <el-form-item label="章节排序">
          <el-input-number
            v-model="chapter.sort"
            :min="0"
            controlsposition="
right"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogChapterFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加和修改课时表单 -->
    <el-dialog
      :visible.sync="dialogVideoFormVisible"
      append-to-body
      :title="videoDialogText"
      :before-close="closeAddVideo"
    >
      <el-form :model="video" label-width="120px">
        <el-form-item label="课时标题">
          <el-input v-model="video.title" />
        </el-form-item>
        <el-form-item label="课时排序">
          <el-input-number
            v-model="video.sort"
            :min="0"
            controlsposition="
right"
          />
        </el-form-item>
        <el-form-item label="是否免费">
          <el-radio-group v-model="video.isFree">
            <el-radio :label="true">免费</el-radio>
            <el-radio :label="false">默认</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上传视频">
          <el-upload
            :on-success="handleVodUploadSuccess"
            :on-remove="handleVodRemove"
            :before-remove="beforeVodRemove"
            :on-exceed="handleUploadExceed"
            :file-list="fileList"
            :action="BASE_API + '/eduvod/video/uploadAliyunVideo'"
            :limit="1"
            class="upload-demo"
          >
            <el-button size="small" type="primary">上传视频</el-button>
            <el-tooltip placement="right-end">
              <div slot="content">
                最大支持1G，<br />
                支持3GP、ASF、AVI、DAT、DV、FLV、F4V、<br />
                GIF、M2T、M4V、MJ2、MJPEG、MKV、MOV、MP4、<br />
                MPE、MPG、MPEG、MTS、OGG、QT、RM、RMVB、<br />
                SWF、TS、VOB、WMV、WEBM 等视频格式上传
              </div>
              <i class="el-icon-question" />
            </el-tooltip>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeAddVideo">取 消</el-button>
        <el-button
          :disabled="saveVideoBtnDisabled"
          type="primary"
          @click="saveOrUpdateVideo"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <el-dialog
      title="编辑课程基本信息"
      :visible.sync="dialogCourseFormVisible"
      top="0"
    >
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
              v-for="subject in subjectNestedList"
              :key="subject.id"
              :label="subject.title"
              :value="subject.id"
            />
          </el-select>

          <!-- 二级分类 -->
          <el-select v-model="courseInfo.subjectId" placeholder="二级分类">
            <el-option
              v-for="subject in subSubjectList"
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
          <el-button type="primary" @click="updateCourse">保存修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="getCourseList"
    />
  </div>
</template>

<script>
import course from "@/api/edu/course";
import subject from "@/api/edu/subject";
import Tinymce from "@/components/Tinymce"; //引入组件
import chapter from "@/api/edu/chapter";
import video from "@/api/edu/video";
export default {
  data() {
    return {
      fileList: [], //上传文件列表
      BASE_API: process.env.VUE_APP_BASE_API, // 接口API地址
      video: {
        title: "",
        sort: 0,
        isFree: false,
        videoSourceId: "",
        videoOriginalName: "", //视频名称
      },
      chapter: {
        //章节表单数据
        title: "",
        sort: 0,
      },
      dialogText: "",
      filterText: "",
      videoDialogText: "",
      saveBtnDisabled: false,
      saveVideoBtnDisabled: false,
      dialogChapterFormVisible: false,
      dialogVideoFormVisible: false,
      dialogUpdateChapter: false,
      chapterVideoList: [],
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

      dialogCourseFormVisible: false,
      listLoading: true, // 是否显示loading信息
      list: null, // 数据列表
      total: 0, // 总记录数
      page: 1, // 页码
      limit: 10, // 每页记录数
      courseQuery: {
        subjectParentId: "",
        subjectId: "",
        title: "",
        teacherId: "",
        status: "",
        lessonNum: "",
      }, // 查询条件
      teacherList: [], // 讲师列表
      subjectNestedList: [], // 一级分类列表
      subSubjectList: [], // 二级分类列表,
    };
  },
  //声明组件
  components: {
    Tinymce,
  },
  created() {
    this.getCourseList();
    // 初始化分类列表
    this.initSubjectList();
    // 获取讲师列表
    this.initTeacherList();
  },
  computed: {
    myList() {
      return this.chapterVideoList.filter((c) => {
        return (
          c.title.toLowerCase().indexOf(this.filterText.toLowerCase()) !== -1
        );
      });
    },
  },
  methods: {
    //上架课程
    toDelisting(row){
      console.log(row)
      //提示
      this.$confirm(`是否上架课程《${row.title}》？`)
        .then(() => {
          course.updateCourseStatus(row.id,1).then((response) => {
            this.$message({
              type: "success",
              message: "上架成功",
            });
            this.getCourseList();
          });
        })
        .catch(() => {});
    },

    //下架课程
    toListing(row){
      //提示
      this.$confirm(`是否下架课程《${row.title}》？`)
        .then(() => {
          course.updateCourseStatus(row.id,0).then((response) => {
            this.$message({
              type: "success",
              message: "下架成功",
            });
            this.getCourseList();
          });
        })
        .catch(() => {

        });
    },

    //关闭或取消添加小节时调用
    closeAddVideo() {
      //判断是不是添加
      if (!this.video.id) {
        //判断是否已经上传了视频
        if (this.video.videoSourceId) {
          //提示
          this.$confirm(`是否中途退出并移除视频？`)
            .then(() => {
              this.dialogVideoFormVisible = false;
              //移除视频
              this.handleVodRemove();
            })
            .catch(() => {});
        } else {
          this.dialogVideoFormVisible = false;
        }
      } else {
        this.dialogVideoFormVisible = false;
      }
    },
    //确定删除时调用
    handleVodRemove() {
      //调用接口删除视频
      video.deleteAliyunvod(this.video.videoSourceId).then((response) => {
        //提示
        this.$message({
          type: "success",
          message: "删除成功！",
        });
        //把文件列表清空
        this.fileList = [];
        //把video视频id和视频名称清空
        this.video.videoSourceId = "";
        //上传视频名称赋值
        this.video.videoOriginalName = "";
        //如果是修改的表单的话还需要更新数据库
        video.updateVideo(this.video).then((response) => {});
      });
    },
    //点击x时调用
    beforeVodRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    //上传成功调用
    handleVodUploadSuccess(response, file, fileList) {
      //上传视频id赋值
      this.video.videoSourceId = response.data.videoId;
      //上传视频名称赋值
      this.video.videoOriginalName = file.name;
    },
    //文件超出个数限制时的钩子
    handleUploadExceed() {
      this.$message({
        type: "warning",
        message: "想要重新上传视频，请先删除已上传的视频",
      });
    },
    //打开修改小节的对话框
    openEditVideo(id) {
      //先清空
      this.fileList = [];
      this.videoDialogText = "修改小节";
      //数据回显
      //根据id查询小节信息
      video.getVideoInfo(id).then((response) => {
        console.log(response.data);
        this.video = response.data.video;
        if (this.video.videoOriginalName) {
          this.fileList = [{ name: this.video.videoOriginalName }];
        }
      });
      this.dialogVideoFormVisible = true;
    },
    //删除小节
    removeVideo(id) {
      this.$confirm("此操作将永久删除该课时, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          video.deleteVideo(id).then((response) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            //刷新页面
            this.getChapterVideo();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    //打开添加小节的对话框
    openVideo(chapterId) {
      this.fileList = [];
      this.videoDialogText = "添加小节";
      //清空表单数据
      this.video = {
        title: "",
        sort: 0,
        free: false,
        videoSourceId: "",
      };
      //打开对话框
      this.dialogVideoFormVisible = true;
      //设置章节id
      this.video.chapterId = chapterId;
    },
    //添加小节
    addVideo() {
      //设置课程id
      this.video.courseId = this.courseId;
      video.addVideo(this.video).then((response) => {
        //关闭对话框
        this.dialogVideoFormVisible = false;
        //提示
        this.$message({
          type: "success",
          message: "添加成功!",
        });
        //刷新页面
        this.getChapterVideo();
      });
    },
    //更新小节
    updateVideo() {
      //判断是否有title
      if (!this.video.title) {
        this.$message({
          type: "warning",
          message: "请输入小节标题!",
        });
        return;
      }

      video.updateVideo(this.video).then((response) => {
        //关闭对话框
        this.dialogVideoFormVisible = false;
        //提示
        this.$message({
          type: "success",
          message: "修改成功!",
        });
        //刷新页面
        this.getChapterVideo();
      });
    },
    //保存或者更新小节
    saveOrUpdateVideo() {
      if (this.video.id) {
        //更新
        this.updateVideo();
      } else {
        //添加
        this.addVideo();
      }
    },
    removeChapter(thechapter) {
      //判断是否有子章节
      if (thechapter.children.length > 0) {
        this.$confirm(
          "此操作会删除该章节和其小节,请谨慎操作，是否继续?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "error",
          }
        )
          .then(() => {
            chapter.deleteAllChapter(thechapter.id).then((response) => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              //刷新页面
              this.getChapterVideo();
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      } else {
        //没有子章节
        this.$confirm("此章节尚未有子章节，可以放心删除，是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            chapter.deleteChapter(thechapter.id).then((response) => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              //刷新页面
              this.getChapterVideo();
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      }
    },
    //修改章节
    updateChapter() {
      //判断title是否为空
      if (this.chapter.title == "") {
        this.$message({
          message: "章节标题不能为空！",
          type: "warning",
        });
        return;
      }
      chapter.updateChapter(this.chapter).then((response) => {
        //关闭对话框
        this.dialogChapterFormVisible = false;
        //提示
        this.$message({
          message: "修改章节成功！",
          type: "success",
        });
        //刷新页面
        this.getChapterVideo();
      });
    },
    //打开编辑章节对话框,数据回显
    openEditChapter(chapterId) {
      //修改弹出框标题
      this.dialogText = "修改章节";
      //弹窗
      this.dialogChapterFormVisible = true;
      chapter.getChapter(chapterId).then((response) => {
        this.chapter = response.data.chapter;
      });
    },
    //弹出添加章节对话框
    openChapterDialog() {
      //修改弹出框标题
      this.dialogText = "添加章节";
      //清空表单数据
      this.chapter.title = "";
      this.chapter.sort = 0;
      //清空id
      this.chapter.id = "";
      //弹出对话框
      this.dialogChapterFormVisible = true;
    },
    //添加章节
    addChapter() {
      //设置课程id到chapter对象中
      this.chapter.courseId = this.courseId;
      //判断title是否为空
      if (this.chapter.title == "") {
        this.$message({
          message: "章节标题不能为空！",
          type: "warning",
        });
        return;
      }
      chapter.addChapter(this.chapter).then((response) => {
        //关闭对话框
        this.dialogChapterFormVisible = false;
        //提示
        this.$message({
          message: "添加章节成功！",
          type: "success",
        });
        //刷新页面
        this.getChapterVideo();
      });
    },
    //添加或修改章节
    saveOrUpdate() {
      //判断是添加还是修改
      if (this.chapter.id) {
        //修改
        this.updateChapter();
      } else {
        //添加
        this.addChapter();
      }
    },

    openupdateChapter(id) {
      this.courseId = id;
      //数据回显
      this.getChapterVideo();
      this.dialogUpdateChapter = true;
    },
    //根据课程id获取章节和小节
    getChapterVideo() {
      chapter.getAllChapterVideo(this.courseId).then((response) => {
        this.chapterVideoList = response.data.allChapterVideo;
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

    updateCourse() {
      course.updateCourseInfo(this.courseInfo).then((response) => {
        this.$message({
          message: "修改课程成功！",
          type: "success",
        });
        //关闭对话框
        this.dialogCourseFormVisible = false;
        //刷新页面
        this.getCourseList();
      });
    },
    openupdateCourseInfo(id) {
      //数据回显
      this.courseId = id;
      this.getCourseInfo();

      this.dialogCourseFormVisible = true;
    },
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
            this.subjectNestedList = response.data.list;
            //3把所有一级分类数据进行遍历。比较当前courseInfo里面一级分类id和所有一级分类id是否一致
            for (let i = 0; i < this.subjectNestedList.length; i++) {
              //4如果一致，把当前一级分类的二级分类赋值给subSubjectList
              if (
                this.subjectNestedList[i].id == this.courseInfo.subjectParentId
              ) {
                this.subSubjectList = this.subjectNestedList[i].children;
              }
            }
            //获取讲师列表
            this.initTeacherList();
          });
        })
        .catch((error) => {
          this.$message.error(error.message || "课程信息获取失败");
        });
    },
    //删除课程
    handleDelete(id) {
      this.$confirm("此操作将永久删除该课程, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          course.deleteCourseById(id).then((response) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getCourseList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //清空查询条件
    resetData() {
      this.courseQuery = {};
      //清空二级分类
      this.subSubjectList = [];
      //重新获取数据
      this.getCourseList();
    },

    //当一级分类点击时，触发
    subjectLevelOneChanged(value) {
      //value是一级分类的id
      //根据一级分类id查询二级分类
      //遍历所有分类,包含一级和二级
      for (let i = 0; i < this.subjectNestedList.length; i++) {
        let subject = this.subjectNestedList[i];
        if (subject.id == value) {
          //应该要把二级分类清空
          this.courseQuery.subjectId = "";
          //找到了一级分类的children
          this.subSubjectList = subject.children;
        }
      }
    },
    //初始化教师列表
    initTeacherList() {
      course.getTeacherList().then((response) => {
        this.teacherList = response.data.items;
      });
    },
    //初始化一级分类列表
    initSubjectList() {
      subject.getSubjectList().then((response) => {
        this.subjectNestedList = response.data.list;
      });
    },
    //查询课程列表
    getCourseList(page = 1) {
      this.page = page;
      this.listLoading = true;
      console.log(this.courseQuery);
      course
        .getCourseListPage(this.page, this.limit, this.courseQuery)
        .then((response) => {
          this.list = response.data.rows;
          this.total = response.data.total;
          this.listLoading = false;
        })
        .catch((error) => {
          this.listLoading = false;
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.chapter-item {
  border: 1px solid #ddd;
  margin-bottom: 10px;
}
.operation {
  width: 40%;
  text-align: center;
}
.chapter-title {
  font-size: 16px;
}
.chanpterList {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
}
.chanpterList li {
  position: relative;
}
.chanpterList p {
  float: left;
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #ddd;
}
.chanpterList .acts {
  float: right;
  font-size: 14px;
}
.videoList {
  padding-left: 50px;
}
.videoList p {
  float: left;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dotted #ddd;
}

.myClassList .info {
  width: 450px;
  overflow: hidden;
}
.myClassList .info .pic {
  width: 150px;
  height: 90px;
  overflow: hidden;
  float: left;
}
.myClassList .info .pic a {
  display: block;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
.myClassList .info .pic img {
  display: block;
  width: 100%;
}
.myClassList td .info .title {
  width: 280px;
  float: right;
  height: 90px;
}
.myClassList td .info .title a {
  display: block;
  height: 48px;
  line-height: 24px;
  overflow: hidden;
  color: #00baf2;
  margin-bottom: 12px;
}
.myClassList td .info .title p {
  line-height: 20px;
  margin-top: 5px;
  color: #818181;
}
</style>
