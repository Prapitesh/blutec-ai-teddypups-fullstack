package ai.blutec.puppies.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpaController {
    @GetMapping({"/", "/puppies", "/puppies/{slug}",
      "/gone-home", "/happy-families", "/how-it-works",
      "/faq", "/contact"})
    public String spa() { return "forward:/index.html"; }
}
