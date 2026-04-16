package com.smartcampus.controller;

import com.smartcampus.entity.Event;
import com.smartcampus.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class EventController {

    @Autowired
    private EventService eventService;

    @GetMapping("/")
    public String index(Model model, 
                        @RequestParam(required = false) String department,
                        @RequestParam(required = false) String type) {
        model.addAttribute("events", eventService.filterEvents(department, type));
        return "index";
    }

    @GetMapping("/events/{id}")
    public String eventDetails(@PathVariable Long id, Model model) {
        model.addAttribute("event", eventService.getEventById(id));
        return "event-details";
    }
}
