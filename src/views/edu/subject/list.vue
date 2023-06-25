<template>
  <div class="app-container">
    <el-input
      v-model="filterText"
      placeholder="Filter keyword"
      style="margin-bottom: 30px"
    />
    <el-button type="text" @click.stop="() => append()">添加一级分类</el-button>
    <el-tree
      ref="tree2"
      :data="treeData"
      node-key="id"
      empty-text
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            v-if="data.children"
            type="text"
            size="mini"
            @click.stop="() => append(data)"
          >
            <i class="el-icon-plus"></i>
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click.stop="() => remove(node, data)"
          >
            <i class="el-icon-delete"></i
            ><!--删除分组-->
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click.stop="() => edit(node, data)"
          >
            <i class="el-icon-edit"></i
            ><!--重命名分组-->
          </el-button>
        </span>
      </span>
    </el-tree>
    <!-- 添加二级分类 -->
    <el-dialog :visible.sync="dialogSubjectFormVisible" :title="addtext">
      <el-form :model="mysubject" label-width="120px">
        <el-form-item label="分类标题">
          <el-input v-model="mysubject.title" />
        </el-form-item>
        <el-form-item label="分类排序">
          <el-input-number
            v-model="mysubject.sort"
            :min="0"
            controlsposition="
right"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogSubjectFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveMySubject">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="updateSubjectFormVisible" title="修改分类">
      <el-form :model="mysubject" label-width="120px">
        <el-form-item label="分类标题">
          <el-input v-model="mysubject.title" />
        </el-form-item>
        <el-form-item label="分类排序">
          <el-input-number
            v-model="mysubject.sort"
            :min="0"
            controlsposition="right"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateSubjectFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateMySubject">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import subject from "@/api/edu/subject";
export default {
  data() {
    return {
      addtext: "",
      subjectId: "",
      dialogSubjectFormVisible: false,
      updateSubjectFormVisible: false,
      filterText: "",
      treeData: [], //返回所有分类的数据
      defaultProps: {
        children: "children",
        label: "title",
      },
      mysubject: {
        title: "",
        sort: 0,
      },
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    },
  },

  created() {
    this.getAllSubjectList();
  },

  methods: {
    //打开编辑对话框
    edit(node, data) {
      this.subjectId = data.id;
      //回显
      this.mysubject = data;
      //弹出修改对话框
      this.updateSubjectFormVisible = true;
    },
    updateMySubject() {
      //判断title是否为空
      if (this.mysubject.title == "") {
        this.$message({
          message: "分类标题不能为空！",
          type: "warning",
        });
        return;
      }
      //根据分类id修改分类
      subject
        .updateSubject(this.subjectId, this.mysubject)
        .then((response) => {
          this.$message({
            type: "success",
            message: "修改成功！",
          });
          //刷新页面
          this.getAllSubjectList();
          //关闭对话框
          this.updateSubjectFormVisible = false;
        })
        .catch((error) => {
          console.log(error);
        });
      this.subjectId = "";
    },
    //删除
    remove(node, data) {
      console.log(node);
      console.log(data);
      //判断是否是一级分类
      if (data.children) {
        //询问
        this.$confirm("此操作将永久删除此分类及其二级分类, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "error",
        })
          .then(() => {
            subject.deleteAllSubject(data.id).then((response) => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              //刷新页面
              this.getAllSubjectList();
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      } else {
        this.$confirm("此操作将永久删除此二级分类, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            subject.deleteSubject(data.id).then((response) => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              //刷新页面
              this.getAllSubjectList();
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

    //新增一级或二级分类
    saveMySubject() {
      //判断title是否为空
      if (this.mysubject.title == "") {
        this.$message({
          message: "分类标题不能为空！",
          type: "warning",
        });
        return;
      }
      if (!this.subjectId) {
        this.subjectId = "0";
      }
      //根据一级分类id添加二级分类
      subject
        .addSubject(this.subjectId, this.mysubject)
        .then((response) => {
          //添加成功！
          this.$message({
            type: "success",
            message: "添加成功",
          });
          //刷新页面
          this.getAllSubjectList();
          //关闭对话框
          this.dialogSubjectFormVisible = false;
        })
        .catch((error) => {
          console.log(error);
        });
      this.subjectId = "";
    },
    //开启添加一级或二级分类对话框
    append(data) {
      console.log("append");
      if (data) {
        this.addtext = "添加二级分类";
        this.subjectId = data.id;
      } else {
        this.addtext = "添加一级分类";
      }
      //清空表单数据
      this.mysubject = {
        title: "",
        sort: 0,
      };
      //弹出添加对话框
      this.dialogSubjectFormVisible = true;
    },

    getAllSubjectList() {
      subject
        .getSubjectList()
        .then((response) => {
          console.log(response);
          this.treeData = response.data.list;
          console.log(this.treeData);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    filterNode(value, data) {
      if (!value) return true;
      return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    },
  },
};
</script>
<style scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>

