package com.eduaircontrol.backend.core.controller;

import com.eduaircontrol.backend.core.domain.Users;
import com.eduaircontrol.backend.core.dto.LoginRequest;
import com.eduaircontrol.backend.core.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
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
    
    @PostMapping("/register")
    public Users regiter(@RequestBody Users users){
        return userService.register(users);
    }
    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request){
        return userService.login(request.getEmail(), request.getPassword());
    }
}
