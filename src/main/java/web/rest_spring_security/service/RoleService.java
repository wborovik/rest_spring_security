package web.rest_spring_security.service;

import web.rest_spring_security.model.Role;

import java.util.List;

public interface RoleService {

    Role getRoleByName(String role);

    List<Role> getAllRoles();

    Role getRoleById(long id);
}

