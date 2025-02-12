<template>
  <div class="article-list-cell">
    <Row type="flex">
      <Column :xs="24" :sm="24" :md="textSpan" :lg="textSpan" :order="textOrderType"
              style="padding-left: 0;padding-right: 0;">
        <div class="text-wrapper">
          <h4 class="title">
            <a @click.prevent="gotoPostDetail(article)">
              {{ article.title }}</a>
            <span class="special" v-if="article.support">
              Recommend
            </span>
          </h4>

          <div class="tags">
            <Tag :key="tag.id" class="border-tag" type="border" :color="tag.color"
                 v-for="tag in article.tagList">
              {{ tag.title }}
            </Tag>
          </div>

          <p class="desc">{{ article.summary | textLineBreak(90) }}
            <a @click.prevent="gotoPostDetail(article)" :href="`/article/${article.id}`"> view more
              <Icon type="md-arrow-dropright"/>
            </a>
          </p>
          <p class="operate_info" style="  position: absolute;bottom: 0;right: 0;">
<!--            <span class="publish-time">-->
<!--               <a>{{ article.createTime }}</a>-->
<!--            </span>-->
            <span class="readings">
               <a><Icon type="ios-eye"/> {{ article.click }} exposure</a>
               </span>
            <span class="comments">
               <a><Icon type="ios-create"/> {{ article.commentCount }} comment</a>
            </span>
            <span class="likes">
               <a @click="likePost(article)"><Icon type="ios-heart"/> {{ article.like }} like</a>
            </span>
          </p>
        </div>
      </Column>
      <Column :xs="0" :sm="0" :md="imgSpan" :lg="imgSpan" :order="imgOrderType">
        <div class="img-wrapper" :class="themeClass">
          <img v-if="article.headerImgType !== 0" :src="article.headerImg" alt="">
        </div>
      </Column>
    </Row>
  </div>
</template>

<script type="text/ecmascript-6">
import {mixin} from '@/utils';
import {LineBreakMode} from "@/utils/const.js";
import {LikeBlog} from "@/api";
import Recommend from "@/views/Recommend.vue";

const ARTICLE_TYPE_NO_IMAGE = 0;
const ARTICLE_TYPE_NORMAL_IMAGE = 1;
const ARTICLE_TYPE_BIG_IMAGE = 2;
export default {
  name: 'article-list-cell',
  components: {Recommend},
  mixins: [mixin],
  props: {
    article: {
      Type: Object
    }
  },
  data() {
    return {
      articleType: 1,
    }
  },
  computed: {
    textOrderType: function () {
      return parseInt(this.articleType) === ARTICLE_TYPE_BIG_IMAGE ? 2 : 1;
    },
    imgOrderType: function () {
      return parseInt(this.articleType) === ARTICLE_TYPE_BIG_IMAGE ? 1 : 2;
    },

    textSpan: function () {
      switch (parseInt(this.articleType)) {
        case ARTICLE_TYPE_NO_IMAGE:
          return 24;
        case ARTICLE_TYPE_NORMAL_IMAGE:
          return 17;
        case ARTICLE_TYPE_BIG_IMAGE:
          return 24;
        default:
          return 24;
      }
    },
    imgSpan: function () {
      switch (parseInt(this.articleType)) {
        case ARTICLE_TYPE_NO_IMAGE:
          return 0;
        case ARTICLE_TYPE_NORMAL_IMAGE:
          return 7;
        case ARTICLE_TYPE_BIG_IMAGE:
          return 24;
        default:
          return 0;
      }
    },
    themeClass: function () {
      if (parseInt(this.articleType) === ARTICLE_TYPE_BIG_IMAGE) {
        return 'big-image';
      } else {
        return '';
      }
    },
  },
  methods: {
    gotoPostDetail(post) {
      this.$router.push({
        name: "article",
        params: {id: post.id},
      });
    },
    likePost(post) {
      LikeBlog(post.id).then(() => {
        post.like += 1;
        this.$Message.success("点赞 +1");
      }).catch((error) => {
        window.console.log(error);
      });
    }
  },
  filters: {
    // 用于格式化时间的过滤器
    // 用于处理行尾省略号的过滤器
    textLineBreak: function (text, maxLength, lineBreakMode) {
      if (text === undefined || text === null || text.length === 0) {
        return '';
      }
      if (lineBreakMode === null || lineBreakMode === undefined) {
        lineBreakMode = LineBreakMode.EllipsisTruncatingTail;
      }
      switch (lineBreakMode) {
        case LineBreakMode.WrappingTruncatingTail:
          return text.substr(0, maxLength);
        case LineBreakMode.WrappingTruncatingHead:
          return text.substr(-maxLength);
        case LineBreakMode.EllipsisTruncatingTail:
          return text.substr(0, maxLength) + (text.length > maxLength ? '...' : '');
        case LineBreakMode.EllipsisTruncatingMiddle:
          var resultText = text.substr(0, maxLength);
          if (text.length > maxLength) {
            return resultText.substr(0, parseInt(maxLength / 2)) + '...' + resultText.substr(parseInt(maxLength / 2));
          }
          return resultText;
        case LineBreakMode.EllipsisTruncatingHead:
          return (text.length > maxLength ? '...' : '') + text.substr(-maxLength);
      }
      return text;
    }
  }
};
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
@import "../../common/stylus/theme.styl";
.article-list-cell
  margin-bottom 10px
  background-color $default-cell-background-color
  border 1px solid $default-border-color

  img
    width 100%
    transition: All 0.4s ease-in-out
    transform: scale(1.0)
    zoom: 1.0

  &:hover
    border 1px solid $default-border-hover-color

    img
      transform: scale(1.05)
      zoom: 1.02

  .text-wrapper
    padding 20px 20px 0 20px
    text-align left
    @media only screen and (max-width: 768px)
      padding 10px 10px 0 10px

    .title
      font-size 20px
      font-weight 100
      line-height 24px
      @media only screen and (max-width: 768px)
        font-size 17px
        line-height 23px
      word-wrap break-word

      a
        color $default-title-color
        cursor pointer

        &:hover
          color $default-title-hover-color
          text-decoration underline

      span.special
        border-radius $border-radius
        font-size 12px
        font-weight 100
        padding 3px 5px
        margin-left 1px
        vertical-align top
        color $default-background-color
        background $iview-secondary-warning-color
        cursor pointer

    .tags
      margin 8px 0

    .desc
      font-size 14px
      line-height 20px
      font-weight 200
      color $default-desc-color
      @media only screen and (max-width: 768px)
        font-size 13px

      a
        font-weight 500
        color $default-desc-hover-color
        cursor pointer

        &:hover
          text-decoration underline

    .operate_info
      font-size 14px
      margin 15px 0 20px

      span
        margin-right 8px

        a
          color $default-info-color
          cursor pointer

          &:hover
            color $default-info-hover-color

        + span
          margin-left 8px
      @media only screen and (max-width: 768px)
        font-size 13px
        margin 10px 0
        span
          margin-right 4px

          + span
            margin-left 4px

  .img-wrapper
    padding-bottom: 85%
    width 100%
    height 0
    overflow hidden

    &.big-image
      padding-bottom 26%
      box-shadow 1px 1px 1px $default-border-color
</style>
