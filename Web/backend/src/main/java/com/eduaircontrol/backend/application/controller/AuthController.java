package com.eduaircontrol.backend.application.controller;

import com.eduaircontrol.backend.application.dto.AuthResponse;
import com.eduaircontrol.backend.application.dto.LoginRequest;
import com.eduaircontrol.backend.application.dto.RegisterRequest;
import com.eduaircontrol.backend.core.domain.Users;
import com.eduaircontrol.backend.core.service.UserService;
import com.eduaircontrol.backend.security.JwtService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;
    
    //Registro
    @PostMapping("/register")
    public AuthResponse register(@Valid @RequestBody RegisterRequest request){
        return userService.register(request);
    }
    
    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest request){
        return userService.login(request);
    }
}
