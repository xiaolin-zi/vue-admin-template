<template>
  <div class="app-container">
    <!-- 查询表单 -->
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">

      <el-form-item>
        <el-input v-model="searchObj.roleName" placeholder="角色名称"/>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- 工具条 -->
    <div>
      <el-button type="danger" size="mini" @click="addUser()" >添加</el-button>
      <el-button type="danger" size="mini" @click="removeRows()" >批量删除</el-button>

    </div>

    <!-- 角色列表 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      stripe
      :header-cell-style="{'text-align':'center'}"
      :cell-style="{'text-align':'center'}"
      style="width: 100%"
      @selection-change="handleSelectionChange">

      <el-table-column
        type="selection"
        width="55" />

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="roleName" label="角色名称" width="100"/>

      <el-table-column prop="roleCode" label="角色code" width="100"/>

      <el-table-column prop="roleDescription" label="角色描述" />
      <el-table-column prop="createTime" label="创建时间" width="150"/>
      <el-table-column prop="updateTime" label="更新时间" width="150"/>
      <!--查询用户id查询用户名显示-->

      <el-table-column prop="createUserName" label="创建人"/>
      <el-table-column prop="updateUserName" label="修改人"/>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="setPermission(scope.row.id)">授权</el-button>
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
import roleApi from '@/api/acl/role'

export default {
  data() {
    return {
      listLoading: true, // 数据是否正在加载
      list: null, // 讲师列表
      total: 0, // 数据库中的总记录数
      page: 1, // 默认页码
      limit: 10, // 每页记录数
      searchObj: {}, // 查询表单对象
      multipleSelection: [] // 批量选择中选择的记录列表
    }
  },

  // 生命周期函数：内存准备完毕，页面尚未渲染
  created() {
    console.log('list created......')
    this.fetchData()
  },

  // 生命周期函数：内存准备完毕，页面渲染成功
  mounted() {
    console.log('list mounted......')
  },

  methods: {

    // 当页码发生改变的时候
    changeSize(size) {
      console.log(size)
      this.limit = size
      this.fetchData(1)
    },

    addUser(){
      this.$router.push({ path: '/acl/role/form' })
    },

    editUser(id){
      this.$router.push({ path: '/acl/role/update/' + id })
    },

    setPermission(id){
      this.$router.push({ path: '/acl/role/distribution/' + id })
    },

    // 加载讲师列表数据
    fetchData(page = 1) {
      // 异步获取远程数据（ajax）
      this.page = page

      roleApi.getPageList(this.page, this.limit, this.searchObj).then(
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

    // 根据id删除数据
    removeUser(id) {
      // debugger
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { // promise
        // 点击确定，远程调用ajax
        return roleApi.removeById(id)
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

    // 当表格复选框选项发生变化的时候触发
    handleSelectionChange(selection) {
      console.log(selection)
      this.multipleSelection = selection
    },

    // 批量删除
    removeRows() {

      if (this.multipleSelection.length === 0) {
        this.$message({
          type: 'warning',
          message: '请选择要删除的记录!'
        })
        return
      }

      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
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
        return roleApi.removeRows(idList)
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

    // 执行搜索
    // queryString：文本框中输入的值
    // cb：一个函数
    querySearch(queryString, cb) {
      console.log(queryString)
      console.log(cb)

      // teacher.selectNameByKey(queryString).then(response => {
      //   // 调用 callback 返回建议列表的数据
      //   cb(response.data.items)
      // })
    }
  }
}
</script>

