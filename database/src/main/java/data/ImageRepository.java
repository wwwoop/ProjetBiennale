package data;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "image", path = "image")
public interface ImageRepository extends PagingAndSortingRepository<Image, Long> {

	List<Image> findById(@Param("Id") Long Id);


}
