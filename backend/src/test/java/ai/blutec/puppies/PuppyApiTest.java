package ai.blutec.puppies;

import ai.blutec.puppies.repo.EnquiryRepository;
import ai.blutec.puppies.repo.PuppyRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import java.util.Map;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment=SpringBootTest.WebEnvironment.RANDOM_PORT,properties={
  "spring.datasource.url=jdbc:h2:mem:testdb;DB_CLOSE_DELAY=-1",
  "spring.jpa.hibernate.ddl-auto=create-drop"
})
class PuppyApiTest {
    @LocalServerPort int port;
    @Autowired PuppyRepository puppies;
    @Autowired EnquiryRepository enquiries;
    @Autowired TestRestTemplate http;

    String api(String path) { return "http://localhost:"+port+"/api"+path; }

    @Test void seededCatalogueAndDetailsWork() {
        assertThat(puppies.count()).isEqualTo(42);
        var response=http.getForEntity(api("/puppies?status=AVAILABLE"),Object[].class);
        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(response.getBody()).hasSize(15);
        var detail=http.getForEntity(api("/puppies/maltipoo-max-male"),String.class);
        assertThat(detail.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(detail.getBody()).contains("Max");
        var notFound=http.getForEntity(api("/puppies/missing-puppy"),String.class);
        assertThat(notFound.getStatusCode().value()).isEqualTo(404);
    }

    @Test void submittingEnquirySavesAndValidates() {
        long before=enquiries.count();
        var valid=Map.of("name","Browser Test","phone","+971501234567","email","hello@example.com",
          "area","Dubai","puppySlug","maltipoo-max-male","message","Testing the form");
        var saved=http.postForEntity(api("/enquiries"),valid,Map.class);
        assertThat(saved.getStatusCode().value()).isEqualTo(201);
        assertThat(enquiries.count()).isEqualTo(before+1);
        var invalid=Map.of("name","A","phone","123","email","not-an-email");
        var denied=http.postForEntity(api("/enquiries"),invalid,String.class);
        assertThat(denied.getStatusCode().value()).isEqualTo(400);
        assertThat(enquiries.count()).isEqualTo(before+1);
    }
}
