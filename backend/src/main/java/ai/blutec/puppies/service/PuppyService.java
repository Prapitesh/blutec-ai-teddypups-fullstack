package ai.blutec.puppies.service;

import ai.blutec.puppies.model.Puppy;
import ai.blutec.puppies.repo.PuppyRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;
import java.util.Optional;

@Service
public class PuppyService {
    private final PuppyRepository repository;
    public PuppyService(PuppyRepository repository) { this.repository = repository; }

    public List<Puppy> findAll(String status, String breed, String search) {
        return repository.findAll(Sort.by("sortOrder")).stream()
            .filter(p -> blank(status) || status.equalsIgnoreCase(p.status))
            .filter(p -> blank(breed) || contains(p.breed, breed))
            .filter(p -> blank(search) || contains(p.name + " " + p.breed + " " + p.description, search))
            .toList();
    }
    public Optional<Puppy> findBySlug(String slug) { return repository.findById(slug); }

    private static boolean blank(String value) { return value == null || value.isBlank(); }
    private static boolean contains(String field, String term) {
        return field != null && field.toLowerCase(Locale.ROOT).contains(term.trim().toLowerCase(Locale.ROOT));
    }
}
