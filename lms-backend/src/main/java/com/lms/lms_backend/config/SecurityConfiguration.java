package com.lms.lms_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    public SecurityConfiguration(JwtAuthenticationFilter jwtAuthFilter, AuthenticationProvider authenticationProvider) {
        this.jwtAuthFilter = jwtAuthFilter;
        this.authenticationProvider = authenticationProvider;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // 1. Disable CSRF (Cross-Site Request Forgery) 
            // Not needed for stateless JWT APIs
            .csrf(csrf -> csrf.disable())

            // 2. Set Permissions on Endpoints
            .authorizeHttpRequests(auth -> auth
                // Allow everyone to access the Auth Controller (Login/Register)
                // This matches the path in your AuthController (@RequestMapping)
                .requestMatchers("/api/v1/auth/**").permitAll()
                
                // Any other request requires a valid JWT token
                .anyRequest().authenticated()
            )

            // 3. Stateless Session Management
            // We don't want Spring to create a session cookie. We want it to check the JWT every time.
            .sessionManagement(sess -> sess
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            // 4. Set our custom Authentication Provider (Database User Lookup)
            .authenticationProvider(authenticationProvider)

            // 5. Add our JWT Filter before the standard username/password filter
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}