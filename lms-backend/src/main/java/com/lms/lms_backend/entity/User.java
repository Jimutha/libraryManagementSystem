package com.lms.lms_backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    // Maps the Java Enum to the MySQL ENUM string
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    private boolean isBlacklisted;

    // --- Getters and Setters ---

    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public Role getRole() {
        return role;
    }
    public void setRole(Role role) {
        this.role = role;
    }
    public boolean isBlacklisted() {
        return isBlacklisted;
    }
    public void setBlacklisted(boolean blacklisted) {
        isBlacklisted = blacklisted;
    }
}