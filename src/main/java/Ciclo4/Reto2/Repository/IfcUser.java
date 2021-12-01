
package Ciclo4.Reto2.Repository;

import Ciclo4.Reto2.Model.User;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface IfcUser extends MongoRepository<User, Integer>{
    
    public Optional <User> findByEmail(String email);
    public Optional <User> findByPassword(String password);
    
}
