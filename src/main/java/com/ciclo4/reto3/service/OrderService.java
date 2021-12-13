package com.ciclo4.reto3.service;

import com.ciclo4.reto3.model.Order;
import com.ciclo4.reto3.repository.OrderRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Jorge Quesada
 */
@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;
    
    public List<Order> getAll() {
        return orderRepository.getAll();
    }
    
    public Optional<Order> getOrder(int id) {
        return orderRepository.getOrder(id);
    }


    public Order create(Order order){ 
        //obtiene el maximo id existente ne la coleccion
        Optional<Order> orderIdMaximo = orderRepository.lastOrderId();
        // Si el id del Usuario que se recibe como parametro es nulo, entonces valida el maximo id
        if (order.getId() == null) {
            //Valida el maximo Id generado, si no hay ninguno aun el primer Id sera 1
            if (orderIdMaximo.isEmpty()) {
                order.setId(1);
            }else {
                order.setId(orderIdMaximo.get().getId()+ 1);
            }
        }
        Optional<Order> e = orderRepository.getOrder(order.getId());
        if (e.isEmpty()) {
            return orderRepository.create(order);
        } else {
            return order;
        }
    }

    public Order update(Order order) {

        if (order.getId() != null) {
            Optional<Order> orderDb = orderRepository.getOrder(order.getId());
            if (!orderDb.isEmpty()) {
                if (order.getStatus()!= null) {
                    orderDb.get().setStatus(order.getStatus());
                }
                orderRepository.update(orderDb.get());
                return orderDb.get();
            } else {
                return order;
            }
        } else {
            return order;
        }
    }

    public boolean delete(int orderId) {
        /*Optional<User> usuario = getUser(userId);
        
        if (usuario.isEmpty()){
            return false;
        }else{
            userRepositorio.delete(usuario.get());
            return true;
        }
        */
        Boolean aBoolean = getOrder(orderId).map(order -> {
            orderRepository.delete(order);
            return true;
        }).orElse(false);
        return aBoolean;
    }
    
    public List<Order> finByZone(String zona) {
        return orderRepository.finByZone(zona);
    }
}
