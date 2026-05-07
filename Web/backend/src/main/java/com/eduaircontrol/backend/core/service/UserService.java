package com.eduaircontrol.backend.core.service;

import com.eduaircontrol.backend.application.dto.AuthResponse;
import com.eduaircontrol.backend.application.dto.LoginRequest;
import com.eduaircontrol.backend.application.dto.RegisterRequest;
import com.eduaircontrol.backend.core.domain.Role;
import com.eduaircontrol.backend.core.domain.Users;
import com.eduaircontrol.backend.core.repository.UserRepository;
import com.eduaircontrol.backend.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    
    public AuthResponse register(RegisterRequest request){
        Users user = new Users();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);
        
        userRepository.save(user);
        
        String token = jwtService.generateToken(user);
        return new AuthResponse(token);
    }
    public AuthResponse login(LoginRequest request){
        Users user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

    if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
        throw new RuntimeException("Contraseña incorrecta");
    }

    String token = jwtService.generateToken(user);
    
    return new AuthResponse(token);
}
}

