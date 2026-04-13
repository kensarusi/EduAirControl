package com.eduaircontrol.backend.core.service;

import com.eduaircontrol.backend.core.domain.Users;
import com.eduaircontrol.backend.core.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    
    public Users register(Users users){
        
        //Encriptar la contraseña
        users.setPassword(passwordEncoder.encode(users.getPassword()));
        return userRepository.save(users);
    }
    
    public Users login(String email, String password){
        Users users =  userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));//Si no encuentra el ususario por el email marca error
        if (!passwordEncoder.matches(password, users.getPassword())) {
            throw new RuntimeException ("Contraseña incorrecta");//Si encuentra el usuario pero la contraseña es incorrecta marca error
        }
        return users;//Devuelve los datos de usuario si lo encuentra y coincide la contraseña
    }
}
