package com.hoaxify.hoaxify.user;

import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UniqueEmailValidator implements ConstraintValidator<UniqueEmail, String> {
    @Autowired
    UserRepository userRepository;

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {

        User inDB = userRepository.findUserByEmail(value);
        if(inDB == null) {
            return true;
        }

        return false;
    }
}