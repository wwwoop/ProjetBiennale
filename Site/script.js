var menu = document.getElementById("choix").innerHTML;
var menuVisible = false;

console.log(menu);

if (document.body.clientWidth < 920) {
	document.getElementById("choix").innerHTML = "";
	menuVisible = false;
}

function afficherMenu() {
console.log("fonction");

	//Si la fenetre est grande, on met le menu
	if (document.body.clientWidth >= 920) {
		document.getElementById("choix").innerHTML = menu;
		menuVisible = false;
	}

	//Sinon
	else {
		if (menuVisible) {
			menuVisible = false;
			document.getElementById("choix").innerHTML = "";
		}

		else {
			menuVisible = true;
			document.getElementById("choix").innerHTML = menu;
		}
	}
}

window.addEventListener("resize", afficherMenu);
document.getElementById("boutonMenu").addEventListener("click", afficherMenu);