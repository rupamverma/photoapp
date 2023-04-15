package com.codeflow.security.service;

import com.codeflow.security.config.JwtService;
import com.codeflow.security.dto.AuthenticationRequest;
import com.codeflow.security.dto.AuthenticationResponse;
import com.codeflow.security.dto.RegisterRequest;
import com.codeflow.security.entity.User;
import com.codeflow.security.enumuration.Role;
import com.codeflow.security.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.var;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;
    public AuthenticationResponse register(RegisterRequest registeredRequest) {
      var user = User
              .builder()
              .firstName(registeredRequest.getFirstName())
              .lastName(registeredRequest.getLastName())
              .email(registeredRequest.getEmail())
              .password(passwordEncoder.encode(registeredRequest.getPassword()))
              .role(Role.USER)
              .build();
      userRepository.save(user);
      var jwtToken = jwtService.generateToken(user);
      return AuthenticationResponse
              .builder()
              .token(jwtToken)
              .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest registeredRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        registeredRequest.getEmail(),
                        registeredRequest.getPassword()
                )
        );
        var user = userRepository.findByEmail(registeredRequest.getEmail());
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse
                .builder()
                .token(jwtToken)
                .build();
    }
}
