package com.lms.lms_backend.controller;

import com.lms.lms_backend.entity.Book;
import com.lms.lms_backend.repository.BookRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookRepository bookRepository;

    public BookController(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @GetMapping
    public List<Book> getAllBooks(@RequestParam(required = false) String search,
                                  @RequestParam(required = false) String category) {
        if (category != null) {
            return bookRepository.findByCategoryName(category);
        } else if (search != null) {
            return bookRepository.searchBooks(search);
        }
        return bookRepository.findAll();
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('LIBRARIAN')")
    public Book addBook(@RequestBody Book book) {
        return bookRepository.save(book);
    }
}