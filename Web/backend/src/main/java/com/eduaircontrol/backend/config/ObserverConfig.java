package com.eduaircontrol.backend.config;

import com.eduaircontrol.backend.core.observer.EmailNotificationObserver;
import com.eduaircontrol.backend.core.observer.SystemNotificationObserver;
import com.eduaircontrol.backend.core.observer.TemperatureSubject;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;


@Configuration
@RequiredArgsConstructor
public class ObserverConfig {
    private final TemperatureSubject temperaturaSubject;
    private final EmailNotificationObserver emailObserver;
    private final SystemNotificationObserver systemObserver;
    
    @PostConstruct
    public void init(){
        temperaturaSubject.addObserver(emailObserver);
        temperaturaSubject.addObserver(systemObserver);
    }
}
