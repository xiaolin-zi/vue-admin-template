(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-33d96259"],{7694:function(e,t,c){"use strict";c("99af");var a=c("b775");t["a"]={getList:function(e,t,c){return Object(a["a"])({url:"/eduservice/article/pageArticleCondition/".concat(e,"/").concat(t),method:"post",data:c})},deleteArticle:function(e){return Object(a["a"])({url:"/eduservice/article/".concat(e),method:"delete"})},publishArticle:function(e){return Object(a["a"])({url:"/eduservice/article/publishArticle/".concat(e),method:"put"})},saveArticle:function(e){return Object(a["a"])({url:"/eduservice/article/addArticle",method:"post",data:e})},getArticleById:function(e){return Object(a["a"])({url:"/eduservice/article/getArticleById/".concat(e),method:"get"})},updateArticle:function(e){return Object(a["a"])({url:"/eduservice/article/updateArticle",method:"post",data:e})},getArticleType:function(){return Object(a["a"])({url:"/eduservice/article/findArticleType",method:"get"})},saveArticleType:function(e){return Object(a["a"])({url:"/eduservice/article/addArticleType",method:"post",data:e})},deleteArticleType:function(e){return Object(a["a"])({url:"/eduservice/article/deleteArticleType/".concat(e),method:"delete"})}}},ba9d:function(e,t,c){"use strict";c.r(t);var a=function(){var e=this,t=e.$createElement,c=e._self._c||t;return c("div",{staticClass:"type"},[c("h2",{staticStyle:{"text-align":"center"}},[e._v("文章分类")]),c("div",{staticStyle:{width:"600px",margin:"0 auto"}},[c("div",{staticStyle:{width:"100%"}},e._l(e.tags,(function(t){return c("el-tag",{key:t.name,staticStyle:{margin:"10px"},attrs:{closable:"",type:t.type},on:{close:function(c){return e.handleClose(t)}}},[e._v(" "+e._s(t.name)+" ")])})),1),c("div",{staticStyle:{width:"100%","margin-top":"50px","margin-left":"10px"}},[c("el-input",{staticStyle:{width:"50%"},attrs:{type:"text",size:"small",placeholder:"标签名"},model:{value:e.articleType.name,callback:function(t){e.$set(e.articleType,"name",t)},expression:"articleType.name"}}),c("br"),c("br"),c("el-button",{staticStyle:{width:"100px"},attrs:{type:"primary",size:"small"},on:{click:e.addTag}},[e._v("添加标签")])],1)])])},i=[],n=(c("b0c0"),c("7694")),r={data:function(){return{articleType:{name:""},tags:[]}},created:function(){this.getTags()},methods:{getTags:function(){var e=this;n["a"].getArticleType().then((function(t){console.log(t);for(var c=["success","info","warning","danger",""],a=t.data.list,i=0;i<a.length;i++)a[i].type=c[i%5];e.tags=a}))},addTag:function(){var e=this;n["a"].saveArticleType(this.articleType).then((function(t){console.log(t),e.articleType.name="",e.$message({message:"添加成功",type:"success"}),e.getTags()}))},handleClose:function(e){var t=this;this.$confirm("此操作将永久删除该标签, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){n["a"].deleteArticleType(e.id).then((function(e){console.log(e),t.$message({message:"删除成功",type:"success"}),t.getTags()}))})).catch((function(){t.$message({type:"info",message:"已取消删除"})}))}}},l=r,s=c("2877"),o=Object(s["a"])(l,a,i,!1,null,null,null);t["default"]=o.exports}}]);