<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="teacherQuery.name" placeholder="讲师名" />
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="teacherQuery.level"
          clearable
          placeholder="讲师头衔"
        >
          <el-option :value="1" label="高级讲师" />
          <el-option :value="2" label="首席讲师" />
        </el-select>
      </el-form-item>
      <el-form-item label="入职时间">
        <el-date-picker
          v-model="teacherQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-form-item>
        <el-date-picker
          v-model="teacherQuery.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getTeacherList()"
        >查 询</el-button
      >
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <el-table :data="teacherList" border fit highlight-current-row>
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="name" label="名称" width="120" />
      <el-table-column label="头像" width="100">
        <template slot-scope="scope">
          <img
            :src="scope.row.avatar"
            alt=""
            style="width: 80px; height: 80px"
          />
        </template>
      </el-table-column>
      <el-table-column label="头衔" width="80">
        <template slot-scope="scope">
          {{ scope.row.level === 1 ? "高级讲师" : "首席讲师" }}
        </template>
      </el-table-column>

      <el-table-column prop="career" label="资历" />
      <el-table-column prop="intro" label="简介" />
      <el-table-column prop="gmtCreate" label="入职时间" width="160" />
<!--      <el-table-column prop="sort" label="排序" width="60" />-->

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/teacher/edit/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit"
              >修改</el-button
            >
          </router-link>
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
      @current-change="getTeacherList"
      @size-change="changeSize"
    />
  </div>
</template>

<script>
//引入调用teacher.js文件
import teacher from "@/api/edu/teacher";

export default {
  //写核心代码位置
  data() {
    //定义变量和初始值
    return {
      page: 1, //当前页码
      limit: 10, //每页显示的条数
      teacherQuery: {}, //查询条件
      total: 0, //总记录数
      teacherList: [], //讲师列表
    };
  },
  created() {
    //页面渲染之前执行，一般调用methods定义的方法
    this.getTeacherList();
  },
  methods: {

    // 当页码发生改变的时候
    changeSize(size) {
      console.log(size)
      this.limit = size
      this.getTeacherList(1)
    },

    //创建具体的方法，调用teacher.js定义的方法
    getTeacherList(page = 1) {
      this.page = page;
      teacher
        .getTeacherListPage(this.page, this.limit, this.teacherQuery)
        .then((response) => {
          //response接口返回的数据
          //   console.log(response);
          this.teacherList = response.data.rows; //获取讲师列表
          this.total = response.data.total; //获取总记录数
          //   console.log(this.teacherList);
          //   console.log(this.total);
        }) //请求成功
        .catch((error) => {
          console.log(error);
        }); //请求失败
    },
    resetData() {
      //清空的方法
      //清空查询条件
      this.teacherQuery = {};
      //重新查询
      this.getTeacherList();
    },
    //删除讲师
    removeDataById(id) {
      //询问是否删除
      this.$confirm("是否删除此条讲师记录？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //点击确定执行
          //调用删除的方法
          teacher
            .deleteTeacherId(id)
            .then((response) => {
              //删除成功
              //提示信息
              this.$message({
                type: "success",
                message: "删除成功",
              });
              //重新查询
              this.getTeacherList(this.page);
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
