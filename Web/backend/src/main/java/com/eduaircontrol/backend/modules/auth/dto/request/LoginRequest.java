package com.eduaircontrol.backend.modules.auth.dto.request;

import lombok.*;

@Getter
@Setter
public class LoginRequest {
    private String email;
    private String password;
}
