package com.clock.project.home.mapper;

import com.clock.project.home.domain.KeyValue;
import com.clock.project.log.domain.LoginLog;
import com.clock.project.log.domain.OperateLog;
import com.clock.project.log.domain.QuartzJobLog;
import com.clock.project.log.domain.VisitLog;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * @className: DashBoardMapper
 * @description:
 * @author: Clock
 * 12/20/19
 */
public interface DashBoardMapper {

    /**
     * 获取访问数量
     *
     * @return 访问数量
     */
    Long getVisitorCount();

    /**
     * 获取博客数量
     *
     * @return 博客数量
     */
    Long getBlogCount();

    /**
     * get visit log count by createTime .
     *
     * @param date current day string. eg:2019-08-08
     * @return count
     */
    Long getVisitorCountByCreateTime(@Param("date") String date);

    /**
     * get blog count by createTime
     *
     * @param day current day string. eg:2019-08-08
     * @return count
     */
    Long getBlogCountByCreateTime(String day);

    List<Map<String, Long>> getSpiderData();

    /**
     * 获取visitLog
     *
     * @return visitLog
     */
    List<VisitLog> getVisitLog();

    /**
     * 根据Id获取blog的title
     *
     * @param pageId blog的id
     * @return blog的title
     */
    String getBlogNameByPageId(Long pageId);

    /**
     * 获取登录日志
     *
     * @return 登录日志
     */
    List<LoginLog> getLoginLogList();

    /**
     * 获取操作日志
     *
     * @return 操作日志
     */
    List<OperateLog> getOperateLogList();

    /**
     * 获取任务日志
     *
     * @return 任务日志
     */
    List<QuartzJobLog> getQuartzJobLogList();

    List<KeyValue> getAccessData();
}
