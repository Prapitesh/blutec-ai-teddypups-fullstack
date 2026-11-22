package ai.blutec.puppies.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import javax.sql.DataSource;
import java.net.URI;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

@Configuration
@Profile("postgres")
public class PostgresDataSourceConfig {
    @Bean
    public DataSource dataSource(
            @Value("${DATABASE_URL:jdbc:postgresql://localhost:5432/blutec_puppies}") String databaseUrl,
            @Value("${DATABASE_USERNAME:blutec}") String defaultUsername,
            @Value("${DATABASE_PASSWORD:}") String defaultPassword) {
        String jdbcUrl = databaseUrl;
        String username = defaultUsername;
        String password = defaultPassword;
        if (databaseUrl.startsWith("postgresql://") || databaseUrl.startsWith("postgres://")) {
            URI uri = URI.create(databaseUrl);
            String[] auth = uri.getRawUserInfo().split(":", 2);
            username = URLDecoder.decode(auth[0], StandardCharsets.UTF_8);
            password = auth.length > 1 ? URLDecoder.decode(auth[1], StandardCharsets.UTF_8) : "";
            jdbcUrl = "jdbc:postgresql://" + uri.getHost() + ":"
                    + (uri.getPort() > 0 ? uri.getPort() : 5432) + uri.getRawPath();
            if (uri.getRawQuery() != null && !uri.getRawQuery().isBlank()) {
                jdbcUrl += "?" + uri.getRawQuery();
            }
        }
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl(jdbcUrl);
        config.setUsername(username);
        config.setPassword(password);
        config.setDriverClassName("org.postgresql.Driver");
        config.setMaximumPoolSize(5);
        config.setMinimumIdle(1);
        return new HikariDataSource(config);
    }
}
