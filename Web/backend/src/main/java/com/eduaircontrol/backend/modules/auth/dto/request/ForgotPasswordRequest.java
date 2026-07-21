package com.eduaircontrol.backend.modules.auth.dto.request;

import lombok.Data;

@Data
public class ForgotPasswordRequest {
    private String email;
}
