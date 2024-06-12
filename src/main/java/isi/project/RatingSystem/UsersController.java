package isi.project.RatingSystem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path="/users")
@CrossOrigin
public class UsersController {
    @Autowired
    UserRepository userRepository;

    List<String> loggedUsers = new ArrayList<>();

    @Autowired
    private ServiceRepository serviceRepository;
    @Autowired
    private ServiceProviderRepository serviceProviderRepository;
    @Autowired
    private UserAuthProvider userAuthProvider;

    @PostMapping(path="/addUser/{nickname}/{password}/{email}/{isServiceProvider}")
    public @ResponseBody String addNewUser(@PathVariable String nickname, @PathVariable String password, @PathVariable String email,
        @PathVariable boolean isServiceProvider) {
        var user = new User(nickname, password, email);
        if(userRepository.findByNickname(nickname) != null) {
            return "User already exists";
        }

        if(isServiceProvider) {
            var serviceProvider = new ServiceProvider(nickname);
            user.setIsServiceProvider(true);
            serviceProviderRepository.save(serviceProvider);
        }
        user.setToken(userAuthProvider.createToken(nickname));
        userRepository.save(user);

        loggedUsers.add(nickname);
        System.out.println("Token" + user.getToken());
        return user.getToken();
    }

    @PostMapping(path="/login/{nickname}/{password}")
    public @ResponseBody UserTypeAndToken login(@PathVariable String nickname, @PathVariable String password) {
        if(userRepository.findByNickname(nickname) == null || !userRepository.findByNickname(nickname).getPassword().equals(password)) {
            var userTypeAndToken = new UserTypeAndToken();
            userTypeAndToken.userType = "Wrong data";
            return userTypeAndToken;
        }

        var userTypeAndToken = new UserTypeAndToken();
        userTypeAndToken.token = userAuthProvider.createToken(nickname);

        loggedUsers.add(nickname);
        if(serviceProviderRepository.findByName(nickname) != null)
            userTypeAndToken.userType = "Service provider";
        else
            userTypeAndToken.userType = "Normal user";

        return userTypeAndToken;
    }

    @GetMapping(path="/getAllUsers")
    public @ResponseBody Map<String, String> getAllUsers() {
        var allUsers = (List<User>) userRepository.findAll();
        var nickAndEmail = new HashMap<String, String>();
        for(var user : allUsers)
            nickAndEmail.put(user.getNickname(), user.getEmail());
        return nickAndEmail;
    }
}
