(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-bbec25fe"],{"13e6":function(t,e,a){},"5dae":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"createPost-container"},[a("el-form",{ref:"form",staticClass:"form-container",attrs:{model:t.form,rules:t.rules}},[a("sticky",{attrs:{"z-index":10,"class-name":"sub-navbar "+(null==t.form.status?"publish":"draft")}},[a("el-button",{staticStyle:{"margin-left":"10px"},attrs:{loading:t.loading,icon:"el-icon-check",type:"success",plain:""},on:{click:t.submitBlog}},[t._v("发布 ")]),a("el-button",{attrs:{loading:t.loading,icon:"el-icon-message",type:"warning",plain:""},on:{click:t.draftBlog}},[t._v("保存草稿 ")])],1),a("div",{staticClass:"createPost-main-container"},[a("el-row",[a("el-row",[a("el-col",{attrs:{span:18}},[a("el-form-item",{attrs:{prop:"title",label:"标题: ","label-width":"60px"}},[a("el-input",{attrs:{placeholder:"请输入标题",clearable:""},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),a("el-form-item",{attrs:{"label-width":"60px",label:"摘要: ",prop:"summary"}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:3},placeholder:"请输入摘要"},model:{value:t.form.summary,callback:function(e){t.$set(t.form,"summary",e)},expression:"form.summary"}})],1),a("el-row",[a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{prop:"categoryId","label-width":"60px",label:"分类: "}},[a("el-select",{attrs:{filterable:"","allow-create":"","default-first-option":"",placeholder:"请选择文章分类"},model:{value:t.form.categoryId,callback:function(e){t.$set(t.form,"categoryId",e)},expression:"form.categoryId"}},t._l(t.categoryOptions,(function(t){return a("el-option",{key:t.id,attrs:{label:t.title,value:t.id}})})),1)],1)],1),a("el-col",{attrs:{span:4}},[a("el-form-item",{staticClass:"postInfo-container-item",attrs:{"label-width":"60px",label:"推荐: ",prop:"support"}},[a("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:t.form.support,callback:function(e){t.$set(t.form,"support",e)},expression:"form.support"}})],1)],1),a("el-col",{attrs:{span:6}},[a("el-form-item",{staticClass:"postInfo-container-item",attrs:{"label-width":"60px",label:"评论: ",prop:"comment"}},[a("el-radio-group",{model:{value:t.form.comment,callback:function(e){t.$set(t.form,"comment",e)},expression:"form.comment"}},[a("el-radio",{attrs:{label:!0}},[t._v("开启")]),a("el-radio",{attrs:{label:!1}},[t._v("关闭")])],1)],1)],1),a("el-col",{attrs:{span:8}},[a("el-form-item",{staticClass:"postInfo-container-item",attrs:{"label-width":"100px",label:"封面类型: ",prop:"comment"}},[a("el-radio-group",{on:{change:t.headerImgTypeChange},model:{value:t.form.headerImgType,callback:function(e){t.$set(t.form,"headerImgType",e)},expression:"form.headerImgType"}},[a("el-radio",{attrs:{label:0}},[t._v("无")]),a("el-radio",{attrs:{label:1}},[t._v("普通")]),a("el-radio",{attrs:{label:2}},[t._v("大图")])],1)],1)],1)],1),a("div",{staticClass:"postInfo-container"},[a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{"label-width":"60px",label:"权重: ",prop:"weight"}},[a("el-rate",{staticStyle:{display:"inline-block"},attrs:{max:5,colors:["#99A9BF","#F7BA2A","#FF9900"],"low-threshold":1,"high-threshold":5},model:{value:t.form.weight,callback:function(e){t.$set(t.form,"weight",e)},expression:"form.weight"}})],1)],1),a("el-col",{attrs:{span:16}},[a("el-form-item",{attrs:{"label-width":"60px",label:"标签: ",prop:"tagTitleList"}},[a("el-select",{staticStyle:{width:"100%"},attrs:{multiple:"","default-first-option":"",filterable:"",remote:"",loading:t.loading,"remote-method":t.getRemoteTagList,"allow-create":"",placeholder:"请选择文章标签"},model:{value:t.form.tagTitleList,callback:function(e){t.$set(t.form,"tagTitleList",e)},expression:"form.tagTitleList"}},t._l(t.blogTagOptions,(function(t){return a("el-option",{key:t,attrs:{label:t,value:t}})})),1)],1)],1)],1)],1)],1),a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{prop:"headerImg","label-width":"60px",label:"封面"}},[a("div",{staticClass:"avatar-uploader",on:{click:function(e){t.imagePickerOpen=!0}}},[a("div",{staticClass:"el-upload el-upload--text"},[t.form.headerImg?a("img",{staticClass:"avatar",attrs:{src:t.form.headerImg}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])])])],1)],1)],1),a("el-form-item",{staticStyle:{"margin-bottom":"30px"},attrs:{prop:"content"}},[a("mavonEditor",{ref:"editor",staticStyle:{"min-height":"500px"},on:{imgAdd:t.handleEditorImgAdd},model:{value:t.form.content,callback:function(e){t.$set(t.form,"content",e)},expression:"form.content"}})],1)],1)],1),a("el-dialog",{attrs:{title:"图片选择",visible:t.imagePickerOpen},on:{"update:visible":function(e){t.imagePickerOpen=e}}},[a("ImagePicker",{ref:"ImagePicker",on:{handleAvatarSuccess:t.handleAvatarSuccess}}),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.imagePickerOpen=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.imagePickerOpen=!1}}},[t._v("确 定")])],1)],1)],1)},o=[],r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{style:{height:t.height+"px",zIndex:t.zIndex}},[a("div",{class:t.className,style:{top:t.isSticky?t.stickyTop+"px":"",zIndex:t.zIndex,position:t.position,width:t.width,height:t.height+"px"}},[t._t("default",[a("div",[t._v("sticky")])])],2)])},n=[],s=(a("c5f6"),{name:"Sticky",props:{stickyTop:{type:Number,default:0},zIndex:{type:Number,default:1},className:{type:String,default:""}},data:function(){return{active:!1,position:"",width:void 0,height:void 0,isSticky:!1}},mounted:function(){this.height=this.$el.getBoundingClientRect().height,window.addEventListener("scroll",this.handleScroll),window.addEventListener("resize",this.handleResize)},activated:function(){this.handleScroll()},destroyed:function(){window.removeEventListener("scroll",this.handleScroll),window.removeEventListener("resize",this.handleResize)},methods:{sticky:function(){this.active||(this.position="fixed",this.active=!0,this.width=this.width+"px",this.isSticky=!0)},handleReset:function(){this.active&&this.reset()},reset:function(){this.position="",this.width="auto",this.active=!1,this.isSticky=!1},handleScroll:function(){var t=this.$el.getBoundingClientRect().width;this.width=t||"auto";var e=this.$el.getBoundingClientRect().top;e<this.stickyTop?this.sticky():this.handleReset()},handleResize:function(){this.isSticky&&(this.width=this.$el.getBoundingClientRect().width+"px")}}}),l=s,c=a("2877"),m=Object(c["a"])(l,r,n,!1,null,null,null),d=m.exports,u=a("b2d8"),g=(a("64e1"),a("89d1")),h=a("8bc5"),f=a("5f87"),p=a("e0c1"),b=a.n(p),v=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-tabs",{attrs:{"tab-position":"left"}},[a("el-tab-pane",{attrs:{label:"本地上传"}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{action:"https://httpbin.org/post","show-file-list":!1,"on-success":t.handleAvatarSuccess,"before-upload":t.beforeAvatarUpload}},[t.imageUrl?a("img",{staticClass:"avatar",attrs:{src:t.imageUrl}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1)],1)],1)},y=[],w={name:"ImagePicker",data:function(){return{imageBase64:"",imageUrl:""}},created:function(){},methods:{onImgSelect:function(t){this.$emit("onImgSelect",t)},handleAvatarSuccess:function(t,e){return this.imageUrl=URL.createObjectURL(e.raw),this.imageBase64=t.files.file,this.imageBase64},beforeAvatarUpload:function(t){var e="image/jpeg"===t.type||"image/png"===t.type,a=t.size/1024/1024<2;return e||this.$message.error("上传头像图片只能是 JPG/PNG 格式!"),a||this.$message.error("上传头像图片大小不能超过 2MB!"),e&&a}}},k=w,I=(a("69de"),Object(c["a"])(k,v,y,!1,null,"68b0b124",null)),O=I.exports,x=a("b26e"),S={name:"BlogDetail",components:{Sticky:d,mavonEditor:u["mavonEditor"],ImagePicker:O},props:{isEdit:{type:Boolean,default:!1}},data:function(){return{imagePickerOpen:!1,imagesUploadApi:"",headers:{Authorization:"Bearer "+Object(f["a"])()},form:{headerImgType:0,headerImg:"null",weight:1,tagTitleList:[],comment:!0,support:!1,updateTime:""},loading:!1,tempRoute:{},categoryOptions:[],blogTagOptions:[],rules:{title:[{required:!0,message:"文章标题不能为空",trigger:"blur"},{min:3,max:100,message:"长度在 3 到 100 个字符",trigger:"change"}],summary:[{required:!0,message:"文章摘要不能为空",trigger:"blur"},{min:10,max:250,message:"长度在 10 到 250 个字符",trigger:"change"}],categoryId:[{required:!0,message:"文章分类不能为空",trigger:"change"}],comment:[{required:!0,message:"评论不能为空",trigger:"change"}],tag:[{required:!0,message:"至少选择一个标签",trigger:"change"}]}}},created:function(){var t=!0;if(t&&this.isEdit){var e=this.$route.params&&this.$route.params.id;this.fetchData(e)}this.tempRoute=Object.assign({},this.$route),this.getCategory(),this.imagesUploadApi="/prod-api/tool/localStorage/list"},methods:{onImgSelect:function(t){this.form.headerImg=t,0===this.form.headerImgType&&(this.form.headerImgType=1)},handleAvatarSuccess:function(t,e){this.form.headerImg=URL.createObjectURL(e.raw),this.form.headerImg=this.$refs.ImagePicker.imageBase64},headerImgTypeChange:function(){0===this.form.headerImgType&&(this.form.headerImg=void 0)},handleUploadSuccess:function(t,e){200===t.code?(this.form.headerImg=t.data.url,0===this.form.headerImgType&&(this.form.headerImgType=1)):this.msgError("上传文件失败!"+t.message)},getRemoteTagList:function(t){var e=this;""!==t?(this.loading=!0,setTimeout((function(){e.loading=!1,Object(g["f"])(t).then((function(t){e.blogTagOptions=t.rows,e.loading=!1}))}),200)):this.blogTagOptions=[]},getCategory:function(){var t=this;Object(h["b"])().then((function(e){200===e.code?t.categoryOptions=e.rows:t.msgError(e.msg)}))},fetchData:function(t){var e=this;Object(g["e"])(t).then((function(t){200===t.code?e.form=t.data:e.msgError(t.msg)}))},submitBlog:function(){var t=this;this.form.headerImg=this.$refs.ImagePicker.imageBase64,this.form.htmlContent=b()(this.form.content),this.$refs.form.validate((function(e){if(e){t.loading=!0,t.form.status=!0;var a=JSON.parse(JSON.stringify(t.form));void 0===a.id?Object(g["a"])(a).then((function(e){200===e.code?(t.msgSuccess("发布成功"),t.$store.dispatch("tagsView/delView",t.$route),t.$router.push({path:"/blogManage/blog"})):t.msgError(e.msg),t.loading=!1})).catch((function(e){t.loading=!1})):Object(g["g"])(a).then((function(e){200===e.code?(t.msgSuccess("发布成功"),t.$store.dispatch("tagsView/delView",t.$route),t.$router.push({path:"/blogManage/blog"})):t.msgError(e.msg),t.loading=!1})).catch((function(e){t.loading=!1}))}}))},draftBlog:function(){var t=this;if(this.form.htmlContent=b()(this.form.content),0!==this.form.content.length&&0!==this.form.title.length){var e=JSON.parse(JSON.stringify(this.form));e.status=!1,void 0==e.id?Object(g["b"])(e).then((function(e){200===e.code?t.msgSuccess("保存草稿成功"):t.msgError(e.msg)})):Object(g["h"])(e).then((function(e){200===e.code?t.msgSuccess("保存草稿成功"):t.msgError(e.msg)}))}else this.$message({message:"请填写必要的标题和内容",type:"warning"})},handleEditorImgAdd:function(t,e){var a=new FormData;a.append("file",e),Object(x["a"])(a).then((function(e){$vm.$img2Url(t,e)}))}}},$=S,j=(a("d4d7"),Object(c["a"])($,i,o,!1,null,null,null));e["default"]=j.exports},"69de":function(t,e,a){"use strict";a("8e61")},"89d1":function(t,e,a){"use strict";a.d(e,"e",(function(){return o})),a.d(e,"a",(function(){return r})),a.d(e,"g",(function(){return n})),a.d(e,"d",(function(){return s})),a.d(e,"c",(function(){return l})),a.d(e,"f",(function(){return c})),a.d(e,"b",(function(){return m})),a.d(e,"h",(function(){return d}));var i=a("b775");function o(t){return Object(i["a"])({url:"/blog/blog/"+t,method:"get"})}function r(t){return Object(i["a"])({url:"/blog/blog",method:"post",data:t})}function n(t){return Object(i["a"])({url:"/blog/blog",method:"put",data:t})}function s(t,e){var a={id:t,support:e};return Object(i["a"])({url:"/blog/blog/support",method:"put",data:a})}function l(t,e){var a={id:t,comment:e};return Object(i["a"])({url:"/blog/blog/comment",method:"put",data:a})}function c(t){return Object(i["a"])({url:"/blog/blog/tag/"+t,method:"get"})}function m(t){return Object(i["a"])({url:"/blog/blog/draft",method:"post",data:t})}function d(t){return Object(i["a"])({url:"/blog/blog/draft",method:"put",data:t})}},"8bc5":function(t,e,a){"use strict";a.d(e,"b",(function(){return o})),a.d(e,"a",(function(){return n}));var i=a("b775");function o(t){return Object(i["a"])({url:"/blog/category/list",method:"get",params:t})}function r(t){return Object(i["a"])({url:"/blog/category",method:"put",data:t})}function n(t,e){var a={id:t,support:e};r(a)}},"8e61":function(t,e,a){},a24f:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("blog-detail",{attrs:{"is-edit":!1}})},o=[],r=a("5dae"),n={name:"AddBlog",components:{BlogDetail:r["default"]}},s=n,l=a("2877"),c=Object(l["a"])(s,i,o,!1,null,null,null);e["default"]=c.exports},b26e:function(t,e,a){"use strict";a.d(e,"a",(function(){return o}));var i=a("b775");function o(t){return Object(i["a"])({url:"/tool/localStorage",method:"post",params:t})}},d4d7:function(t,e,a){"use strict";a("13e6")}}]);