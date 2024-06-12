package isi.project.RatingSystem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/services")
@CrossOrigin
public class ServicesController {
    @Autowired
    ServiceRepository serviceRepository;

    @Autowired
    ServiceProviderRepository serviceProviderRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @PostMapping(path="/addServiceProvider")
    public @ResponseBody String addServiceProvider(@RequestParam String name) {
        var serviceProvider = new ServiceProvider(name);
        serviceProviderRepository.save(serviceProvider);
        return "Dodano usługodawcę";
    }

    @GetMapping(path="/getAllServiceProviders")
    public @ResponseBody Iterable<ServiceProvider> getAllServiceProviders() {
        return serviceProviderRepository.findAll();
    }

    @PostMapping(path="/addService/{name}/{description}/{serviceProviderName}/{categoryName}")
    public @ResponseBody String addService(@PathVariable String name, @PathVariable String description,
                                           @PathVariable String serviceProviderName, @PathVariable String categoryName) {
        var serviceProvider = serviceProviderRepository.findByName(serviceProviderName);
        if(serviceRepository.findByServiceProviderAndName(serviceProvider, name) != null)
            return "Usługa już istnieje!";

        Category category;
        if(categoryRepository.findByName(categoryName) == null) {
            category = new Category(categoryName);
            categoryRepository.save(category);
        }
        else {
            category = categoryRepository.findByName(categoryName);
        }
        var service = new Service(name, description, serviceProvider, category);
        serviceRepository.save(service);
        return "Dodano usługę";
    }

    @PostMapping(path="/removeService/{providerName}/{serviceName}")
    public @ResponseBody String removeService(@PathVariable String providerName, @PathVariable String serviceName) {
        var serviceProvider = serviceProviderRepository.findByName(providerName);
        if(serviceProvider == null)
            return "Nie udało się usunąć - usługodawca nie istnieje";

        var service = serviceRepository.findByServiceProviderAndName(serviceProvider, serviceName);
        if(service == null)
            return "Nie udało się usunąć - taka usługa nie istnieje";

        serviceRepository.delete(service);

        return "Usunięto usługę";
    }

    @GetMapping(path = "/getAllProviderServices/{providerName}")
    public @ResponseBody List<Service>  getAllProviderServices(@PathVariable String providerName) {
        var serviceProvider = serviceProviderRepository.findByName(providerName);
        return serviceRepository.findByServiceProvider(serviceProvider);
    }

    @GetMapping(path = "/getServicesByCategory/{category}")
    public @ResponseBody List<Service> getServicesByCategory(@PathVariable String category) {
        var categoryProvider = categoryRepository.findByName(category);
        return serviceRepository.findByCategory(categoryProvider);
    }

    @GetMapping(path="/getAllServices")
    public @ResponseBody Iterable<Service> getAllServices() {
        return serviceRepository.findAll();
    }
}
