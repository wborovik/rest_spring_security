package web.rest_spring_security.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import web.rest_spring_security.model.Role;
import web.rest_spring_security.model.User;
import web.rest_spring_security.service.RoleService;
import web.rest_spring_security.service.UserService;

import java.util.List;


@RestController
@RequestMapping("/admin/api")
public class AdminRestController {

    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public AdminRestController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> showAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<User> showUser(@PathVariable("id") Long id) {
        return ResponseEntity.ok(userService.readUser(id));
    }

    @GetMapping(value = "/roles")
    public ResponseEntity<Iterable<Role>> findAllRoles() {
        return ResponseEntity.ok(roleService.getAllRoles());
    }

    @PostMapping("/users")
    public ResponseEntity<User> saveUser(@RequestBody User user) {
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        userService.createUser(user);

        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @PutMapping("/users")
    public ResponseEntity<User> editUser(@RequestBody User user) {
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        this.userService.createUser(user);

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable("id") long id) {
        User user = userService.readUser(id);

        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        this.userService.deleteUser(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
