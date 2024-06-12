package isi.project.RatingSystem;

import jakarta.persistence.*;

@Entity
public class Service {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;
    private String name;
    private String description;
    private Double averageRating;

    @ManyToOne
    private ServiceProvider serviceProvider;

    @ManyToOne
    private Category category;

    public Service() {

    }

    public Service(String name, String description, ServiceProvider serviceProvider, Category category) {
        this.name = name;
        this.description = description;
        this.serviceProvider = serviceProvider;
        this.category = category;
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public Double getAverageRating() {
        return averageRating;
    }

    public ServiceProvider getServiceProvider() {
        return serviceProvider;
    }

    public Category getCategory() {
        return category;
    }
}
