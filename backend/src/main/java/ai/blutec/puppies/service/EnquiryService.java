package ai.blutec.puppies.service;

import ai.blutec.puppies.dto.EnquiryRequest;
import ai.blutec.puppies.model.Enquiry;
import ai.blutec.puppies.repo.EnquiryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EnquiryService {
    private final EnquiryRepository repository;
    public EnquiryService(EnquiryRepository repository) { this.repository = repository; }

    @Transactional
    public Enquiry save(EnquiryRequest req) {
        Enquiry e = new Enquiry();
        e.name = req.name().trim();
        e.phone = req.phone().trim();
        e.email = req.email() == null ? "" : req.email().trim();
        e.area = req.area() == null ? "" : req.area().trim();
        e.puppySlug = req.puppySlug() == null ? "" : req.puppySlug().trim();
        e.message = req.message() == null ? "" : req.message().trim();
        return repository.save(e);
    }
}
