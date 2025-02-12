<template>
  <div class="createPost-container">
    <el-form ref="form" :model="form" :rules="rules" class="form-container">
      <sticky :z-index="10" :class-name="'sub-navbar '+(form.status==null?'publish':'draft')">
        <el-button :loading="loading" style="margin-left: 10px;" icon="el-icon-check" type="success" plain
                   @click="submitBlog">发布
        </el-button>
        <el-button :loading="loading" icon="el-icon-message" type="warning" plain
                   @click="draftBlog">保存草稿
        </el-button>
      </sticky>

      <div class="createPost-main-container">
        <el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item prop="title" label="标题: " label-width="60px">
                <el-input placeholder="请输入标题" v-model="form.title" clearable></el-input>
              </el-form-item>
              <el-form-item label-width="60px" label="摘要: " prop="summary">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 3}" placeholder="请输入摘要"
                          v-model="form.summary"></el-input>
              </el-form-item>
              <el-row>
                <el-col :span="6">
                  <el-form-item prop="categoryId" label-width="60px" label="分类: ">
                    <el-select v-model="form.categoryId" filterable allow-create default-first-option
                               placeholder="请选择文章分类">
                      <el-option v-for="item in categoryOptions" :key="item.id" :label="item.title"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label-width="60px" label="推荐: " class="postInfo-container-item" prop="support">
                    <el-switch v-model="form.support" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label-width="60px" label="评论: " class="postInfo-container-item" prop="comment">
                    <el-radio-group v-model="form.comment">
                      <el-radio :label="true">开启</el-radio>
                      <el-radio :label="false">关闭</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label-width="100px" label="封面类型: " class="postInfo-container-item" prop="comment">
                    <el-radio-group @change="headerImgTypeChange" v-model="form.headerImgType">
                      <el-radio :label="0">无</el-radio>
                      <el-radio :label="1">普通</el-radio>
                      <el-radio :label="2">大图</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <div class="postInfo-container">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label-width="60px" label="权重: " prop="weight">
                      <el-rate v-model="form.weight" :max="5" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                               :low-threshold="1" :high-threshold="5" style="display:inline-block"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="16">
                    <el-form-item label-width="60px" label="标签: " prop="tagTitleList">
                      <el-select
                        style="width:100%" v-model="form.tagTitleList" multiple default-first-option filterable remote
                        :loading="loading"
                        :remote-method="getRemoteTagList" allow-create placeholder="请选择文章标签">
                        <el-option v-for="item in blogTagOptions" :key="item" :label="item"
                                   :value="item"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="headerImg" label-width="60px" label="封面">
                <div class="avatar-uploader" @click="imagePickerOpen=true">
                  <div class="el-upload el-upload--text">
                    <img v-if="form.headerImg" :src="form.headerImg" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </div>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>

        <el-form-item prop="content" style="margin-bottom: 30px;">
          <mavonEditor v-model="form.content" ref="editor" @imgAdd="handleEditorImgAdd" style="min-height: 500px;"/>
        </el-form-item>
      </div>
    </el-form>

    <el-dialog
      title="图片选择"
      :visible.sync="imagePickerOpen">
      <ImagePicker ref="ImagePicker" @handleAvatarSuccess="handleAvatarSuccess"/>
      <span slot="footer" class="dialog-footer">
          <el-button @click="imagePickerOpen = false">取 消</el-button>
          <el-button type="primary" @click="imagePickerOpen = false">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import Sticky from '@/components/Sticky' // 粘性header组件
import {mavonEditor} from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import {listBlogTagList, getBlog, addBlog, updateBlog, addBlogDraft, updateBlogDraft} from "@/api/blog/blog";
import {listCategory} from "@/api/blog/category";
import {getToken} from '@/utils/auth'
import marked from 'marked'
import ImagePicker from '@/components/ImagePicker'
import {uploadLocalImage} from "@/api/common"

