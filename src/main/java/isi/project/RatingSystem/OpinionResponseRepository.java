package isi.project.RatingSystem;

import org.springframework.data.repository.CrudRepository;

public interface OpinionResponseRepository extends CrudRepository<OpinionResponse, Integer> {
    OpinionResponse getByOpinion(Opinion opinion);
    OpinionResponse findById(int id);
}
