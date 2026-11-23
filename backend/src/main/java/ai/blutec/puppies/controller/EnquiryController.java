package ai.blutec.puppies.controller;

import ai.blutec.puppies.dto.EnquiryRequest;
import ai.blutec.puppies.model.Enquiry;
import ai.blutec.puppies.service.EnquiryService;
import jakarta.validation.Valid;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/enquiries")
public class EnquiryController {
    private final EnquiryService service;
    public EnquiryController(EnquiryService service) { this.service = service; }

    @PostMapping
    public ResponseEntity<Map<String, Object>> submit(@Valid @RequestBody EnquiryRequest request) {
        // Discard probable automated spam without saving it.
        if (request.website() != null && !request.website().isBlank())
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(Map.of("message","Thank you!"));

        Enquiry enquiry = service.save(request);
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(Map.of("message", "Your message has been saved successfully.", "id", enquiry.id));
    }
}
