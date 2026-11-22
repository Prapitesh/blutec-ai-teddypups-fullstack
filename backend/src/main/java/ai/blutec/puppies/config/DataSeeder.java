package ai.blutec.puppies.config;

import ai.blutec.puppies.model.Puppy;
import ai.blutec.puppies.repo.PuppyRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import java.io.InputStream;
import java.util.Arrays;

@Component
public class DataSeeder implements CommandLineRunner {
    private final PuppyRepository repository;
    private final ObjectMapper mapper;
    public DataSeeder(PuppyRepository repository,ObjectMapper mapper) {
        this.repository=repository; this.mapper=mapper;
    }
    @Override public void run(String... args) throws Exception {
        try(InputStream input=new ClassPathResource("seed-puppies.json").getInputStream()) {
            Puppy[] items=mapper.readValue(input,Puppy[].class);
            for(int i=0;i<items.length;i++) items[i].sortOrder=i;
            repository.saveAll(Arrays.asList(items));
            System.out.println("Loaded "+items.length+" puppy profiles");
        }
    }
}