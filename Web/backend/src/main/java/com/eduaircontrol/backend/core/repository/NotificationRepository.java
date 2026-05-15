package com.eduaircontrol.backend.core.repository;

import com.eduaircontrol.backend.core.domain.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long>{
    
}