export default {
  name: 'BlogDetail',
  components: {Sticky, mavonEditor, ImagePicker},
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      imagePickerOpen: false,
      //上传图片的地址
      imagesUploadApi: '',
      //上传文件需要用到的token
      headers: {'Authorization': 'Bearer ' + getToken()},
      form: {
        headerImgType: 0,
        headerImg: 'null',
        weight: 1,
        tagTitleList: [],
        comment: true,
        support: false,
        updateTime: ''
      },
      loading: false,
      tempRoute: {},
      categoryOptions: [],
      blogTagOptions: [],
      // 表单校验
      rules: {
        title: [
          {required: true, message: "文章标题不能为空", trigger: "blur"},
          {min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'change'}
        ],
        summary: [
          {required: true, message: "文章摘要不能为空", trigger: "blur"},
          {min: 10, max: 250, message: '长度在 10 到 250 个字符', trigger: 'change'}
        ],
        categoryId: [
          {required: true, message: "文章分类不能为空", trigger: "change"}
        ],
        comment: [
          {required: true, message: "评论不能为空", trigger: "change"}
        ],
        tag: [
          {required: true, message: "至少选择一个标签", trigger: "change"}
        ]
      }
    }
  },
  created() {
    var fetch = true;
    if (fetch && this.isEdit) {
      const id = this.$route.params && this.$route.params.id;
      this.fetchData(id);
    }
    this.tempRoute = Object.assign({}, this.$route);
    //设置category
    this.getCategory();
    this.imagesUploadApi = process.env.VUE_APP_BASE_API + "/tool/localStorage/list";

  },
  methods: {
    onImgSelect(url) {
      this.form.headerImg = url;
      if (this.form.headerImgType === 0) {
        this.form.headerImgType = 1;
      }
    },
    handleAvatarSuccess(res, file) {
      this.form.headerImg = URL.createObjectURL(file.raw);
      this.form.headerImg = this.$refs.ImagePicker.imageBase64;
    },
    headerImgTypeChange() {
      if (this.form.headerImgType === 0) {
        this.form.headerImg = undefined;
      }
    },
    //上传文件成功回调方法
    handleUploadSuccess(res, file) {
      if (res.code === 200) {
        this.form.headerImg = res.data.url;
        //修改headerImgType
        if (this.form.headerImgType === 0) {
          this.form.headerImgType = 1;
        }
      } else {
        this.msgError("上传文件失败!" + res.message);
      }
    },
    //查询标签
    getRemoteTagList(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          listBlogTagList(query).then(response => {
              this.blogTagOptions = response.rows;
              this.loading = false;
            }
          );
        }, 200);
      } else {
        this.blogTagOptions = []
      }
    },
    //获取文章分类
    getCategory() {
      listCategory().then(response => {
          if (response.code === 200) {
            this.categoryOptions = response.rows;
          } else {
            this.msgError(response.msg);
          }
        }
      );
    },
    fetchData(id) {
      getBlog(id).then(response => {
        if (response.code !== 200) {
          this.msgError(response.msg);
          return;
        }
        this.form = response.data;
      })
    },
    submitBlog() {
      // this.form.headerImg = this.form.headerImg !== null ? this.form.headerImg : this.$refs.ImagePicker.imageBase64;
      this.form.headerImg = this.$refs.ImagePicker.imageBase64;
      this.form.htmlContent = marked(this.form.content);
      // this.form.updateTime = parseTime(new Date())
      //删除缓存
      // MyLocalStorage.Cache.remove("blogCache");
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true;
          this.form.status = true;
          let obj = JSON.parse(JSON.stringify(this.form));
          if (obj.id === undefined) {
            addBlog(obj).then(response => {
              if (response.code === 200) {
                this.msgSuccess("发布成功");
                this.$store.dispatch('tagsView/delView', this.$route);
                this.$router.push({path: '/blogManage/blog'})
              } else {
                this.msgError(response.msg);
              }
              this.loading = false;
            }).catch(error => {
              this.loading = false;
            });
          } else {
            updateBlog(obj).then(response => {
              if (response.code === 200) {
                this.msgSuccess("发布成功");
                this.$store.dispatch('tagsView/delView', this.$route);
                this.$router.push({path: '/blogManage/blog'})
              } else {
                this.msgError(response.msg);
              }
              this.loading = false;
            }).catch(error => {
              this.loading = false;
            });
          }
        }
      })
    },
    draftBlog() {
      this.form.htmlContent = marked(this.form.content);
      if (this.form.content.length === 0 || this.form.title.length === 0) {
        this.$message({
          message: '请填写必要的标题和内容',
          type: 'warning'
        });
        return
      }
      //删除缓存
      // MyLocalStorage.Cache.remove("blogCache");
      let obj = JSON.parse(JSON.stringify(this.form));
      obj.status = false;
      if (obj.id == undefined) {
        addBlogDraft(obj).then(response => {
          if (response.code === 200) {
            this.msgSuccess("保存草稿成功");
          } else {
            this.msgError(response.msg);
          }
        });
      } else {
        updateBlogDraft(obj).then(response => {
          if (response.code === 200) {
            this.msgSuccess("保存草稿成功");
          } else {
            this.msgError(response.msg);
          }
        });
      }
    },
    handleEditorImgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append('file', $file);
      uploadLocalImage(formdata).then((url) => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        // $vm.$img2Url 详情见本页末尾
        $vm.$img2Url(pos, url);
      })
    },
  }
}
</script>

<style lang="scss">
@import "~@/assets/styles/mixin.scss";

.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 30px 45px 20px 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }

    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }

}

.article-textarea /deep/ {

  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }

}

.el-tag + .el-tag {
  margin-left: 10px;
}


.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 224px;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100%;
  height: 224px;
  line-height: 224px;
  text-align: center;
}

.avatar {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
