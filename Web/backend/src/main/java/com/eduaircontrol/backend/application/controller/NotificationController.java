package com.eduaircontrol.backend.application.controller;

import com.eduaircontrol.backend.core.observer.TemperatureSubject;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/test")
@RequiredArgsConstructor
public class NotificationController {
    private final TemperatureSubject temperatureSubject;
    
    @PostMapping("/temperature/{value}")
    public String test(@PathVariable double value){
        temperatureSubject.CheckTemperature(value);
        return "Temperatura procesada";
    }
}
