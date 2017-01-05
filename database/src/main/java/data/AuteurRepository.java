package data;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "people", path = "people")
public interface AuteurRepository extends PagingAndSortingRepository<Auteur, Long> {

	List<Auteur> findByLastName(@Param("name") String name);
	List<Auteur> findById(@Param("Id") Long Id);

}

