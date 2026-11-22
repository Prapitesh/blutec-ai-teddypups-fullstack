package ai.blutec.puppies.repo;

import ai.blutec.puppies.model.Puppy;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PuppyRepository extends JpaRepository<Puppy, String> {}