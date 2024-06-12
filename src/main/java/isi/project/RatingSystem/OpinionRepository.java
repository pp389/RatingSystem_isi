package isi.project.RatingSystem;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface OpinionRepository extends CrudRepository<Opinion, Integer> {
    Opinion findById(int id);
    List<Opinion> findByService(Service service);
    List<Opinion> findByUser(User user);
}
