package ai.blutec.puppies.repo;

import ai.blutec.puppies.model.Enquiry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnquiryRepository extends JpaRepository<Enquiry, Long> {}