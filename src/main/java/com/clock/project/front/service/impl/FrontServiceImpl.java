package com.clock.project.front.service.impl;

import com.clock.common.enums.CacheConstants;
import com.clock.common.utils.ObjectUtils;
import com.clock.common.utils.SecurityUtils;
import com.clock.common.utils.ServletUtils;
import com.clock.common.utils.ip.AddressUtils;
import com.clock.common.utils.ip.IpUtils;
import com.clock.framework.config.redis.CacheExpire;
import com.clock.framework.config.redis.TimeType;
import com.clock.framework.manager.AsyncManager;
import com.clock.framework.manager.factory.AsyncFactory;
import com.clock.project.blog.domain.Blog;
import com.clock.project.blog.domain.Comment;
import com.clock.project.common.domain.Category;
import com.clock.project.common.domain.ReplayEmail;
import com.clock.project.blog.domain.Tag;
import com.clock.project.common.service.EmailService;
import com.clock.project.front.domain.BlogQuery;
import com.clock.project.front.mapper.FrontMapper;
import com.clock.project.front.service.FrontService;
import com.clock.project.system.domain.Carousel;
import com.clock.project.system.domain.Config;
import com.clock.project.system.domain.Link;
import com.clock.project.system.domain.Notice;
import eu.bitwalker.useragentutils.UserAgent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * @className: FrontServiceImpl
 * @description: front service impl
 * @author: Clock
 * 2020/1/1
 */
@Service
public class FrontServiceImpl implements FrontService {

    @Autowired
    private FrontMapper frontMapper;
    @Autowired
    private EmailService emailService;

    @Override
    @Cacheable(value = CacheConstants.CACHE_NAME_FRONT_LINK_LIST)
    @CacheExpire(expire = 1, type = TimeType.HOURS)
    public List<Link> selectLinkList() {
        return frontMapper.selectLinkList();
    }

    @Override
    public int insertLink(Link link) {
        link.setStatus(false);
        link.setDisplay(false);
        return frontMapper.insertLink(link);
    }

    @Override
    @Cacheable(value = CacheConstants.CACHE_NAME_FRONT_CATEGORY_LIST)
    @CacheExpire(expire = 1, type = TimeType.HOURS)
    public List<Category> selectCategoryList() {
        return frontMapper.selectCategoryList();
    }

    @Override
    @Cacheable(value = CacheConstants.CACHE_NAME_FRONT_SUPPORT_BLOG_LIST)
    @CacheExpire(expire = 1, type = TimeType.HOURS)
    public List<Blog> selectSupportBlogList() {
        return frontMapper.selectSupportBlogList();
    }

    @Override
    @Cacheable(value = CacheConstants.CACHE_NAME_FRONT_HOT_BLOG_LIST)
    @CacheExpire(expire = 1, type = TimeType.HOURS)
    public List<Blog> selectHotBlogList() {
        return frontMapper.selectHotBlogList();
    }

    @Override
    @Cacheable(value = CacheConstants.CACHE_NAME_FRONT_TAG_LIST)
    @CacheExpire(expire = 1, type = TimeType.HOURS)
    public List<Tag> selectTagList() {
        return frontMapper.selectTagList();
    }

    @Override
    @Cacheable(value = CacheConstants.CACHE_NAME_FRONT_CAROUSEL_LIST)
    @CacheExpire(expire = 1, type = TimeType.HOURS)
    public List<Carousel> selectCarouselList() {
        return frontMapper.selectCarouselList();
    }

    @Override
    @Cacheable(value = CacheConstants.CACHE_NAME_FRONT_NOTICE_LIST)
    @CacheExpire(expire = 1, type = TimeType.HOURS)
    public List<Notice> selectNoticeList() {
        return frontMapper.selectNoticeList();
    }

