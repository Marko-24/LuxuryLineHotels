package com.marko.luxurylinehotelsbe.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
    @GetMapping("/")
    public String index() {
        return "Welcome to Luxury Line Hotels!";
    }
}