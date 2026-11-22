package ai.blutec.puppies.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class WebCorsConfig implements WebMvcConfigurer {
    @Value("${app.allowed-origins:http://localhost:5173,http://127.0.0.1:5173}")
    private String origins;

    @Override public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOriginPatterns(origins.split(","))
            .allowedMethods("GET","POST","OPTIONS")
            .allowedHeaders("Content-Type","Accept");
    }
}