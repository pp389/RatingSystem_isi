package isi.project.RatingSystem;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ServiceRepository extends CrudRepository<Service, Integer> {
    Service findByName(String name);
    Service findById(int id);
    Service findByServiceProviderAndName(ServiceProvider serviceProvider, String name);
    List<Service> findByServiceProvider(ServiceProvider serviceProvider);
    List<Service> findByCategory(Category category);
}
