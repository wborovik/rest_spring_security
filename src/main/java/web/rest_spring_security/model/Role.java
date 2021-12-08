package web.rest_spring_security.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "roles")
public class Role implements GrantedAuthority {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String role;

/*@ManyToMany(mappedBy = "roles")
    private Set<User> user;*/

    @Override
    public String getAuthority() {
        return role;
    }

    @Override
    public String toString() {

        if (role.equals("ROLE_ADMIN")) {
            return "ADMIN";
        }

        if (role.equals("ROLE_USER")) {
            return "USER";
        }

        return "";
    }
}
