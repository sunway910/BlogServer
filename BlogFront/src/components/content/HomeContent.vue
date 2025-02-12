<template>
  <div class="home-content layout-content">
    <div class="banner" style="margin-bottom:20px;" v-if="carouselList.length>0">
      <div class="bracket"></div>
      <div class="target">
        <HomeBanner :carouselList="carouselList"></HomeBanner>
      </div>
    </div>
    <Row>
      <Column :xs="24" :sm="24" :md="24" :lg="24" :xl="17">
        <div class="layout-left">
          <!-- 文章 -->
          <SectionTitle mainTitle="Article" subTitle="文章"
                        :menus="articlesTitleMenus"
                        :to="'/articles'"
                        :withRefresh="true"
                        :withTimeSelect="false"
                        @refresh="refreshArticles"
                        @menusControl="articlesMenusControl">
          </SectionTitle>
          <ArticleListCell v-for="article in articles" :article="article" :key="article.id"></ArticleListCell>
        </div>
      </Column>
      <Column :xs="44" :sm="44" :md="44" :lg="44" :xl="7">
        <div class="layout-right" v-if="showPage">
          <About/>
          <Recommend style="margin-top:15px;"/>
          <Hot style="margin-top:15px;"/>
          <TagWall style="margin-top:15px;"/>
          <FriendLinks style="margin-top:15px;"/>
        </div>
      </Column>
    </Row>
  </div>
</template>

<script type="text/ecmascript-6">
import {
  mapState,
  mapActions
} from 'vuex';

import SectionTitle from "../../views/SectionTitle";
import ArticleListCell from "../../views/article/ArticleListCell";
import About from "../../views/About";
import TagWall from "../../views/TagWall";
import FriendLinks from "../../views/FriendLinks";
import Hot from "../../views/Hot";
import Recommend from "../../views/Recommend";
import HomeBanner from "../../views/HomeBanner";
import {listCarousel} from '@/api'


export default {
  name: 'home-content',
  data() {
    return {
      carouselList: [],
      // 文章
      mostComment: undefined,
      hot: undefined,
      recommend: undefined,
      articlesTitleMenus: [
        {title: "Most commented", selected: false, method: 'mostComment'},
        {title: "Hottest", selected: false, method: 'hot'},
        {title: "Recommend", selected: false, method: 'recommend'}
      ]
    };
  },
  computed: {
    ...mapState({
      articles: state => state.home.articles,
    }),
    showPage: function () {
      return this.$store.state.home.articles.length >= 0;
    }
  },
  beforeMount() {
    listCarousel().then(response => {
      this.carouselList = response.data;
    });
    if (this.$store.state.home.articles.length === 0) {
      this.getArticlesBaseInfo({
        is_recommend: this.recommend,
        is_hot: this.hot,
        ordering: this.mostComment,
        pageSize: 10,
        pageNum: 1
      });
    }
  },
  mounted() {
    // 更新首页meta信息
    // this.updateHomeMeta();
  },
  methods: {
    ...mapActions({
      getArticlesBaseInfo: 'home/GET_ARTICLES_BASE_INFO'
    }),
    refreshArticles() {
      this.mostComment = undefined;
      this.hot = undefined;
      this.recommend = undefined;
      this.getArticlesBaseInfo();
    },
    articlesMenusControl(params) {
      switch (params[0]) {
        case 'mostComment':
          this.mostComment = params[1] ? 'commentCount' : undefined;
          break;
        case 'hot':
          this.hot = params[1] ? 'click' : undefined;
          break;
        case 'recommend':
          this.recommend = params[1] ? true : undefined;
          break;
      }
      // 排序条件
      let orderings = [];
      if (this.mostComment !== undefined) {
        orderings.push(this.mostComment);
      }
      if (this.hot !== undefined) {
        orderings.push(this.hot);
      }
      this.getArticlesBaseInfo({
        support: this.recommend,
        orderByColumn: orderings.toString(),
        isAsc: this.timeSorted ? 'asc' : 'desc',
        pageNum: 1,
        pageSize: 10
      });
    }
  },
  components: {
    SectionTitle, ArticleListCell, About, TagWall, FriendLinks, Hot, Recommend, HomeBanner
  }
};
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
.home-content
  .banner
    position relative
    width 100%
    overflow hidden

    .bracket
      margin-top 25%
      @media only screen and (max-width: $responsive-sm)
        margin-top 38%

    .target
      position absolute
      top 0
      bottom 0
      left 0
      right 0

  .thumb-cards
    margin-top 15px
</style>
