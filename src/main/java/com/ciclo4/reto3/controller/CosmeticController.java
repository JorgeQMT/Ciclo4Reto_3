
package com.ciclo4.reto3.controller;

import com.ciclo4.reto3.model.Cosmetic;
import com.ciclo4.reto3.service.CosmeticService;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author desarrolloextremo
 */
@RestController
@RequestMapping("/api/cosmetics")
@CrossOrigin(origins = "*", methods= {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class CosmeticController {
    @Autowired
    private CosmeticService cosmeticService;
    
    @GetMapping("/all")
    public List <Cosmetic> getAll(){
        return cosmeticService.getAll();
    }
    
    @GetMapping("/{reference}")
    public Optional <Cosmetic> getCosmetic(@PathVariable("reference") String reference){
        return cosmeticService.getCosmetic(reference);
    }
    
    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public Cosmetic create(@RequestBody Cosmetic cosmetic){
        return cosmeticService.create(cosmetic);
    }
    
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Cosmetic update(@RequestBody Cosmetic cosmetic){
        return cosmeticService.update(cosmetic);
    }
    
    @DeleteMapping("/{reference}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("reference") String reference){
        return cosmeticService.delete(reference);
    }
    
    @GetMapping("/productexist/{reference}")
    public boolean productExist(@PathVariable("reference") String reference){
        return cosmeticService.productExist(reference);
    }
}
