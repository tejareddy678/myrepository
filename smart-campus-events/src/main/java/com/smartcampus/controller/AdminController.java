package com.smartcampus.controller;

import com.smartcampus.entity.Event;
import com.smartcampus.service.EventService;
import com.smartcampus.service.RegistrationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private EventService eventService;

    @Autowired
    private RegistrationService registrationService;

    @GetMapping("/dashboard")
    public String dashboard(Model model) {
        model.addAttribute("events", eventService.getAllEvents());
        model.addAttribute("deptStats", eventService.getDepartmentStats());
        model.addAttribute("registrationStats", registrationService.getRegistrationStats());
        return "admin/dashboard";
    }

    @GetMapping("/events/new")
    public String showAddForm(Model model) {
        model.addAttribute("event", new Event());
        return "admin/event-form";
    }

    @PostMapping("/events/save")
    public String saveEvent(@Valid @ModelAttribute Event event, BindingResult result) {
        if (result.hasErrors()) {
            return "admin/event-form";
        }
        eventService.saveEvent(event);
        return "redirect:/admin/dashboard";
    }

    @GetMapping("/events/edit/{id}")
    public String showEditForm(@PathVariable Long id, Model model) {
        model.addAttribute("event", eventService.getEventById(id));
        return "admin/event-form";
    }

    @GetMapping("/events/delete/{id}")
    public String deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
        return "redirect:/admin/dashboard";
    }

    @GetMapping("/events/{id}/registrations")
    public String viewRegistrations(@PathVariable Long id, Model model) {
        model.addAttribute("event", eventService.getEventById(id));
        model.addAttribute("registrations", registrationService.getEventRegistrations(id));
        return "admin/registrations";
    }

    @GetMapping("/registrations")
    public String viewAllRegistrations(Model model) {
        model.addAttribute("registrations", registrationService.getAllRegistrations());
        return "admin/all-registrations";
    }
}
