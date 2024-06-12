package isi.project.RatingSystem;

import org.springframework.data.repository.CrudRepository;

public interface ServiceProviderRepository extends CrudRepository<ServiceProvider, Integer> {
    ServiceProvider findByName(String name);
}
