package com.smartcampus.service;

import com.smartcampus.entity.Event;
import com.smartcampus.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Event getEventById(Long id) {
        return eventRepository.findById(id).orElseThrow(() -> new RuntimeException("Event not found with id: " + id));
    }

    public Event saveEvent(Event event) {
        return eventRepository.save(event);
    }

    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }

    public List<Event> filterEvents(String department, String type) {
        if (department != null && !department.isEmpty() && type != null && !type.isEmpty()) {
            return eventRepository.findByDepartment(department).stream()
                    .filter(e -> e.getType().equalsIgnoreCase(type))
                    .collect(Collectors.toList());
        } else if (department != null && !department.isEmpty()) {
            return eventRepository.findByDepartment(department);
        } else if (type != null && !type.isEmpty()) {
            return eventRepository.findByType(type);
        }
        return eventRepository.findAll();
    }

    public Map<String, Long> getDepartmentStats() {
        List<Object[]> results = eventRepository.countEventsByDepartment();
        Map<String, Long> stats = new HashMap<>();
        for (Object[] result : results) {
            stats.put((String) result[0], (Long) result[1]);
        }
        return stats;
    }
}
