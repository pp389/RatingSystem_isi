package isi.project.RatingSystem;

import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {
    User findByNickname(String nickname);
}
