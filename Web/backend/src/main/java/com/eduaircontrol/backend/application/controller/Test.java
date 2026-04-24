package com.eduaircontrol.backend.application.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class Test {
    @GetMapping("/test")
    public String test(){
        return "Contenido";
    }
}
