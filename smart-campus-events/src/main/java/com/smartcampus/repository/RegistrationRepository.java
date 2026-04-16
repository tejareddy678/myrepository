package com.smartcampus.repository;

import com.smartcampus.entity.Registration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RegistrationRepository extends JpaRepository<Registration, Long> {
    
    List<Registration> findByEventId(Long eventId);
    
    List<Registration> findByStudentEmail(String email);
    
    long countByEventId(Long eventId);

    @Query("SELECT r.event.title as eventTitle, COUNT(r) as count FROM Registration r GROUP BY r.event.id, r.event.title")
    List<Object[]> countRegistrationsByEvent();
}
