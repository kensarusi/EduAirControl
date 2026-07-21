package com.eduaircontrol.backend.modules.auth.dto.request;

import lombok.Data;

@Data
public class VerifyCodeRequest {
    private String email;
    private String code;
}