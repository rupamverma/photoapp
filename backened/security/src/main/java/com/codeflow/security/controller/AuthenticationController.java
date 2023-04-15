package com.codeflow.security.controller;

import com.codeflow.security.dto.AuthenticationRequest;
import com.codeflow.security.dto.AuthenticationResponse;
import com.codeflow.security.dto.RegisterRequest;
import com.codeflow.security.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest registeredRequest
    ){
       return ResponseEntity.ok(authenticationService.register(registeredRequest));
    }
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody AuthenticationRequest registeredRequest
    ){
        return ResponseEntity.ok(authenticationService.authenticate(registeredRequest));
    }
}
