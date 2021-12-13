package com.ciclo4.reto3.repository;


import com.ciclo4.reto3.model.User;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 *
 * @author Jorge Quesada
 */

public interface UserCrudRepository extends MongoRepository<User, Integer> {
    
    public Optional<User> findByEmailAndPassword(String email, String password);

    public Optional<User> findByEmail(String email);
    
    //Para seleccionar el usuario con el id maximo
    Optional<User> findTopByOrderByIdDesc();
}
