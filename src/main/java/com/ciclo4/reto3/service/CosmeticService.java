package com.ciclo4.reto3.service;

import com.ciclo4.reto3.model.Cosmetic;
import com.ciclo4.reto3.repository.CosmeticRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Jorge Quesada
 */
@Service
public class CosmeticService {
    @Autowired
    private CosmeticRepository cosmeticRepositorio;

    public List<Cosmetic>getAll() {
        return cosmeticRepositorio.getAll();
    }
    
    public Optional<Cosmetic> getCosmetic(String reference) {
        return cosmeticRepositorio.getCosmetic(reference);
    }

    public Cosmetic create(Cosmetic cosmetic) {
        if (cosmetic.getReference()== null) {
            return cosmetic;
        } else {
            return cosmeticRepositorio.create(cosmetic);  
        }
    }

    public Cosmetic update(Cosmetic cosmetic) {

        if (cosmetic.getReference() != null) {
            Optional<Cosmetic> cosmeticDb = cosmeticRepositorio.getCosmetic(cosmetic.getReference());
            if (!cosmeticDb.isEmpty()) {
                if (cosmetic.getBrand()!= null) {
                    cosmeticDb.get().setBrand(cosmetic.getBrand());
                }
                if (cosmetic.getCategory()!= null) {
                    cosmeticDb.get().setCategory(cosmetic.getCategory());
                }
                if (cosmetic.getName()!= null) {
                    cosmeticDb.get().setName(cosmetic.getName());
                }
                if (cosmetic.getDescription()!= null) {
                    cosmeticDb.get().setDescription(cosmetic.getDescription());
                }
                if (cosmetic.getPrice()!= 0.0) {
                    cosmeticDb.get().setPrice(cosmetic.getPrice());
                }
                if (cosmetic.getQuantity()!= 0) {
                    cosmeticDb.get().setQuantity(cosmetic.getQuantity());
                }
                if (cosmetic.getPhotography()!= null) {
                    cosmeticDb.get().setPhotography(cosmetic.getPhotography());
                }
                cosmeticRepositorio.update(cosmeticDb.get());
                return cosmeticDb.get();
            } else {
                return cosmetic;
            }
        } else {
            return cosmetic;
        }
    }

    public boolean delete(String reference) {
        /*
        Optional<Cosmetic> cosmetic = getCosmetic(reference);
        
        if (cosmetic.isEmpty()){
            return false;
        }else{
            cosmeticRepositorio.delete(cosmetic.get());
            return true;
        }
        */
        Boolean aBoolean = getCosmetic(reference).map(user -> {
            cosmeticRepositorio.delete(user);
            return true;
        }).orElse(false);
        return aBoolean;
        
    }
    
    public boolean productExist(String reference) {
        return cosmeticRepositorio.productExist(reference);
    }
}
