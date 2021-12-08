package web.rest_spring_security.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import web.rest_spring_security.model.Role;
import web.rest_spring_security.model.User;

import java.util.List;
import java.util.Set;

public interface UserService extends UserDetailsService {

    List<User> getAllUsers();

    User readUser(Long id);

    void createUser(User user);

    void editUser(Long id, User user);

    void deleteUser(Long id);

    User getUserByEmail(String email);

    Set<Role> getRolesForSet(List<String> rolesId);
}

