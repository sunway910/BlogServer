package com.clock.project.blog.service.impl;

import com.clock.common.enums.CacheConstants;
import com.clock.common.utils.ConvertUtils;
import com.clock.common.utils.SecurityUtils;
import com.clock.project.blog.domain.Blog;
import com.clock.project.blog.domain.Comment;
import com.clock.project.blog.mapper.BlogMapper;
import com.clock.project.blog.mapper.CommentMapper;
import com.clock.project.blog.service.BlogService;
import com.clock.project.blog.service.TagService;
import com.clock.project.blog.domain.Tag;
import com.clock.project.front.domain.BlogQuery;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @className: Blog
 * @description: 博客Service业务层处理
 * @author: Clock
 * 2019-10-28
 */
@Service
public class BlogServiceImpl implements BlogService {

    BlogMapper blogMapper;
    CommentMapper commentMapper;
    TagService tagService;

    public BlogServiceImpl(BlogMapper blogMapper, CommentMapper commentMapper, TagService tagService) {
        this.blogMapper = blogMapper;
        this.commentMapper = commentMapper;
        this.tagService = tagService;
    }

    @Override
    public Blog selectBlogById(Long id) {
        Blog blog = blogMapper.selectBlogById(id);
        blog.setTagTitleList(getTagTitleListByBlogId(id));
        return blog;
    }

    @Override
    public List<Blog> selectBlogList(Blog blog) {
        List<Blog> blogList = blogMapper.selectBlogList(blog);
        if (blogList.isEmpty()) {
            return blogList;
        }
        for (Blog temp : blogList) {
            temp.setTagTitleList(getTagTitleListByBlogId(temp.getId()));
        }
        return blogList;
    }

    /**
     * 根据id获取title集合
     *
     * @param blogId blog的id
     * @return title集合
     */
    private List<String> getTagTitleListByBlogId(Long blogId) {
        List<Tag> tagList = tagService.selectTagListByBlogId(blogId);
        return tagList.stream().map(Tag::getTitle).collect(Collectors.toList());
    }

    @Override
    @Transactional(rollbackFor = {Exception.class})
    @CacheEvict(value = CacheConstants.CACHE_NAME_FRONT, key = "'BlogList'")
    public int insertBlog(Blog blog) {
        blog.setCreateBy(SecurityUtils.getUsername());
        int count = blogMapper.insertBlog(blog);
        tagService.updateTagMapping(blog.getId(), blog.getTagTitleList());
        return count;
    }


    @Override
    @CacheEvict(value = CacheConstants.CACHE_NAME_FRONT, key = "'BlogList'")
    public int updateBlog(Blog blog) {
        blog.setUpdateBy(SecurityUtils.getUsername());
        int count = blogMapper.updateBlog(blog);
        tagService.updateTagMapping(blog.getId(), blog.getTagTitleList());
        return count;
    }

    @Override
    @Caching(evict = {
            @CacheEvict(value = CacheConstants.CACHE_NAME_FRONT, key = "'BlogList'"),
            @CacheEvict(value = CacheConstants.CACHE_NAME_FRONT, key = "'HotList'"),
            @CacheEvict(value = CacheConstants.CACHE_NAME_FRONT, key = "'SupportList'"),
    })
    @CacheEvict(value = CacheConstants.CACHE_NAME_FRONT, key = "'BlogList'")
    public int deleteBlogByIds(String ids) {
        String username = SecurityUtils.getUsername();
        return blogMapper.deleteBlogByIds(ConvertUtils.toStrArray(ids), username);
    }

    @Override
    @Caching(evict = {
            @CacheEvict(value = CacheConstants.CACHE_NAME_FRONT, key = "'BlogList'"),
            @CacheEvict(value = CacheConstants.CACHE_NAME_FRONT, key = "'HotList'"),
            @CacheEvict(value = CacheConstants.CACHE_NAME_FRONT, key = "'SupportList'"),
            @CacheEvict(value = CacheConstants.CACHE_NAME_FRONT, key = "'BlogItem_'+#id")
    })
    public int deleteBlogById(Long id) {
        String username = SecurityUtils.getUsername();
        return blogMapper.deleteBlogById(id, username);
    }

    @Override
    @CacheEvict(value = CacheConstants.CACHE_NAME_FRONT, key = "'BlogList'")
    public List<String> selectBlogTagList(String query) {
        Tag tag = new Tag();
        tag.setTitle(query);
        List<Tag> tagList = tagService.selectTagList(tag);
        return tagList.stream().map(Tag::getTitle).collect(Collectors.toList());
    }

    @Override
    public List<Blog> selectBlogList(BlogQuery blogQuery) {
        List<Blog> blogList = blogMapper.selectBlogListQuery(blogQuery);
        for (Blog blog : blogList) {
            blog.setTagList(tagService.selectTagListByBlogId(blog.getId()));
        }
        return blogList;
    }

    @Override
    public Blog selectBlogDetailById(Long id) {
        Blog blog = blogMapper.selectBlogByIdQuery(id);
        blog.setTagList(tagService.selectTagListByBlogId(id));
        //获取commentList
        blog.setCommentList(commentMapper.selectCommentListByPageId(id));
        //设置点击数量+1
        blogMapper.incrementBlogClick(id);
        return blog;
    }

    /**
     * 获取评论
     *
     * @param id id
     * @return 评论列表
     */
    private List<Comment> getCommentListByPageId(Long id) {
        List<Comment> commentList = commentMapper.selectCommentListByPageId(id);
        for (Comment comment : commentList) {
            if (comment.getParentId() != null) {
                comment.setParentComment(commentMapper.selectCommentById(comment.getParentId()));
            }
        }
        return commentList;
    }

    @Override
    public int incrementBlogLike(Long id) {
        return blogMapper.incrementBlogLike(id);
    }

    @Override
    public List<Comment> selectBlogCommentListByBlogId(Long id) {
        return getCommentListByPageId(id);
    }
}
