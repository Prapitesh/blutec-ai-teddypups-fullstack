package ai.blutec.puppies.model;

import jakarta.persistence.*;

@Entity
@Table(name = "puppies")
public class Puppy {
    @Id @Column(length = 120) public String slug;
    public String name;
    public String breed;
    public String gender;
    public String age;
    public String status;
    public Integer sortOrder = 0;
    public String image;
    @Column(length = 2000) public String description;
    @Column(length = 700) public String alt;
    public Puppy() {}
}