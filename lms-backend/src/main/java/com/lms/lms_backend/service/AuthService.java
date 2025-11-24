package com.lms.lms_backend.service;

// IMPORTANT: These imports now point to your 'DataTransferObjects' folder
import com.lms.lms_backend.DataTransferObjects.AuthRequest;
import com.lms.lms_backend.DataTransferObjects.AuthResponse;
import com.lms.lms_backend.DataTransferObjects.RegisterRequest;

import com.lms.lms_backend.entity.Role;
import com.lms.lms_backend.entity.User;
import com.lms.lms_backend.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository repository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    // Register a new user
    public AuthResponse register(RegisterRequest request) {
        User user = new User();
        user.setEmail(request.getEmail());
        // Encode the password before saving!
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        // Default to USER if no role is provided
        user.setRole(request.getRole() != null ? request.getRole() : Role.USER);
        user.setBlacklisted(false);

        repository.save(user); // Save to MySQL
        
        // Generate a token for the new user immediately
        String jwtToken = jwtService.generateToken(user);
        return new AuthResponse(jwtToken);
    }

    // Login an existing user
    public AuthResponse authenticate(AuthRequest request) {
        // This line does the heavy lifting: checks username and password
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        
        // If we get here, the user is valid. Find them and generate a token.
        User user = repository.findByEmail(request.getEmail()).orElseThrow();
        String jwtToken = jwtService.generateToken(user);
        return new AuthResponse(jwtToken);
    }
}