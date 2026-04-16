package com.smartcampus.controller;

import com.smartcampus.entity.Registration;
import com.smartcampus.service.RegistrationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/register")
public class RegistrationController {

    @Autowired
    private RegistrationService registrationService;

    @GetMapping("/{eventId}")
    public String showRegistrationForm(@PathVariable Long eventId, Model model) {
        Registration registration = new Registration();
        model.addAttribute("registration", registration);
        model.addAttribute("eventId", eventId);
        return "registration-form";
    }

    @PostMapping("/{eventId}")
    public String registerStudent(@PathVariable Long eventId, 
                                 @Valid @ModelAttribute Registration registration, 
                                 BindingResult result, 
                                 Model model) {
        if (result.hasErrors()) {
            model.addAttribute("eventId", eventId);
            return "registration-form";
        }
        try {
            registrationService.registerStudent(eventId, registration);
            return "redirect:/register/success";
        } catch (RuntimeException e) {
            model.addAttribute("error", e.getMessage());
            model.addAttribute("eventId", eventId);
            return "registration-form";
        }
    }

    @GetMapping("/success")
    public String success() {
        return "registration-success";
    }
}
