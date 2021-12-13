
package com.ciclo4.reto3.controller;

import com.ciclo4.reto3.model.User;
import com.ciclo4.reto3.service.UserService;
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
 * @author Jorge Quesada
 */
@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*", methods= {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class UserController {
    @Autowired
    private UserService userService;
    
    /**
     * Metodo Get que retorna todos los usuarios de la coleccion Users.
     * @return 
    */
    @GetMapping("/all")
    public List <User> getAll(){
        return userService.getAll();
    }
    
    /**
     * Metodo Get que retorna al usuario por id de la coleccion Users. 
     * @param id
     * @return 
    */
    @GetMapping("/{id}")
    public Optional <User> getUser(@PathVariable("id") int id) {
        return userService.getUser(id);
    }
    
    /**
     * Metodo Post que agrega un nuevo usuario en la coleccion Users.
     * @param user
     * @return 
    */
    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public User create(@RequestBody User user){
        return userService.create(user);
    }
    
    /**
     * Metodo Put que actualiza un usuario en la coleccion Users.
     * @param user
     * @return 
    */
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public User update(@RequestBody User user){
        return userService.update(user);
    }
    
    /**
     * Metodo Delete que elimina un usuario de la coleccion Users.
     * @param id
     * @return 
    */
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int id){
        return userService.delete(id);
    }
    
    /**
     * Metodo Get que valida la conbinacion email/password de un usuario en la coleccion Users.
     * @param email
     * @param password
     * @return 
    */
    @GetMapping("/{email}/{password}")
    public User autenticateUser(@PathVariable("email") String email, @PathVariable("password") String password){
        return userService.autenticateUser(email, password);
    }
    
    /**
     * Metodo Get que valida si un email de un usuario ya existe en la coleccion Users.
     * @param email
     * @return 
    */
    @GetMapping("/emailexist/{email}")
    public boolean emailExist(@PathVariable("email") String email){
        return userService.emailExist(email);
    } 
    
}
