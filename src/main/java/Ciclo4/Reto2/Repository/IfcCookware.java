
package Ciclo4.Reto2.Repository;

import Ciclo4.Reto2.Model.Cookware;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface IfcCookware extends MongoRepository<Cookware, String>{
    
}
