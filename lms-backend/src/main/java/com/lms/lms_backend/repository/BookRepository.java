package com.lms.lms_backend.repository;

import com.lms.lms_backend.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Integer> {
    // This gives us magic methods like bookRepository.save(book)
}