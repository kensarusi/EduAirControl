package com.eduaircontrol.backend.core.observer;

import org.springframework.stereotype.Component;

@Component
public class EmailNotificationObserver implements Observer{

    @Override
    public void update(String message) {
        System.out.println("Enviar email");
    }
}
