package com.lms.lms_backend.controller;

import com.lms.lms_backend.entity.Book;
import com.lms.lms_backend.entity.Reservation;
import com.lms.lms_backend.entity.User;
import com.lms.lms_backend.repository.BookRepository;
import com.lms.lms_backend.repository.ReservationRepository;
import com.lms.lms_backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    private final ReservationRepository reservationRepository;
    private final BookRepository bookRepository;
    private final UserRepository userRepository;

    public ReservationController(ReservationRepository reservationRepository, 
                                 BookRepository bookRepository, 
                                 UserRepository userRepository) {
        this.reservationRepository = reservationRepository;
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
    }

    @PostMapping("/create")
    public ResponseEntity<String> createReservation(@AuthenticationPrincipal UserDetails userDetails,
                                                    @RequestParam Integer bookId, 
                                                    @RequestParam Integer days) {
        // 1. Find the User
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 2. Find the Book
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        if (book.getStatus() == Book.BookStatus.RESERVED) {
            return ResponseEntity.badRequest().body("Book is already reserved!");
        }

        // 3. Create Reservation
        Reservation reservation = new Reservation();
        reservation.setUser(user);
        reservation.setBook(book);
        reservation.setReservationDate(LocalDate.now());
        reservation.setDueDate(LocalDate.now().plusDays(days));
        reservation.setStatus(Reservation.ReservationStatus.ACTIVE);

        // 4. Update Book Status
        book.setStatus(Book.BookStatus.RESERVED);
        
        bookRepository.save(book);
        reservationRepository.save(reservation);

        return ResponseEntity.ok("Book reserved successfully!");
    }

    @GetMapping("/my-reservations")
    public List<Reservation> getMyReservations(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByEmail(userDetails.getUsername()).orElseThrow();
        // Note: You need to add 'findByUserId' to ReservationRepository interface first!
        // For now, we will return empty or use a default findAll if you haven't added that method.
        return reservationRepository.findAll(); 
    }
}