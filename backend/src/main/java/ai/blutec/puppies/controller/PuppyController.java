package ai.blutec.puppies.controller;

import ai.blutec.puppies.model.Puppy;
import ai.blutec.puppies.service.PuppyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/puppies")
public class PuppyController {
    private final PuppyService service;
    public PuppyController(PuppyService service) { this.service = service; }

    @GetMapping
    public List<Puppy> list(@RequestParam(required = false) String status,
                           @RequestParam(required = false) String breed,
                           @RequestParam(required = false) String search) {
        return service.findAll(status, breed, search);
    }

    @GetMapping("/{slug}")
    public ResponseEntity<Puppy> get(@PathVariable String slug) {
        return service.findBySlug(slug).map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
