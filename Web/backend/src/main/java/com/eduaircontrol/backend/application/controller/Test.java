package com.eduaircontrol.backend.application.controller;

import com.eduaircontrol.backend.application.dto.LoginRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
@RequiredArgsConstructor
public class Test {
    
    
    @GetMapping("/test")
    public String test(){
        return "Contenido";
    }
}
