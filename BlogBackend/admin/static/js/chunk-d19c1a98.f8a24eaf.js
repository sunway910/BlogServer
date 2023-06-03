(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d19c1a98"],{bfc4:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("el-form",{ref:"queryForm",attrs:{model:e.queryParams,inline:!0}},[a("el-form-item",{attrs:{label:"字典名称",prop:"dictType"}},[a("el-select",{attrs:{size:"small"},model:{value:e.queryParams.dictType,callback:function(t){e.$set(e.queryParams,"dictType",t)},expression:"queryParams.dictType"}},e._l(e.typeOptions,(function(e){return a("el-option",{key:e.dictId,attrs:{label:e.dictName,value:e.dictType}})})),1)],1),a("el-form-item",{attrs:{label:"字典标签",prop:"dictLabel"}},[a("el-input",{attrs:{placeholder:"请输入字典标签",clearable:"",size:"small"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleQuery(t)}},model:{value:e.queryParams.dictLabel,callback:function(t){e.$set(e.queryParams,"dictLabel",t)},expression:"queryParams.dictLabel"}})],1),a("el-form-item",{attrs:{label:"状态",prop:"status"}},[a("el-select",{attrs:{placeholder:"数据状态",clearable:"",size:"small"},model:{value:e.queryParams.status,callback:function(t){e.$set(e.queryParams,"status",t)},expression:"queryParams.status"}},e._l(e.statusOptions,(function(e){return a("el-option",{key:e.dictValue,attrs:{label:e.dictLabel,value:e.dictValue}})})),1)],1),a("el-form-item",[a("el-button",{attrs:{type:"primary",icon:"el-icon-search",size:"mini"},on:{click:e.handleQuery}},[e._v("搜索")]),a("el-button",{attrs:{icon:"el-icon-refresh",size:"mini"},on:{click:e.resetQuery}},[e._v("重置")])],1)],1),a("el-row",{staticClass:"mb8",attrs:{gutter:10}},[a("el-col",{attrs:{span:1.5}},[a("el-button",{directives:[{name:"hasPermi",rawName:"v-hasPermi",value:["system:dict:add"],expression:"['system:dict:add']"}],attrs:{type:"primary",icon:"el-icon-plus",size:"mini"},on:{click:e.handleAdd}},[e._v("新增 ")])],1),a("el-col",{attrs:{span:1.5}},[a("el-button",{directives:[{name:"hasPermi",rawName:"v-hasPermi",value:["system:dict:edit"],expression:"['system:dict:edit']"}],attrs:{type:"success",icon:"el-icon-edit",size:"mini",disabled:e.single},on:{click:e.handleUpdate}},[e._v("修改 ")])],1),a("el-col",{attrs:{span:1.5}},[a("el-button",{directives:[{name:"hasPermi",rawName:"v-hasPermi",value:["system:dict:remove"],expression:"['system:dict:remove']"}],attrs:{type:"danger",icon:"el-icon-delete",size:"mini",disabled:e.multiple},on:{click:e.handleDelete}},[e._v("删除 ")])],1)],1),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{data:e.dataList},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55"}}),a("el-table-column",{attrs:{label:"字典编码",prop:"dictCode"}}),a("el-table-column",{attrs:{label:"字典标签",prop:"dictLabel"}}),a("el-table-column",{attrs:{label:"字典键值",prop:"dictValue"}}),a("el-table-column",{attrs:{label:"字典排序",prop:"dictSort"}}),a("el-table-column",{attrs:{label:"状态",prop:"status",formatter:e.statusFormat}}),a("el-table-column",{attrs:{label:"备注",prop:"remark","show-overflow-tooltip":!0}}),a("el-table-column",{attrs:{label:"创建时间",prop:"createTime",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e.parseTime(t.row.createTime)))])]}}])}),a("el-table-column",{attrs:{label:"操作","class-name":"small-padding fixed-width"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{directives:[{name:"hasPermi",rawName:"v-hasPermi",value:["system:dict:edit"],expression:"['system:dict:edit']"}],attrs:{size:"mini",type:"text",icon:"el-icon-edit"},on:{click:function(a){return e.handleUpdate(t.row)}}},[e._v("修改 ")]),a("el-button",{directives:[{name:"hasPermi",rawName:"v-hasPermi",value:["system:dict:remove"],expression:"['system:dict:remove']"}],attrs:{size:"mini",type:"text",icon:"el-icon-delete"},on:{click:function(a){return e.handleDelete(t.row)}}},[e._v("删除 ")])]}}])})],1),a("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.queryParams.pageNum,limit:e.queryParams.pageSize},on:{"update:page":function(t){return e.$set(e.queryParams,"pageNum",t)},"update:limit":function(t){return e.$set(e.queryParams,"pageSize",t)},pagination:e.getList}}),a("el-dialog",{attrs:{"close-on-click-modal":!1,title:e.title,visible:e.open,width:"500px"},on:{"update:visible":function(t){e.open=t}}},[a("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"字典类型"}},[a("el-input",{attrs:{disabled:!0},model:{value:e.form.dictType,callback:function(t){e.$set(e.form,"dictType",t)},expression:"form.dictType"}})],1),a("el-form-item",{attrs:{label:"数据标签",prop:"dictLabel"}},[a("el-input",{attrs:{placeholder:"请输入数据标签"},model:{value:e.form.dictLabel,callback:function(t){e.$set(e.form,"dictLabel",t)},expression:"form.dictLabel"}})],1),a("el-form-item",{attrs:{label:"数据键值",prop:"dictValue"}},[a("el-input",{attrs:{placeholder:"请输入数据键值"},model:{value:e.form.dictValue,callback:function(t){e.$set(e.form,"dictValue",t)},expression:"form.dictValue"}})],1),a("el-form-item",{attrs:{label:"显示排序",prop:"dictSort"}},[a("el-input-number",{attrs:{"controls-position":"right",min:0},model:{value:e.form.dictSort,callback:function(t){e.$set(e.form,"dictSort",t)},expression:"form.dictSort"}})],1),a("el-form-item",{attrs:{label:"状态",prop:"status"}},[a("el-radio-group",{model:{value:e.form.status,callback:function(t){e.$set(e.form,"status",t)},expression:"form.status"}},e._l(e.statusOptions,(function(t){return a("el-radio",{key:t.dictValue,attrs:{label:t.dictValue}},[e._v(e._s(t.dictLabel)+" ")])})),1)],1),a("el-form-item",{attrs:{label:"备注",prop:"remark"}},[a("el-input",{attrs:{type:"textarea",placeholder:"请输入内容"},model:{value:e.form.remark,callback:function(t){e.$set(e.form,"remark",t)},expression:"form.remark"}})],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:e.submitForm}},[e._v("确 定")]),a("el-button",{on:{click:e.cancel}},[e._v("取 消")])],1)],1)],1)},s=[],r=a("aa3a"),l=a("ed45"),o={name:"Data",data:function(){return{loading:!0,ids:[],single:!0,multiple:!0,total:0,dataList:[],defaultDictType:"",title:"",open:!1,statusOptions:[],typeOptions:[],queryParams:{pageNum:1,pageSize:10,dictName:void 0,dictType:void 0,status:void 0},form:{},rules:{dictLabel:[{required:!0,message:"数据标签不能为空",trigger:"blur"}],dictValue:[{required:!0,message:"数据键值不能为空",trigger:"blur"}],dictSort:[{required:!0,message:"数据顺序不能为空",trigger:"blur"}]}}},created:function(){var e=this,t=this.$route.params&&this.$route.params.dictId;this.getType(t),this.getTypeList(),this.getDicts("sys_normal_disable").then((function(t){e.statusOptions=t.data}))},methods:{getType:function(e){var t=this;Object(l["a"])(e).then((function(e){t.queryParams.dictType=e.data.dictType,t.defaultDictType=e.data.dictType,t.getList()}))},getTypeList:function(){var e=this;Object(l["b"])().then((function(t){e.typeOptions=t.rows}))},getList:function(){var e=this;this.loading=!0,Object(r["e"])(this.queryParams).then((function(t){e.dataList=t.rows,e.total=t.total,e.loading=!1}))},statusFormat:function(e,t){return this.selectDictLabel(this.statusOptions,e.status)},cancel:function(){this.open=!1,this.reset()},reset:function(){this.form={dictCode:void 0,dictLabel:void 0,dictValue:void 0,dictSort:0,status:"0",remark:void 0},this.resetForm("form")},handleQuery:function(){this.queryParams.pageNum=1,this.getList()},resetQuery:function(){this.resetForm("queryForm"),this.queryParams.dictType=this.defaultDictType,this.handleQuery()},handleAdd:function(){this.reset(),this.open=!0,this.title="添加字典数据",this.form.dictType=this.queryParams.dictType},handleSelectionChange:function(e){this.ids=e.map((function(e){return e.dictCode})),this.single=1!=e.length,this.multiple=!e.length},handleUpdate:function(e){var t=this;this.reset();var a=e.dictCode||this.ids;Object(r["c"])(a).then((function(e){t.form=e.data,t.open=!0,t.title="修改字典数据"}))},submitForm:function(){var e=this;this.$refs["form"].validate((function(t){t&&(void 0!=e.form.dictCode?Object(r["f"])(e.form).then((function(t){200===t.code?(e.msgSuccess("修改成功"),e.open=!1,e.getList()):e.msgError(t.msg)})):Object(r["a"])(e.form).then((function(t){200===t.code?(e.msgSuccess("新增成功"),e.open=!1,e.getList()):e.msgError(t.msg)})))}))},handleDelete:function(e){var t=this,a=e.dictCode||this.ids;this.$confirm('是否确认删除字典编码为"'+a+'"的数据项?',"警告",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){return Object(r["b"])(a)})).then((function(){t.getList(),t.msgSuccess("删除成功")})).catch((function(){}))}}},n=o,c=a("2877"),u=Object(c["a"])(n,i,s,!1,null,null,null);t["default"]=u.exports},ed45:function(e,t,a){"use strict";a.d(t,"b",(function(){return s})),a.d(t,"a",(function(){return r}));var i=a("b775");function s(e){return Object(i["a"])({url:"/system/dict/type/list",method:"get",params:e})}function r(e){return Object(i["a"])({url:"/system/dict/type/"+e,method:"get"})}}}]);