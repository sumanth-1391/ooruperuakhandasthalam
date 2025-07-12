package com.ismartsumancreations.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*")
public class ContactController {

    @Autowired
    private JavaMailSender mailSender;

    @PostMapping
    public String sendContactEmail(@RequestBody ContactForm contactForm) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(contactForm.getEmail());
            message.setSubject("Thank you for contacting ISMART SUMAN CREATIONS");
            message.setText("Dear " + contactForm.getName() + ",\n\n" +
                    "Thank you for reaching out. We have received your message:\n\n" +
                    contactForm.getMessage() + "\n\n" +
                    "We will get back to you shortly.\n\n" +
                    "Best regards,\nISMART SUMAN CREATIONS Team");

            mailSender.send(message);
            return "Email sent successfully";
        } catch (Exception e) {
            return "Error sending email: " + e.getMessage();
        }
    }
}

class ContactForm {
    private String name;
    private String email;
    private String message;

    // Getters and setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
