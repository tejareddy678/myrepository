package com.smartcampus.service;

import com.smartcampus.entity.Event;
import com.smartcampus.entity.Registration;
import com.smartcampus.repository.RegistrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RegistrationService {

    @Autowired
    private RegistrationRepository registrationRepository;

    @Autowired
    private EventService eventService;

    public Registration registerStudent(Long eventId, Registration registration) {
        Event event = eventService.getEventById(eventId);
        
        long currentRegistrations = registrationRepository.countByEventId(eventId);
        if (currentRegistrations >= event.getCapacity()) {
            throw new RuntimeException("Event is already full!");
        }
        
        registration.setEvent(event);
        return registrationRepository.save(registration);
    }

    public List<Registration> getEventRegistrations(Long eventId) {
        return registrationRepository.findByEventId(eventId);
    }

    public List<Registration> getAllRegistrations() {
        return registrationRepository.findAll();
    }

    public Map<String, Long> getRegistrationStats() {
        List<Object[]> results = registrationRepository.countRegistrationsByEvent();
        Map<String, Long> stats = new HashMap<>();
        for (Object[] result : results) {
            stats.put((String) result[0], (Long) result[1]);
        }
        return stats;
    }
}
