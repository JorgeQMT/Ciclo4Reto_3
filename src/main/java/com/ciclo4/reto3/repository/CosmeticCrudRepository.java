package com.ciclo4.reto3.repository;


import com.ciclo4.reto3.model.Cosmetic;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 *
 * @author Jorge Quesada
 */

public interface CosmeticCrudRepository extends MongoRepository<Cosmetic, String> {
    
    public Optional<Cosmetic> findByReference(String reference);

}
