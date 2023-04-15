package com.codeflow.security.repository;

import com.codeflow.security.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserRepository extends CrudRepository<User, Integer> {
    UserDetails findByEmail(String username);
}
