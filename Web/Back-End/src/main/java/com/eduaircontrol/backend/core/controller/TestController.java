package com.eduaircontrol.backend.core.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class TestController{
    @GetMapping("/test")
    public String test(){
        return "Funcionaaa :D";
    }
    @GetMapping("/user")
    public String user() {
        return "Solo usuarios";
    }

    @GetMapping("/admin")
    public String admin() {
        return "Solo admin";
    }
}
