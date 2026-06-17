package com.eduaircontrol.backend.core.service;

import com.eduaircontrol.backend.application.dto.LoginRequest;
import com.eduaircontrol.backend.application.dto.RegisterRequest;
import com.eduaircontrol.backend.core.domain.Role;
import com.eduaircontrol.backend.core.domain.Users;
import com.eduaircontrol.backend.core.repository.UserRepository;
import com.eduaircontrol.backend.security.JwtService;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    
    public Users register(RegisterRequest request){
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("El correo ya esta registrado");
        }
        Users user = Users.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        return userRepository.save(user);
    }
    public String login(LoginRequest request){
        Users user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado"));

    if (user.getPassword() == null || !passwordEncoder.matches(request.getPassword(), user.getPassword())) {
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Contraseña incorrecta");
    }

    return jwtService.generateToken(user);
}

    public String loginWithGoogle(OAuth2User oAuth2User) {
        String googleId = oAuth2User.getAttribute("sub");
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");

        if (googleId == null || email == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Google no retorno los datos requeridos");
        }

        Users user = userRepository.findByGoogleId(googleId)
                .or(() -> userRepository.findByEmail(email).map(existingUser -> {
                    existingUser.setGoogleId(googleId);
                    if (existingUser.getName() == null || existingUser.getName().isBlank()) {
                        existingUser.setName(name != null ? name : email);
                    }
                    return userRepository.save(existingUser);
                }))
                .orElseGet(() -> userRepository.save(Users.builder()
                        .name(name != null ? name : email)
                        .email(email)
                        .password(passwordEncoder.encode(UUID.randomUUID().toString()))
                        .googleId(googleId)
                        .role(Role.USER)
                        .build()));

        return jwtService.generateToken(user);
    }
}
