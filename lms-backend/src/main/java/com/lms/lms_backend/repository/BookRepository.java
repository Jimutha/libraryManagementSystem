package com.lms.lms_backend.repository;

import com.lms.lms_backend.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface BookRepository extends JpaRepository<Book, Integer> {
    
    // Custom query to search by Title OR Author OR Genre
    @Query("SELECT b FROM Book b WHERE " +
           "(:query IS NULL OR LOWER(b.title) LIKE LOWER(CONCAT('%', :query, '%'))) OR " +
           "(:query IS NULL OR LOWER(b.author) LIKE LOWER(CONCAT('%', :query, '%'))) OR " +
           "(:query IS NULL OR LOWER(b.genre) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<Book> searchBooks(@Param("query") String query);

    List<Book> findByCategoryName(String categoryName);
}