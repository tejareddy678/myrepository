package com.smartcampus.config;

import com.smartcampus.entity.Event;
import com.smartcampus.repository.EventRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initData(EventRepository eventRepository) {
        return args -> {
            if (eventRepository.count() == 0) {
                eventRepository.save(new Event(null, "AI & Machine Learning Symposium", 
                    "Join us for a deep dive into the future of Artificial Intelligence with industry experts.", 
                    LocalDateTime.now().plusDays(10), "Computer Science", "Seminar", 100, "Auditorium A", null));
                
                eventRepository.save(new Event(null, "Web Development Bootcamp", 
                    "Full-day hands-on workshop on building modern web applications with Spring Boot and React.", 
                    LocalDateTime.now().plusDays(15), "Computer Science", "Workshop", 50, "Lab 302", null));
                
                eventRepository.save(new Event(null, "Annual Cultural Fest 2024", 
                    "A celebration of art, music, and dance across the campus community.", 
                    LocalDateTime.now().plusDays(30), "Arts & Science", "Cultural", 500, "Campus Ground", null));
                
                eventRepository.save(new Event(null, "Renewable Energy Seminar", 
                    "Exploring sustainable energy solutions and the future of the power grid.", 
                    LocalDateTime.now().plusDays(20), "Electrical", "Seminar", 120, "Conference Hall B", null));
            }
        };
    }
}
