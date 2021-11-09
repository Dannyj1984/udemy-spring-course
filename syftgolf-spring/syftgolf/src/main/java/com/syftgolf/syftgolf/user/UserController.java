package com.syftgolf.syftgolf.user;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import com.syftgolf.syftgolf.shared.CurrentUser;
import com.syftgolf.syftgolf.user.vm.UserUpdateVM;
import com.syftgolf.syftgolf.user.vm.UserVM;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import com.syftgolf.syftgolf.error.ApiError;
import com.syftgolf.syftgolf.shared.GenericResponse;

@RestController
@RequestMapping("/api/1.0")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;

    @GetMapping("/getListOfUser")
    List<User> users(){
        return userRepository.findAllUsers(Sort.by("username"));
    }


    @PostMapping("/management/users")
    GenericResponse createUser(@Valid @RequestBody User user) {
        userService.save(user);
        return new GenericResponse("User saved");
    }

    @GetMapping("/users")
    Page<UserVM> getUsers(Pageable page) {
        System.out.println(page);
        return userService.getUsers(page).map(UserVM::new);
    }

    @GetMapping("/users/{username}")
    UserVM getUserByName(@PathVariable String username) {
        User user = userService.getByUsername(username);
        return new UserVM(user);
    }

    @PutMapping("/management/users/admin/{id:[0-9]+}")
    UserVM makeAdmin(@PathVariable long id) {
        User userUpdated = userService.updateAdmin(id);
        return new UserVM(userUpdated);
    }

    @PutMapping("/management/users/HcpAdmin/{id:[0-9]+}")
    UserVM makeHcpAdmin(@PathVariable long id) {
        User userUpdated = userService.updateHcpAdmin(id);
        return new UserVM(userUpdated);
    }

    @PutMapping("/management/users/EventAdmin/{id:[0-9]+}")
    UserVM makeEventAdmin(@PathVariable long id) {
        User userUpdated = userService.updateEventAdmin(id);
        return new UserVM(userUpdated);
    }

    @PutMapping("/management/users/User/{id:[0-9]+}")
    UserVM makeUser(@PathVariable long id) {
        User userUpdated = userService.updateUser(id);
        return new UserVM(userUpdated);
    }

    @PutMapping("/management/users/{id:[0-9]+}")
    //@PreAuthorize("#id == principal.id")
    UserVM updateUser(@PathVariable long id, @Valid @RequestBody(required = false) UserUpdateVM userUpdate) {
        System.out.println(userUpdate);
        User updated = userService.update(id, userUpdate);
        return new UserVM(updated);
    }

    @DeleteMapping("management/users/delete/{id:[0-9]+}")
    GenericResponse deleteMember(@PathVariable long id) {
        userService.deleteMember(id);
        return new GenericResponse("Member has been removed");
    }

    @ExceptionHandler({MethodArgumentNotValidException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    ApiError handleValidationException(MethodArgumentNotValidException exception, HttpServletRequest request) {
        ApiError apiError = new ApiError(400, "Validation error", request.getServletPath());

        BindingResult result = exception.getBindingResult();

        Map<String, String> validationErrors = new HashMap<>();

        for(FieldError fieldError: result.getFieldErrors()) {
            validationErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
        }
        apiError.setValidationErrors(validationErrors);

        return apiError;
    }



}






