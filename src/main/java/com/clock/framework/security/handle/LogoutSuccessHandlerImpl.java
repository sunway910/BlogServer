package com.clock.framework.security.handle;

import com.alibaba.fastjson.JSON;
import com.clock.common.constant.Constants;
import com.clock.common.utils.ServletUtils;
import com.clock.common.utils.StringUtils;
import com.clock.framework.manager.AsyncManager;
import com.clock.framework.manager.factory.AsyncFactory;
import com.clock.framework.security.LoginUser;
import com.clock.framework.security.service.TokenService;
import com.clock.framework.web.domain.AjaxResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @className: LogoutSuccessHandlerImpl
 * @description: 自定义退出处理类 返回成功
 * @author: Clock
 * 
 */
@Configuration
public class LogoutSuccessHandlerImpl implements LogoutSuccessHandler {
    @Autowired
    private TokenService tokenService;

    /**
     * 退出处理
     */
    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        LoginUser loginUser = tokenService.getLoginUser(request);
        if (StringUtils.isNotNull(loginUser)) {
            String userName = loginUser.getUsername();
            // 删除用户缓存记录
            tokenService.delLoginUser(loginUser.getToken());
            // 记录用户退出日志
            AsyncManager.me().execute(AsyncFactory.recordLoginLog(userName, Constants.SUCCESS, "退出成功"));
        }
        ServletUtils.renderString(response, JSON.toJSONString(AjaxResult.error(HttpStatus.OK, "退出成功")));
    }
}
