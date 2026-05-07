package com.eduaircontrol.backend.application.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class Test {
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin")
    public String admin(){
        return "Only admin";
    }
    
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @GetMapping("/user")
    public String user(){
        return "Users and admin";
    }
    
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/profile")
    public String profile(){
        return "Profile";
    }
}
