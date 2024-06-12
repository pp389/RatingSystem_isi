package isi.project.RatingSystem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/opinions")
@CrossOrigin
public class OpinionsController {
    @Autowired
    OpinionRepository opinionRepository;

    @Autowired
    OpinionResponseRepository opinionResponseRepository;

    @Autowired
    ServiceRepository serviceRepository;

    @Autowired
    UserRepository userRepository;
    @Autowired
    private ServiceProviderRepository serviceProviderRepository;

    @PostMapping(path="/addOpinion/{grade}/{content}/{userNickname}/{serviceId}")
    public @ResponseBody String addOpinion(@PathVariable int grade, @PathVariable String content,
                                           @PathVariable String userNickname, @PathVariable int serviceId) {
        var service = serviceRepository.findById(serviceId);
        var user = userRepository.findByNickname(userNickname);
        var opinion = new Opinion(grade, content, user, service);
        opinionRepository.save(opinion);
        return "Dodano opinię";
    }

    @GetMapping(path="/getOpinion/{serviceId}")
    public @ResponseBody List<Opinion> getAllServiceOpinions(@PathVariable int serviceId) {
        var service = serviceRepository.findById(serviceId);
        return opinionRepository.findByService(service);
    }

    @GetMapping(path="/getAllOpinions")
    public @ResponseBody Iterable<Opinion> getAllOpinions() {
        return opinionRepository.findAll();
    }

    @PostMapping(path="/addPositiveReactionToOpinion/{opinionId}")
    public @ResponseBody String addPositiveReactionToOpinion(@PathVariable int opinionId) {
        var opinion = opinionRepository.findById(opinionId);
        opinion.addPositiveReaction();
        opinionRepository.save(opinion);
        return "Dodano pozytywną reakcję do opinii o id = " + opinionId;
    }

    @PostMapping(path="/addNegativeReactionToOpinion/{opinionId}")
    public @ResponseBody String addNegativeReactionToOpinion(@PathVariable int opinionId) {
        var opinion = opinionRepository.findById(opinionId);
        opinion.addNegativeReaction();
        opinionRepository.save(opinion);
        return "Dodano negatywną reakcję do opinii o id = " + opinionId;
    }

    @GetMapping(path="/getResponseToOpinion/{opinionId}")
    public @ResponseBody String getResponseToOpinion(@PathVariable int opinionId) {
        var opinion = opinionRepository.findById(opinionId);
        var response = opinionResponseRepository.getByOpinion(opinion);
        if(response == null) {
            return "Usługodawca nie odpowiedział na opinię";
        }
        return response.getContent();
    }

    @PostMapping(path="/addResponseToOpinion/{opinionId}/{responseContent}")
    public @ResponseBody String addResponseToOpinion(@PathVariable int opinionId, @PathVariable String responseContent) {
        var opinion = opinionRepository.findById(opinionId);
        var response = new OpinionResponse(responseContent, opinion);
        opinionResponseRepository.save(response);
        return "Dodano odpowiedź do opinii od id = " + opinionId;
    }

    @GetMapping(path="/getAllServiceProviderOpinions/{providerName}")
    public @ResponseBody List<Opinion> getAllServiceProviderOpinions(@PathVariable String providerName) {
        var serviceProvider = serviceProviderRepository.findByName(providerName);
        var services = serviceRepository.findByServiceProvider(serviceProvider);
        var opinions = new ArrayList<Opinion>();
        for(var service : services) {
            opinions.addAll(opinionRepository.findByService(service));
        }
        return opinions;
    }

    @GetMapping(path="/getAllUserOpinions/{userName}")
    public @ResponseBody List<Opinion> getAllUserOpinions(@PathVariable String userName) {
        var user = userRepository.findByNickname(userName);
        return opinionRepository.findByUser(user);
    }

    @PostMapping(path="/deleteOpinion/{opinionId}")
    public @ResponseBody String deleteOpinion(@PathVariable int opinionId) {
        opinionRepository.delete(opinionRepository.findById(opinionId));
        return "Usunięto opinię o id = " + opinionId;
    }

    @PostMapping(path="/deleteResponse/{opinionId}")
    public @ResponseBody String deleteResponse(@PathVariable int opinionId) {
        var opinion = opinionRepository.findById(opinionId);
        var response = opinionResponseRepository.getByOpinion(opinion);
        if(response == null) {
            return null;
        }
        opinionResponseRepository.delete(response);
        return "Usunięto odpowiedź";
    }
}
