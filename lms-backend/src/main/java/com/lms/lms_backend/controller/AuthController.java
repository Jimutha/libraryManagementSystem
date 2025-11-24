package com.lms.lms_backend.controller;

// IMPORTANT: Updated imports for your folder name
import com.lms.lms_backend.DataTransferObjects.AuthRequest;
import com.lms.lms_backend.DataTransferObjects.AuthResponse;
import com.lms.lms_backend.DataTransferObjects.RegisterRequest;

import com.lms.lms_backend.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService service;

    public AuthController(AuthService service) {
        this.service = service;
    }

    // Endpoint: POST /api/v1/auth/register
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(service.register(request));
    }

    // Endpoint: POST /api/v1/auth/login
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> authenticate(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(service.authenticate(request));
    }
}