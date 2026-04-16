package com.example.employee.controller;

import com.example.employee.model.Employee;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Arrays;
import java.util.List;

@Controller
public class EmployeeController {

    // Mock data
    private final List<Employee> employees = Arrays.asList(
            new Employee(101, "Alice Johnson", "Senior Architect", "Engineering", "alice@example.com", 125000),
            new Employee(102, "Bob Smith", "UX Designer", "Design", "bob@example.com", 95000),
            new Employee(103, "Charlie Davis", "Product Manager", "Products", "charlie@example.com", 110000),
            new Employee(104, "Diana Prince", "Security Specialist", "Security", "diana@example.com", 130000),
            new Employee(105, "Ethan Hunt", "DevOps Engineer", "Infrastructure", "ethan@example.com", 115000)
    );

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping("/employees")
    public String listEmployees(Model model) {
        model.addAttribute("employees", employees);
        return "employee-list";
    }

    @GetMapping("/employees/{id}")
    public String employeeDetails(@PathVariable int id, Model model) {
        Employee employee = employees.stream()
                .filter(e -> e.getId() == id)
                .findFirst()
                .orElse(null);
        model.addAttribute("employee", employee);
        return "employee-details";
    }
}
