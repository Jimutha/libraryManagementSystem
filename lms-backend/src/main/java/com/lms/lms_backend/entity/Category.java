package com.lms.lms_backend.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "categories")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true, nullable = false)
    private String name;

    // One Category has Many Books
    // This tells Spring: "Go look at the 'category' field in the Book class to find the link"
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private List<Book> books;

    // --- Getters and Setters ---

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}