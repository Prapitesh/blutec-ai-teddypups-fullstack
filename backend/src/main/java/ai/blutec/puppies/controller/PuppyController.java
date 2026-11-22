package ai.blutec.puppies.controller;

import ai.blutec.puppies.model.Puppy;
import ai.blutec.puppies.repo.PuppyRepository;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/puppies")
public class PuppyController {
    private final PuppyRepository repository;
    public PuppyController(PuppyRepository repository) { this.repository = repository; }

    @GetMapping
    public List<Puppy> list(@RequestParam(required=false) String status,
                            @RequestParam(required=false) String breed,
                            @RequestParam(required=false) String search) {
        return repository.findAll(Sort.by("sortOrder")).stream()
            .filter(p -> status == null || status.isBlank() || status.equalsIgnoreCase(p.status))
            .filter(p -> breed == null || breed.isBlank() || p.breed.toLowerCase().contains(breed.toLowerCase()))
            .filter(p -> search == null || search.isBlank() ||
                  (p.name+" "+p.breed+" "+p.description).toLowerCase().contains(search.toLowerCase()))
            .toList();
    }

    @GetMapping("/{slug}")
    public ResponseEntity<Puppy> get(@PathVariable String slug) {
        return repository.findById(slug).map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.notFound().build());
    }
}