(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-28ff36e0"],{1596:function(e,t,a){"use strict";a("99af");var r=a("b775"),o="/admin/acl/role";t["a"]={getPageList:function(e,t,a){return Object(r["a"])({url:"".concat(o,"/").concat(e,"/").concat(t),method:"get",params:a})},getById:function(e){return Object(r["a"])({url:"".concat(o,"/get/").concat(e),method:"get"})},save:function(e){return Object(r["a"])({url:"".concat(o,"/save"),method:"post",data:e})},updateById:function(e){return Object(r["a"])({url:"".concat(o,"/update"),method:"put",data:e})},removeById:function(e){return Object(r["a"])({url:"".concat(o,"/remove/").concat(e),method:"delete"})},removeRows:function(e){return Object(r["a"])({url:"".concat(o,"/batchRemove"),method:"delete",data:e})}}},5461:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("el-form",{ref:"role",attrs:{model:e.role,rules:e.validateRules,"label-width":"120px"}},[a("el-form-item",{attrs:{label:"角色名称",prop:"roleName"}},[a("el-input",{model:{value:e.role.roleName,callback:function(t){e.$set(e.role,"roleName",t)},expression:"role.roleName"}})],1),a("el-form-item",{attrs:{label:"角色code",prop:"roleCode"}},[a("el-input",{model:{value:e.role.roleCode,callback:function(t){e.$set(e.role,"roleCode",t)},expression:"role.roleCode"}})],1),a("el-form-item",{attrs:{label:"角色描述",prop:"roleDescription"}},[a("el-input",{model:{value:e.role.roleDescription,callback:function(t){e.$set(e.role,"roleDescription",t)},expression:"role.roleDescription"}})],1),a("el-form-item",[a("el-button",{attrs:{disabled:e.saveBtnDisabled,type:"primary"},on:{click:e.saveOrUpdate}},[e._v("保存")])],1)],1)],1)},o=[],s=a("5530"),l=a("1596"),n={roleName:"",roleCode:"",roleDescription:""},i={data:function(){return{role:n,saveBtnDisabled:!1,validateRules:{roleName:[{required:!0,trigger:"blur",message:"角色名必须输入"}],roleCode:[{required:!0,trigger:"blur",message:"角色code必须输入"}],roleDescription:[{required:!0,trigger:"blur",message:"角色描述必须输入"}]}}},watch:{$route:function(e,t){this.init()}},created:function(){this.init()},methods:{init:function(){if(this.$route.params&&this.$route.params.id){var e=this.$route.params.id;this.fetchDataById(e)}else this.role=Object(s["a"])({},n)},saveOrUpdate:function(){var e=this;this.$refs.role.validate((function(t){t&&(e.saveBtnDisabled=!0,e.role.id?e.updateData():e.saveData())}))},saveData:function(){var e=this;l["a"].save(this.role).then((function(t){t.success&&(e.$message({type:"success",message:t.message}),e.$router.push({path:"/acl/role/list"}))}))},updateData:function(){var e=this;l["a"].updateById(this.role).then((function(t){t.success&&(e.$message({type:"success",message:t.message}),e.$router.push({path:"/acl/role/list"}))}))},fetchDataById:function(e){var t=this;l["a"].getById(e).then((function(e){t.role=e.data.item}))}}},c=i,u=a("2877"),d=Object(u["a"])(c,r,o,!1,null,null,null);t["default"]=d.exports}}]);