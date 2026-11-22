package ai.blutec.puppies.controller;

import ai.blutec.puppies.model.Enquiry;
import ai.blutec.puppies.repo.EnquiryRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/enquiries")
public class EnquiryController {
    private final EnquiryRepository repository;
    public EnquiryController(EnquiryRepository repository) { this.repository = repository; }

    public record EnquiryRequest(
        @NotBlank @Size(min=2,max=80) String name,
        @NotBlank @Pattern(regexp="^[+0-9()\\-\\s]{7,32}$") String phone,
        @Email String email,
        @Size(max=80) String area,
        @Size(max=120) String puppySlug,
        @Size(max=3000) String message,
        String website
    ) {}

    @PostMapping
    public ResponseEntity<?> submit(@Valid @RequestBody EnquiryRequest req) {
        // Honeypot: discard automated spam silently; never contact the original website.
        if (req.website() != null && !req.website().isBlank())
            return ResponseEntity.accepted().body(Map.of("message","Thank you!"));
        Enquiry e = new Enquiry();
        e.name=req.name().trim();
        e.phone=req.phone().trim();
        e.email=req.email()==null?"":req.email().trim();
        e.area=req.area()==null?"":req.area().trim();
        e.puppySlug=req.puppySlug()==null?"":req.puppySlug().trim();
        e.message=req.message()==null?"":req.message().trim();
        repository.save(e);
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(Map.of("message","Your message has been saved successfully.","id",e.id));
    }
}