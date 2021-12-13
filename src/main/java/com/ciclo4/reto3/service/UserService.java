package com.ciclo4.reto3.service;

import com.ciclo4.reto3.model.User;
import com.ciclo4.reto3.repository.UserRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Jorge Quesada
 */
@Service
public class UserService {
    @Autowired
    private UserRepository userRepositorio;
    
    public List<User> getAll() {
        return userRepositorio.getAll();
    }
    
    public Optional<User> getUser(int id) {
        return userRepositorio.getUser(id);
    }

    public boolean emailExist(String email) {
        return userRepositorio.emailExist(email);
    }

    public User autenticateUser(String email, String password) {
        Optional<User> user = userRepositorio.autenticateUser(email, password);

        if (user.isEmpty()) {
            return new User();
        } else {
            return user.get();
        }
    }

    public User create(User user){ 
        //obtiene el maximo id existente ne la coleccion
        Optional<User> userIdMaximo = userRepositorio.lastUserId();
        // Si el id del Usuario que se recibe como parametro es nulo, entonces valida el maximo id
        if (user.getId() == null) {
            //Valida el maximo Id generado, si no hay ninguno aun el primer Id sera 1
            if (userIdMaximo.isEmpty()) {
                user.setId(1);
            }else {
                user.setId(userIdMaximo.get().getId()+ 1);
            }
            return user;
        } else {
            Optional<User> e = userRepositorio.getUser(user.getId());
            if (e.isEmpty()) {
                if (emailExist(user.getEmail()) == false) {
                    return userRepositorio.create(user);
                } else {
                    return user;
                }
            } else {
                return user;
            }
        }
    }

    public User update(User user) {

        if (user.getId() != null) {
            Optional<User> userDb = userRepositorio.getUser(user.getId());
            if (!userDb.isEmpty()) {
                if (user.getIdentification() != null) {
                    userDb.get().setIdentification(user.getIdentification());
                }
                if (user.getName() != null) {
                    userDb.get().setName(user.getName());
                }
                if (user.getAddress() != null) {
                    userDb.get().setAddress(user.getAddress());
                }
                if (user.getCellPhone() != null) {
                    userDb.get().setCellPhone(user.getCellPhone());
                }
                if (user.getEmail() != null) {
                    userDb.get().setEmail(user.getEmail());
                }
                if (user.getPassword() != null) {
                    userDb.get().setPassword(user.getPassword());
                }
                if (user.getZone() != null) {
                    userDb.get().setZone(user.getZone());
                }
                userRepositorio.update(userDb.get());
                return userDb.get();
            } else {
                return user;
            }
        } else {
            return user;
        }
    }

    public boolean delete(int userId) {
        /*Optional<User> usuario = getUser(userId);
        
        if (usuario.isEmpty()){
            return false;
        }else{
            userRepositorio.delete(usuario.get());
            return true;
        }
        */
        Boolean aBoolean = getUser(userId).map(user -> {
            userRepositorio.delete(user);
            return true;
        }).orElse(false);
        return aBoolean;
    }
}
