package com.clock.framework.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Paths;

/**
 * @className: ResourcesConfig
 * @description: resource config
 * @author: Clock
 * 
 */
@Configuration
public class ResourcesConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String pathUtl = Paths.get(ClockBlogConfig.getProfile()).normalize().toUri().toASCIIString();
        registry.addResourceHandler("/file/**").addResourceLocations(pathUtl).setCachePeriod(0);

        registry.addResourceHandler("swagger-ui.html").addResourceLocations("classpath:/META-INF/resources/");
        registry.addResourceHandler("/webjars/**").addResourceLocations("classpath:/META-INF/resources/webjars/");
    }
}
