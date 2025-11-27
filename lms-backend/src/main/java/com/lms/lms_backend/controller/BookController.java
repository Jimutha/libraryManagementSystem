package com.lms.lms_backend.controller;

import com.lms.lms_backend.entity.Book;
import com.lms.lms_backend.entity.Category;
import com.lms.lms_backend.repository.BookRepository;
import com.lms.lms_backend.repository.CategoryRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/books")
@CrossOrigin(origins = "http://localhost:3000")
public class BookController {

    private final BookRepository bookRepository;
    private final CategoryRepository categoryRepository;

    public BookController(BookRepository bookRepository, CategoryRepository categoryRepository) {
        this.bookRepository = bookRepository;
        this.categoryRepository = categoryRepository;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Book>> getAllBooks() {
        return ResponseEntity.ok(bookRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Integer id) {
        return bookRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // --- NEW: Add Book Endpoint ---
    @PostMapping("/add")
    public ResponseEntity<?> addBook(@RequestBody Map<String, Object> payload) {
        try {
            Book book = new Book();
            book.setTitle((String) payload.get("title"));
            book.setAuthor((String) payload.get("author"));

            // Handle Category (Simple version: Look up by ID or create dummy)
            // Ideally, you'd send category_id from frontend. 
            // For now, we'll try to find a category if provided, or default to null.
            if (payload.containsKey("categoryId")) {
               Integer catId = Integer.parseInt(payload.get("categoryId").toString());
               Category category = categoryRepository.findById(catId).orElse(null);
               book.setCategory(category);
            }

            return ResponseEntity.ok(bookRepository.save(book));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error adding book: " + e.getMessage());
        }
    }
}