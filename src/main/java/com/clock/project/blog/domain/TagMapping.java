package com.clock.project.blog.domain;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;

/**
 * @className: TagMapping
 * @description: Tag和其他表的关联
 * @author: Clock
 * 11/22/19
 */
@Data
@Builder
public class TagMapping implements Serializable {
    private Long id;
    private Long blogId;
    private Long tagId;
}
