package com.eduaircontrol.backend.core.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Data
public class RegisterRequest {
    private String name;
    private String email;
    private String password;
}
