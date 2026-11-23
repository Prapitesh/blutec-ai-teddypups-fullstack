package ai.blutec.puppies.config;

import ai.blutec.puppies.model.Puppy;
import ai.blutec.puppies.repo.PuppyRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class DataSeeder implements CommandLineRunner {
    private final PuppyRepository repository;
    private final ObjectMapper mapper;
    public DataSeeder(PuppyRepository repository, ObjectMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    public void run(String... args) throws Exception {
        try (InputStream input = new ClassPathResource("seed-puppies.json").getInputStream()) {
            Puppy[] puppies = mapper.readValue(input, Puppy[].class);
            for (int i = 0; i < puppies.length; i++) puppies[i].sortOrder = i;
            Set<String> existing = repository.findAll().stream()
                .map(p -> p.slug).collect(Collectors.toSet());
            var missing = Arrays.stream(puppies).filter(p -> !existing.contains(p.slug)).toList();
            if (!missing.isEmpty()) repository.saveAll(missing);
            System.out.println("Puppy seed: inserted " + missing.size() + " new profiles; preserved "
                + existing.size() + " existing records");
        }
    }
}
