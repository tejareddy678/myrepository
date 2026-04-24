package com.example.order;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private InventoryClient inventoryClient;

    @GetMapping("/place")
    @CircuitBreaker(name = "inventory", fallbackMethod = "fallbackPlaceOrder")
    public Map<String, Object> placeOrder(@RequestParam String code) {
        Map<String, Object> response = new HashMap<>();
        
        // Calling inventory service via Feign Client
        Map<String, Object> inventoryResponse = inventoryClient.getStock(code);
        Boolean inStock = (Boolean) inventoryResponse.get("inStock");

        if (inStock != null && inStock) {
            response.put("status", "SUCCESS");
            response.put("message", "Order placed successfully for " + code);
        } else {
            response.put("status", "FAILED");
            response.put("message", "Item out of stock: " + code);
        }
        response.put("inventoryData", inventoryResponse);
        
        return response;
    }

    // Fallback method for Circuit Breaker
    public Map<String, Object> fallbackPlaceOrder(String code, Throwable t) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "FALLBACK");
        response.put("message", "Inventory Service is currently unavailable or busy. Please try again later.");
        response.put("productCode", code);
        response.put("errorType", t.getClass().getSimpleName());
        return response;
    }
}
