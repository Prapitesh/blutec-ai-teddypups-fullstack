package ai.blutec.puppies.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity @Table(name="enquiries")
public class Enquiry {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) public Long id;
    @Column(nullable=false,length=80) public String name;
    @Column(nullable=false,length=32) public String phone;
    @Column(length=160) public String email;
    @Column(length=80) public String area;
    @Column(length=120) public String puppySlug;
    @Column(length=3000) public String message;
    @Column(nullable=false) public Instant createdAt = Instant.now();
    public Enquiry() {}
}