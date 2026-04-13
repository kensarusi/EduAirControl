package com.eduaircontrol.backend.security;

import com.eduaircontrol.backend.core.domain.Users;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secretKey;//Clave secreta que firma el token

    @Value("${jwt.expiration}")
    private long expiration;//En  aplication service esta el valor de esta variable

    
    //Este metodo transforma la SecretKey en una clave criptografica
    private Key getSignInKey() {
        return Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
    }
    
    //Este metodo genera el token
    public String generateToken(Users users) {
        //Aca se construlle el token
        return Jwts.builder()
                .setSubject(users.getEmail())//Guarda el email
                .claim("role", users.getRole())
                .setIssuedAt(new Date())//Genera la fecha de creacion
                .setExpiration(new Date(System.currentTimeMillis() + expiration))//Da el tiempo de expiracion
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)//Aca se firma con la clave secreta
                .compact();//Lo convierte todo en un string
    }
     //Este metodo extrae el email del token
    public String extractEmail(String token){
        return extractAllClaims(token).getSubject();
    }
    //Este metodo lee el token
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    String extractRole(String token) {
        return extractAllClaims(token).get("role", String.class);
    }
}