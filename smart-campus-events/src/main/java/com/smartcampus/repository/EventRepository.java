package com.smartcampus.repository;

import com.smartcampus.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    
    List<Event> findByDepartment(String department);
    
    List<Event> findByType(String type);
    
    List<Event> findByEventDateAfter(LocalDateTime date);
    
    @Query("SELECT e.department as department, COUNT(e) as count FROM Event e GROUP BY e.department")
    List<Object[]> countEventsByDepartment();

    @Query("SELECT e.type as type, COUNT(e) as count FROM Event e GROUP BY e.type")
    List<Object[]> countEventsByType();
}
