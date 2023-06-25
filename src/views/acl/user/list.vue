<template>
  <div class="app-container">
    <!-- 查询表单 -->
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.username" placeholder="用户名"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchObj.nickname" placeholder="昵称"/>
      </el-form-item>
      <el-form-item>
        <span class="demonstration">注册时间</span>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="mydate"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>


      <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
    <!-- 工具条 -->
    <div>
      <el-button type="danger" size="mini" @click="addUser()">添加</el-button>
      <el-button type="danger" size="mini" @click="removeRows()">批量删除</el-button>

    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      stripe
      size="medium"
      :header-cell-style="{'text-align':'center'}"
      :cell-style="{'text-align':'center'}"
      style="width: 100%;"
      @selection-change="handleSelectionChange">

      <el-table-column
        type="selection"
      />

      <el-table-column
        label="序号"
        width="55"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="username" label="用户名"/>

      <el-table-column prop="nickname" label="用户昵称"/>
      <el-table-column prop="lastLoginTime" label="最近登录时间" width="150"/>
      <!--如果是true就状态正常，否则为不可用-->
      <el-table-column prop="enabled" label="用户状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.enabled" type="success">正常</el-tag>
          <el-tag v-else type="danger">不可用</el-tag>
        </template>
      </el-table-column>


      <el-table-column prop="nickname" label="用户昵称"/>
      <el-table-column prop="createTime" label="创建时间" width="150"/>
      <el-table-column prop="updateTime" label="更新时间" width="150"/>
      <!--查询用户id查询用户名显示-->

      <el-table-column prop="createUserName" label="创建人"/>
      <el-table-column prop="updateUserName" label="修改人"/>

      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="setPermission(scope.row.id)">分配角色</el-button>
          <el-button type="primary" size="mini" @click="editUser(scope.row.id)">编辑</el-button>
          <el-button type="danger" size="mini" @click="removeUser(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      background
      @size-change="changeSize"
      @current-change="fetchData"
      :current-page="page"
      :page-sizes="[5, 10, 20, 30,40,50,100]"
      :page-size="limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

  </div>
</template>

<script>
import userApi from '@/api/acl/user'

export default {
  data() {
    return {
      listLoading: true, // 数据是否正在加载
      list: null, // 用户列表
      total: 0, // 数据库中的总记录数
      page: 1, // 默认页码
      limit: 10, // 每页记录数
      searchObj: {}, // 查询表单对象
      mydate: [],

      multipleSelection: [], // 批量选择中选择的记录列表

      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
    }
  },

  // 生命周期函数：内存准备完毕，页面尚未渲染
  created() {
    this.fetchData()
  },

  // 生命周期函数：内存准备完毕，页面渲染成功
  mounted() {

  },

  methods: {
    //删除用户
    removeUser(id){
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { // promise
        // 点击确定，远程调用ajax
        return userApi.removeById(id)
      }).then((response) => {
        this.fetchData(this.page)
        if (response.success) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }
      })
    },
    // 当表格复选框选项发生变化的时候触发
    handleSelectionChange(selection) {
      this.multipleSelection = selection
    },

    // 批量删除
    removeRows(){
      if (this.multipleSelection.length === 0) {
        this.$message({
          type: 'warning',
          message: '请选择要删除的记录!'
        })
        return
      }

      this.$confirm('此操作将永久删除选中记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { // promise
        // 点击确定，远程调用ajax
        // 遍历selection，将id取出放入id列表
        var idList = []
        this.multipleSelection.forEach(item => {
          idList.push(item.id)
          // console.log(idList)
        })
        // 调用api
        return userApi.removeRows(idList)
      }).then((response) => {
        this.fetchData(this.page)
        if (response.success) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },


    //添加用户
    addUser() {
      this.$router.push('/acl/user/add')
    },

    //编辑用户
    editUser(id) {
      this.$router.push('/acl/user/update/' + id)
    },

    //授权
    setPermission(id) {
      this.$router.push('/acl/user/role/' + id)
    },

    // 当页码发生改变的时候
    changeSize(size) {
      console.log(size)
      this.limit = size
      this.fetchData(1)
    },

    // 加载用户列表数据
    fetchData(page = 1) {
      // 异步获取远程数据
      this.page = page
      this.searchObj.begin = this.mydate[0]
      this.searchObj.end = this.mydate[1]
      userApi.getPageList(this.page, this.limit, this.searchObj).then(
        response => {
          this.list = response.data.items
          this.total = response.data.total
          // 数据加载并绑定成功
          this.listLoading = false
        }
      )
    },
    // 重置查询表单
    resetData() {
      console.log('重置查询表单')
      this.searchObj = {}
      this.fetchData()
    },

  }
}
</script>


