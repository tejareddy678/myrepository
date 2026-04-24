package com.example.order;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Map;

@FeignClient(name = "inventory-service")
public interface InventoryClient {

    @GetMapping("/inventory/{productCode}")
    Map<String, Object> getStock(@PathVariable("productCode") String productCode);
}
