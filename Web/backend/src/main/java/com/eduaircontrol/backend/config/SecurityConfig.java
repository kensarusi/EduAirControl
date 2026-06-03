package com.eduaircontrol.backend.config;

import com.eduaircontrol.backend.security.JwtAuthFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig {
    
    private final JwtAuthFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        
        return httpSecurity
                .authorizeHttpRequests(request ->{
                    request.requestMatchers(HttpMethod.GET,"/").permitAll();
                    request.anyRequest().authenticated();
                })
                .formLogin(Customizer.withDefaults())
                .oauth2Login(Customizer.withDefaults())
                .build();
        
        
        
        
        
        
        
        
        
        
        
        
        
        // http
        //     .csrf(csrf -> csrf.disable())
        //     .authorizeHttpRequests(auth -> auth
        //         .requestMatchers("/test").hasRole("USER")
        //         .requestMatchers("/user/**").hasRole("USER")
        //         .requestMatchers("/admin/**").hasRole("ADMIN")
        //         .requestMatchers(
        //             "/auth/**",
        //             "/v3/api-docs/**",
        //             "/swagger-ui/**",
        //             "/swager-ui.html")
        //             .permitAll()
        //             .anyRequest().authenticated()
        //     )
        //     .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);//Antes de que valide el usuario ejecuta el filtro jwt
        
        // return http.build();
    }
}