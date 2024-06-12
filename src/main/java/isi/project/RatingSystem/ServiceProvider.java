package isi.project.RatingSystem;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class ServiceProvider {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;
    private String name;

    public ServiceProvider(String name) {
        this.name = name;
    }

    public ServiceProvider() {}

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
