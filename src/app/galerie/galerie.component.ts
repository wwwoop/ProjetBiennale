import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'obj-galerie',
  templateUrl: './galerie.component.html',
  styleUrls: ['./galerie.component.css']
})
export class GalerieComponent implements OnInit {
  //Paramètres d'entrée
  @Input('initX') x: string;
  @Input('initY') y: string;
  @Input('numGalerie') id: number;

  //Varaibles pour disposer les images
  estReduit: boolean;
  position: number;
  strPos: string;
  imgTab: Array<any> = [];
  imgHeight: number;
  couvertureWidth: number;
  nbLignes: number;
  imgParLigne: Array<number> = [];

  //Description de l'image
  descVisible: number;
  descValue: string;
  descTitle: string;
  descX: string;
  descY: string;

  constructor() { 
    
  }

  ngOnInit() {
    this.estReduit = true;
    this.position = 0;
    this.descVisible = 0;

    this.imgTab.push({url: "Frite.png", width: "400px", height: "283px"});
    this.imgTab.push({url: "Frite.png", width: "400px", height: "283px"});
    this.imgTab.push({url: "Frite.png", width: "400px", height: "283px"});
    this.imgTab.push({url: "Frite.png", width: "400px", height: "283px"});
    this.imgTab.push({url: "Frite.png", width: "400px", height: "283px"});

    this.descValue = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

    this.descTitle = "Titre Galerie";

    // Les images ont toutes la même hauteur
    this.imgHeight = parseInt(this.imgTab[0].height);

    //La courture est la dernière image (c'est la seule affichée si les dimensions sont différentes)
    this.couvertureWidth = parseInt(this.imgTab[this.imgTab.length - 1].width);

    /*
    	Concernant la répartition des images on procède en plusieurs étapes :
    		- On cherche à déterminer le nombre de lignes uniquement en fonctions du nombre d'images (on cherche un affichage carré)
    		- On calcule ensuite la longeur totale des images (la somme des largeurs)
    		- On cherche maintenant à disposer les images pour que les lignes aient le plus possible la même taille
    */


    //On calcule le nombre de ligne
    this.nbLignes = Math.round(Math.sqrt(this.imgTab.length));

    //On détermine les images présentes sur chaque ligne
    let imgCourante = 0
    let longueurLigne = 0;
    let longueurTot = 0

    //Calcul de la longeur totale.
    for (let i = 0; i < this.imgTab.length; i++) {
    	longueurTot = longueurTot + parseInt(this.imgTab[i].width);
    }

    //On détermine la ligne de chaque image
    for (let i = 0; i < this.nbLignes; i++)
    {
    	longueurLigne = parseInt(this.imgTab[imgCourante].width);

    	while ((imgCourante < (this.imgTab.length - 1)) && (Math.abs(longueurLigne - longueurTot*(i+1)/this.nbLignes) >= Math.abs(longueurLigne + parseInt(this.imgTab[imgCourante+1].width) - longueurTot*(i+1)/this.nbLignes))) {

    		imgCourante = imgCourante + 1;
    		longueurLigne = longueurLigne + parseInt(this.imgTab[imgCourante].width);
    	}

    	this.imgParLigne.push(imgCourante);
    }
  }

  reduit() : boolean {
  	return this.estReduit;
  }

  posLeft(i: number): string {
  	if (this.estReduit) {
  		return -5*i + "px";
  	}

  	else {

  		//On détermine le numéro de la ligne
  		let ligne = 0

  		while (this.imgParLigne[ligne] < i) {
  			ligne = ligne + 1;
  		}

  		//On détermine la largeur de la ligne
  		let debut = 0
  		let largeur = 0;

  		if (ligne != 0) {
  			debut = this.imgParLigne[ligne - 1] + 1;
  		}

  		for (let j = debut; j <= this.imgParLigne[ligne]; j++)
  		{
  			largeur = largeur + parseInt(this.imgTab[j].width);
  		}

  		//On n'oublie pas les espaces
  		largeur = largeur + (this.imgParLigne[ligne] - debut) * 10;

  		//On calcule le décalage pour ne pas afficher les images trop à gauche
  		let decalage = 0;

  		if (largeur/2 - this.couvertureWidth/2 > parseInt(this.x)) {
  			decalage = largeur/2 - this.couvertureWidth/2 - parseInt(this.x) + 20;
  		}

  		//On détermine la position
  		let position = 0;

  		while (debut < i) {
  			position = position + parseInt(this.imgTab[debut].width) + 10;
  			debut = debut + 1;
  		}

  		//On affiche
  		return (position - largeur/2 + decalage + this.couvertureWidth/2) + "px";
  	}
  }

  posTop(i: number): string {
  	if (this.estReduit) {
  		return 5*i + "px";
  	}

  	else {
  		//On calcule la hauteur de l'objet
  		let hauteur = this.nbLignes * this.imgHeight + (this.nbLignes - 1) * 10;

  		//Si la première image est affichée trop haute, il faudra la décaler
  		let decalage = 0;

  		if (hauteur/2 - this.imgHeight/2 > parseInt(this.y)) {
  			decalage = hauteur/2 - this.imgHeight/2 - parseInt(this.y) + 20;
  		}

  		//On détermine la ligne
  		let ligne: number = 0;

  		while (this.imgParLigne[ligne] < i) {
  			ligne = ligne + 1;
  		}

  		return ((ligne/this.nbLignes) * hauteur - hauteur/2 + decalage + this.imgHeight/2) + "px";
  	}
  }

  changePos(): void {
    this.estReduit = !this.estReduit;
  }

  getZIndex(): number {
    if(this.estReduit) {
      return 0;
    }

    else {
      return 1;
    }
  }

  afficherTexte(event): void {
    //On affiche le message que si les images sont empilées
    if (this.estReduit) {
      this.descVisible = 1;
      this.descX = "-200px";
      this.descY = 0.6*this.imgHeight +"px";
    }

    //On n'affiche pas si les images sont dispersées
    else
    {
      this.descVisible = 0;
    }
  }

  masquerTexte(): void {
    this.descVisible = 0;
  }

}
