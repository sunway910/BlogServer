package com.clock.project.blog.controller;

import com.clock.common.utils.SecurityUtils;
import com.clock.framework.aspectj.lang.annotation.Log;
import com.clock.framework.aspectj.lang.enums.BusinessType;
import com.clock.framework.web.controller.BaseController;
import com.clock.framework.web.domain.AjaxResult;
import com.clock.framework.web.page.TableDataInfo;
import com.clock.project.blog.service.TagService;
import com.clock.project.blog.domain.Tag;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @className: TagController
 * @description:
 * @author: Clock
 * 11/22/19
 */
@RestController
@RequestMapping("blog/tag")
public class TagController extends BaseController {

    final TagService tagService;

    public TagController(TagService tagService) {
        this.tagService = tagService;
    }

    @PreAuthorize("@permissionService.hasPermission('blog:tag:list')")
    @GetMapping("/list")
    public TableDataInfo list(Tag tag) {
        startPage();
        List<Tag> list = tagService.selectTagList(tag);
        return getDataTable(list);
    }

    @PreAuthorize("@permissionService.hasPermission('blog:tag:add')")
    @Log(title = "标签管理", businessType = BusinessType.INSERT)
    @PostMapping()
    public AjaxResult add(@RequestBody Tag tag) {
        tag.setCreateBy(SecurityUtils.getUsername());
        return toAjax(tagService.insertTag(tag));
    }

    @PreAuthorize("@permissionService.hasPermission('blog:tag:query')")
    @GetMapping(value = "/{id}")
    public AjaxResult getInfo(@PathVariable Long id) {
        return AjaxResult.success(tagService.selectTagById(id));
    }

    @PreAuthorize("@permissionService.hasPermission('blog:tag:edit')")
    @Log(title = "标签管理", businessType = BusinessType.UPDATE)
    @PutMapping()
    public AjaxResult edit(@RequestBody Tag tag) {
        return toAjax(tagService.updateTag(tag));
    }

    @PreAuthorize("@permissionService.hasPermission('blog:tag:remove')")
    @Log(title = "标签管理", businessType = BusinessType.DELETE)
    @DeleteMapping("/{ids}")
    public AjaxResult remove(@PathVariable String ids) {
        return toAjax(tagService.deleteTagByIds(ids));
    }
}
