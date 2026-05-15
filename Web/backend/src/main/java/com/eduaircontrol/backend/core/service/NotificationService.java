package com.eduaircontrol.backend.core.service;

import com.eduaircontrol.backend.core.domain.Notification;
import com.eduaircontrol.backend.core.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;
    
    public void saveNotification(String message){
        Notification notification = new Notification();
        notification.setTittle("asdad");
        
        notificationRepository.save(notification);
    }
}
