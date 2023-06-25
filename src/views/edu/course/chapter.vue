<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新课程</h2>
    <el-steps
      :active="2"
      process-status="wait"
      align-center
      style="margin-bottom: 40px"
    >
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="最终发布" />
    </el-steps>
    <el-button type="text" @click="openChapterDialog">添加章节</el-button>

    <!-- 章节 -->
    <!-- <ul class="chanpterList">
      <li v-for="chapter in chapterVideoList" :key="chapter.id">
        <p>
          {{ chapter.title }}
          <span class="acts">
            <el-button style="" type="text" @click="openEditChapter(chapter.id)"
              >编辑</el-button
            >
            <el-button type="text" @click="removeChapter(chapter)"
              >删除</el-button
            >
          </span>
        </p>
        <ul class="chanpterList videoList">
          <li v-for="video in chapter.children" :key="video.id">
            <p>{{ video.title }}</p>
          </li>
        </ul>
      </li>
    </ul> -->
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
          <p class="chapter-title" style="width: 60%">{{ chapter.title }}</p>
          <span class="operation">
            <el-button style="" type="text" @click.stop="openVideo(chapter.id)"
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
                <el-button style="" type="text" @click="openEditVideo(video.id)"
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

    <el-button @click="previous">上一步</el-button>
    <el-button :disabled="saveBtnDisabled" type="primary" @click="next"
      >下一步</el-button
    >
    <!-- 添加和修改章节表单 -->
    <el-dialog :visible.sync="dialogChapterFormVisible" :title="dialogText">
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
  </div>
</template>

<script>
import chapter from "@/api/edu/chapter";
import video from "@/api/edu/video";

export default {
  data() {
    return {
      fileList: [], //上传文件列表
      BASE_API: process.env.VUE_APP_BASE_API, // 接口API地址
      videoDialogText: "",
      filterText: "",
      courseId: "",
      saveBtnDisabled: false,
      chapterVideoList: [],
      dialogChapterFormVisible: false,
      dialogVideoFormVisible: false,
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
      saveVideoBtnDisabled: false,
    };
  },
  computed: {
    myList() {
      return this.chapterVideoList.filter((c) => {
        return c.title.indexOf(this.filterText) !== -1;
      });
    },
  },
  created() {
    //获取路由中的课程id
    if (this.$route.params && this.$route.params.id) {
      this.courseId = this.$route.params.id;
      this.getChapterVideo();
    }
  },
  methods: {
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
    //===================小节的操作========================
    //打开修改小节的对话框
    openEditVideo(id) {
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
        this.dialogVideoFormVisible = true;
      });
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
      this.videoDialogText = "添加小节";
      //清空表单数据
      this.video = {
        title: "",
        sort: 0,
        free: false,
        videoSourceId: "",
        videoOriginalName: "",
      };
      this.fileList = [];
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
    //===================章节的操作========================
    //删除章节
    /* removeChapter(chapterId) {
      this.$confirm("此操作将永久删除该章节, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          chapter.deleteChapter(chapterId).then((response) => {
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
    }, */
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
    //根据课程id获取章节和小节
    getChapterVideo() {
      chapter.getAllChapterVideo(this.courseId).then((response) => {
        this.chapterVideoList = response.data.allChapterVideo;
      });
    },

    previous() {
      //跳转到上一步
      this.$router.push("/course/info/" + this.courseId);
    },
    next() {
      //跳转到下一步
      this.$router.push("/course/publish/" + this.courseId);
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
</style>