package com.marko.luxurylinehotelsbe.service;

import com.marko.luxurylinehotelsbe.model.Role;
import com.marko.luxurylinehotelsbe.model.User;
import java.util.List;

public interface RoleService {

    List<Role> getRoles();

    Role createRole(Role theRole);

    User assignRoleToUser(Long userId, Long roleId);

    User removeUserFromRole(Long userId, Long roleId);

    Role removeAllUsersFromRole(Long roleId);

    void deleteRole(Long id);
}