    @Override
    public int insertComment(Comment comment) {
        comment.setAdminReply(SecurityUtils.isAdmin());
        final UserAgent userAgent = UserAgent.parseUserAgentString(ServletUtils.getRequest().getHeader("User-Agent"));
        comment.setOs(userAgent.getOperatingSystem().getName());
        comment.setBrowser(userAgent.getBrowser().getName());
        comment.setDisplay(true);
        comment.setIp(IpUtils.getIpAddr(ServletUtils.getRequest()));
        comment.setLocation(AddressUtils.getCityInfoByIp(comment.getIp()));
        if (comment.getParentId() != null) {
            Comment tempComment = frontMapper.selectCommentById(comment.getParentId());
            String title = frontMapper.selectBlogTitleById(comment.getPageId());
            if (tempComment.getReply()) {
                ReplayEmail replayEmail = new ReplayEmail();
                replayEmail.setCreateTime(tempComment.getCreateTime());
                replayEmail.setOriginContent(tempComment.getHtmlContent());
                replayEmail.setReplyContent(comment.getHtmlContent());
                replayEmail.setUrl(comment.getUrl());
                replayEmail.setTitle(title);
                AsyncManager.me().execute(AsyncFactory.sendReplyEmail(comment.getUrl(), comment.getHtmlContent(), comment.getNickName(), tempComment.getEmail(), replayEmail));
            }
        }
        return frontMapper.insertComment(comment);
    }


    @Override
    public List<Comment> selectCommentListByPageId(Long id) {
        //查询获取所有的comment
        List<Comment> commentList = frontMapper.selectCommentListByPageId(id);
        List<Comment> result = commentList.stream().filter(e -> e.getParentId() == null).collect(Collectors.toList());
        //CommentId和NickName的映射Map
        Map<Long, String> commentIdAndNickNameMap = commentList.stream().collect(Collectors.toMap(Comment::getId, Comment::getNickName));
        for (Comment comment : result) {
            Long commentId = comment.getId();
            comment.setSubCommentList(commentList.stream().filter(e -> commentId.equals(e.getParentId())).collect(Collectors.toList()));
            //设置replyNickName
            if (ObjectUtils.isNotEmpty(comment.getSubCommentList())) {
                for (Comment temp : comment.getSubCommentList()) {
                    if (temp.getReplyId() != null) {
                        temp.setReplyNickName(commentIdAndNickNameMap.get(temp.getReplyId()));
                    }
                }
            }
        }
        return result;
    }

    @Override
    public int incrementCommentGood(Long id) {
        return frontMapper.incrementCommentGood(id);
    }

    @Override
    public int incrementCommentBad(Long id) {
        return frontMapper.incrementCommentBad(id);
    }

    @Override
    public int incrementBlogLike(Long id) {
        return frontMapper.incrementBlogLike(id);
    }

    @Override
    @Cacheable(value = CacheConstants.CACHE_NAME_FRONT_BLOG_ITEM, key = "'BlogId:' +#id")
    @CacheExpire(expire = 1, type = TimeType.MINUTES)
    public Blog selectBlogDetailById(Long id) {
        Blog blog = frontMapper.selectBlogDetailById(id);
        //get all comment
        blog.setCommentList(selectCommentListByPageId(id));
        return blog;
    }

    @Override
    public List<Blog> selectBlogList(BlogQuery blogQuery) {
        List<Blog> blogList = frontMapper.selectBlogList(blogQuery);
        for (Blog blog : blogList) {
            blog.setTagList(frontMapper.selectTagListByTypeAndId(blog.getId()));
        }
        return blogList;
    }

    @Override
    public int incrementLinkClick(Integer id) {
        return frontMapper.incrementLinkClick(id);
    }

    @Override
    public int incrementBlogClick(Long id) {
        return frontMapper.incrementBlogClick(id);
    }

    @Override
    public String selectAbout() {
        Config config = frontMapper.selectAbout();
        return config.getConfigValue();
    }

    @Override
    public List<Blog> selectBlogArchive(BlogQuery blogQuery) {
        List<Blog> blogList = frontMapper.selectBlogList(blogQuery);
        for (Blog blog : blogList) {
            blog.setTagList(frontMapper.selectTagListByTypeAndId(blog.getId()));
        }
        return blogList;
    }

    @Override
    @Cacheable(value = CacheConstants.CACHE_NAME_FRONT_SUPPORT_LINK_LIST)
    @CacheExpire(expire = 1, type = TimeType.HOURS)
    public List<Link> selectSupportLinkList() {
        return frontMapper.selectSupportLinkList();
    }

}
