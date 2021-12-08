package web.rest_spring_security.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import web.rest_spring_security.model.User;
import web.rest_spring_security.service.RoleService;
import web.rest_spring_security.service.UserService;

import java.security.Principal;

@Controller
public class AuthorizationController {

    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public AuthorizationController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/admin")
    public String adminPanel(Model model, Principal principal) {
        model.addAttribute("users", userService.getAllUsers());
        model.addAttribute("user", userService.loadUserByUsername(principal.getName()));
        model.addAttribute("allRoles", roleService.getAllRoles());
        model.addAttribute("newUser", new User());
        return "admin";
    }

    @GetMapping("/user")
    public String userPage(Model model, Principal principal) {
        User user = userService.getUserByEmail(principal.getName());
        model.addAttribute("user", user);
        return "user";
    }
}
