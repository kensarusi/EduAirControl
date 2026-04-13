package com.eduaircontrol.backend.core.controller;

import com.eduaircontrol.backend.core.domain.Users;
import com.eduaircontrol.backend.core.dto.LoginRequest;
import com.eduaircontrol.backend.core.dto.RegisterRequest;
import com.eduaircontrol.backend.core.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/auth")
public class UserController {
    private final UserService userService;
    
    public UserController(UserService userService){
        this.userService = userService;
    }
    
    @Operation(summary = "Registrar Usuario")
    @PostMapping("/register")
    public Users regiter(@RequestBody RegisterRequest request){
        Users users = new Users();
        users.setName(request.getName());
        users.setEmail(request.getEmail());
        users.setPassword(request.getPassword());
        
        return userService.register(users);
    }
    @Operation(summary = "Iniciar sesion")
    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request){
        return userService.login(request.getEmail(), request.getPassword());
    }
}
