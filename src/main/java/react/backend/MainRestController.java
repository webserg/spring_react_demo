package react.backend;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import react.domain.User;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class MainRestController {
    private static ObjectMapper mapper = new ObjectMapper();

    static {
        mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
        mapper.configure(SerializationFeature.FAIL_ON_UNWRAPPED_TYPE_IDENTIFIERS, false);
        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
    }

    @ResponseBody
    @GetMapping(path = "/api/get-users", produces = "application/json")
    public Map<String, List<User>> getUsers(HttpServletRequest request) {
        List<User> users = new ArrayList<User>();
        users.add(new User("serg", "dorosh"));
        users.add(new User("john", "smith"));
        users.add(new User("sara", "barber"));
        Map<String, List<User>> response = new HashMap<String, List<User>>();
        response.put("users", users);
        return response;
    }
}
