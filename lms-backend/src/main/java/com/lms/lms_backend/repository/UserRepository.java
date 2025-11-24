package com.lms.lms_backend.repository;

import com.lms.lms_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    // Magic method: Spring figures out the SQL just from the name "findByEmail"!
    Optional<User> findByEmail(String email);
}