package web.rest_spring_security.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import web.rest_spring_security.model.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    Role findByRole(String role);
}
