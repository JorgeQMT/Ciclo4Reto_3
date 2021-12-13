package com.ciclo4.reto3.repository;

import com.ciclo4.reto3.model.Cosmetic;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Jorge Quesada
 */
@Repository
public class CosmeticRepository {
    @Autowired
    private CosmeticCrudRepository cosmeticCrudRepository;

    public List<Cosmetic> getAll() {
        return (List<Cosmetic>) cosmeticCrudRepository.findAll();
    }

    public Optional<Cosmetic> getCosmetic(String reference) {
        return cosmeticCrudRepository.findById(reference);
    }

    public Cosmetic create(Cosmetic cosmetic) {
        return cosmeticCrudRepository.save(cosmetic);
    }

    public Cosmetic update(Cosmetic cosmetic) {
        return cosmeticCrudRepository.save(cosmetic);
    }

    public void delete(Cosmetic cosmetic) {
        cosmeticCrudRepository.delete(cosmetic);
        /*
        Boolean aBoolean = getUser(userId).map(user -> {
            repositorio.delete(user);
            return true;
        }).orElse(false);
        return aBoolean;*/
    }
    
    public boolean productExist(String reference) {
        Optional <Cosmetic> cosmetic = cosmeticCrudRepository.findByReference(reference);
        return !cosmetic.isEmpty();
    }

}
