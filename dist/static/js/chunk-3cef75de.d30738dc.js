(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3cef75de"],{"724f":function(e,t,n){"use strict";n.r(t);var c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-container"},[n("el-checkbox",{attrs:{indeterminate:e.isIndeterminate},on:{change:e.handleCheckAllChange},model:{value:e.checkAll,callback:function(t){e.checkAll=t},expression:"checkAll"}},[e._v("全选")]),n("div",{staticStyle:{margin:"15px 0"}}),n("el-checkbox-group",{on:{change:e.handlecheckedRolesChange},model:{value:e.checkedRoles,callback:function(t){e.checkedRoles=t},expression:"checkedRoles"}},e._l(e.roles,(function(t){return n("el-checkbox",{key:t.id,attrs:{label:t.id}},[e._v(e._s(t.roleName))])})),1),n("div",{staticStyle:{height:"30px"}}),n("el-button",{attrs:{disabled:e.saveBtnDisabled,type:"primary"},on:{click:e.update}},[e._v("保存")])],1)},a=[],s=(n("b64b"),n("e9c4"),n("d81d"),n("a15b"),n("d694")),o={data:function(){return{checkAll:!1,checkedRoles:[],roles:[],isIndeterminate:!0,userId:"",saveBtnDisabled:!1}},created:function(){this.init()},methods:{init:function(){this.$route.params&&this.$route.params.id&&(this.userId=this.$route.params.id,this.getById(this.userId))},getById:function(e){var t=this;s["a"].getAssign(e).then((function(e){var n=e.data.assignRoles;t.checkedRoles=t.getJsonToList(n,"id"),t.roles=e.data.allRolesList}))},getJsonToList:function(e,t){for(var n=JSON.parse(JSON.stringify(e)),c=[],a=0;a<n.length;a++)c.push(n[a][t]);return c},handleCheckAllChange:function(e){this.checkedRoles=e?this.roles.map((function(e){return e.id})):[],this.isIndeterminate=!1},handlecheckedRolesChange:function(e){console.log(e);var t=e.length;this.checkAll=t===this.roles.length,this.isIndeterminate=t>0&&t<this.roles.length},update:function(){var e=this;this.saveBtnDisabled=!0;var t=this.checkedRoles.join(",");console.log(t),s["a"].saveAssign(this.userId,t).then((function(t){t.success&&(e.$message({type:"success",message:"保存成功"}),e.$router.push({path:"/acl/user/list"}))}))}}},r=o,i=n("2877"),u=Object(i["a"])(r,c,a,!1,null,null,null);t["default"]=u.exports},a15b:function(e,t,n){"use strict";var c=n("23e7"),a=n("44ad"),s=n("fc6a"),o=n("a640"),r=[].join,i=a!=Object,u=o("join",",");c({target:"Array",proto:!0,forced:i||!u},{join:function(e){return r.call(s(this),void 0===e?",":e)}})},d694:function(e,t,n){"use strict";n("99af");var c=n("b775"),a="/admin/acl/user";t["a"]={getUserInfo:function(){return Object(c["a"])({url:"".concat(a,"/getUserInfo"),method:"get"})},getPageList:function(e,t,n){return Object(c["a"])({url:"".concat(a,"/").concat(e,"/").concat(t),method:"get",params:n})},getById:function(e){return Object(c["a"])({url:"".concat(a,"/get/").concat(e),method:"get"})},save:function(e){return Object(c["a"])({url:"".concat(a,"/save"),method:"post",data:e})},updateById:function(e){return Object(c["a"])({url:"".concat(a,"/update"),method:"put",data:e})},getAssign:function(e){return Object(c["a"])({url:"".concat(a,"/getRole/").concat(e),method:"get"})},saveAssign:function(e,t){return Object(c["a"])({url:"".concat(a,"/setRole"),method:"post",params:{userId:e,roleIds:t}})},removeById:function(e){return Object(c["a"])({url:"".concat(a,"/remove/").concat(e),method:"delete"})},removeRows:function(e){return Object(c["a"])({url:"".concat(a,"/batchRemove"),method:"delete",data:e})}}},e9c4:function(e,t,n){var c=n("23e7"),a=n("d066"),s=n("d039"),o=a("JSON","stringify"),r=/[\uD800-\uDFFF]/g,i=/^[\uD800-\uDBFF]$/,u=/^[\uDC00-\uDFFF]$/,l=function(e,t,n){var c=n.charAt(t-1),a=n.charAt(t+1);return i.test(e)&&!u.test(a)||u.test(e)&&!i.test(c)?"\\u"+e.charCodeAt(0).toString(16):e},d=s((function(){return'"\\udf06\\ud834"'!==o("\udf06\ud834")||'"\\udead"'!==o("\udead")}));o&&c({target:"JSON",stat:!0,forced:d},{stringify:function(e,t,n){var c=o.apply(null,arguments);return"string"==typeof c?c.replace(r,l):c}})}}]);