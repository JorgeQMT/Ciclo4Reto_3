package com.ciclo4.reto3.repository;

import com.ciclo4.reto3.model.User;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Jorge Quesada
 */
@Repository
public class UserRepository {
    @Autowired
    private UserCrudRepository userCrudRepository;

    public List<User> getAll() {
        return userCrudRepository.findAll();
    }

    public Optional<User> getUser(int id) {
        return userCrudRepository.findById(id);
    }

    public User create(User user) {
        return userCrudRepository.save(user);
    }

    public User update(User user) {
        return userCrudRepository.save(user);
    }

    public void delete(User user) {
        userCrudRepository.delete(user);
        /*
        Boolean aBoolean = getUser(userId).map(user -> {
            repositorio.delete(user);
            return true;
        }).orElse(false);
        return aBoolean;*/
    }
    
    public boolean emailExist(String email) {
        Optional <User> user = userCrudRepository.findByEmail(email);
        return !user.isEmpty();
    }

    public Optional <User> autenticateUser(String email, String password) {
        return userCrudRepository.findByEmailAndPassword(email, password);

    }
    
    public Optional<User> lastUserId(){
        return userCrudRepository.findTopByOrderByIdDesc();
    }

}
