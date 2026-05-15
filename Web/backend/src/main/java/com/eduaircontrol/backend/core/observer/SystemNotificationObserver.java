package com.eduaircontrol.backend.core.observer;

import com.eduaircontrol.backend.core.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SystemNotificationObserver implements Observer{
    private final NotificationService notificationService;

    @Override
    public void update(String message) {
        notificationService.saveNotification(message);
    }
}
