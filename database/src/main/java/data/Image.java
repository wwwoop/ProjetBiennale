package data;


import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Entity
public class Image  {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long mb;
    private Long nbGal;
    private String x;
    private String y;
    private Long id;
    
    protected Image() {}

    public Image( String x, String y, Long id, Long nbGal) {
        this.nbGal = nbGal;
        this.x=x;
        this.y=y;
        this.id=id;
    }

  
    public Long getNbGal() {
		return nbGal;
	}

	public void setNbGal(Long nbGal) {
		this.nbGal = nbGal;
	}
	
	public String getX() {
		return x;
	}

	public void setX(String x) {
		this.x = x;
	}
	
	public String getY() {
		return y;
	}

	public void setY(String y) {
		this.y = y;
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
}
