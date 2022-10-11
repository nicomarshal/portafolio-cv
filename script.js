"use strict";

//FUNCIONES ANÓNIMAS AUTOEJECUTABLES

/* ********* Reseteo Hash URL******** */
//Resetear location.hash al recargar la web
((d) => {
	history.replaceState({}, d.title, ".");
})(document);


/* ********* Menu ******** */
((d) => {
	const $btnMenu = d.querySelector(".menu-btn");
	const $menu = d.querySelector(".menu");

	$btnMenu.addEventListener("click", e => {
		/*Si la clase existe, la elimina y devuelve false*/
		/*Si la clase no existe, la añade y devuelve true*/
		$btnMenu.firstElementChild.classList.toggle("none");
		$btnMenu.lastElementChild.classList.toggle("none");
		$menu.classList.toggle("is-active");
	})

	/*Técnica de la delegación de eventos*/
	d.addEventListener("click", e => {
		if(!e.target.matches(".menu a")) return false;

		$btnMenu.firstElementChild.classList.remove("none");
		$btnMenu.lastElementChild.classList.add("none");
		$menu.classList.remove("is-active");
	})
})(document);

/* ********* ContactForm ******** */
((d) => {
	const $form = d.querySelector(".contact-form");
	const $loader = d.querySelector(".contact-form-loader");
	const $response = d.querySelector(".contact-form-response");

	$form.addEventListener("submit", e => {
		e.preventDefault();
		$loader.classList.remove("none");
		fetch("https://formsubmit.co/ajax/dev.ledesmanicolas@gmail.com", {
			method: "POST",
			/*La información que se va a enviar es el formulario como tal
			Entonces creamos un objeto FormData para el mismo serialice
			los datos y se lo mande a la petición del servicio que
			estamos utilizando. 
			¿De dónde obtenemos los datos? Del e.target*/
			body: new FormData(e.target)
			/*Si la respuesta se ejecutó correctamente, entonces
			convertimos a json la información y, caso contrario,
			si hay alguna error, vamos a rechazar la promesa que devuelve 
			fetch para que el error lo manipule catch */
		}).then(res => (res.ok ? res.json():Promise.reject(res)))
		 .then(json => {
		 	console.log(json);
		 	$loader.classList.add("none");
		 	location.hash = "#gracias";
		 	$form.reset();
		 })
		 .catch(err => {
		 	console.log(err);
		 	let message = err.statusText || "Ocurrió un error al enviar. Intenta nuevamente";
		 	$response.querySelector("h3").innerHTML = `Error ${err.status}: ${message}`;
		 	$loader.classList.add("none");
		 })
		 .finally(() => {
		 	$loader.classList.add("none");
		 	setTimeout(() => {
		 		location.hash = `#close`;
		 	}, 3000);
		 })
	})
})(document);

/* ********* SendEmail ******** */
((d) => {
	//Seleccionamos el boton de email
	const $email = d.querySelector(".email");
	/*Segun la resolución de pantalla, el botón de email va a comportarse
	de una forma u otra*/
	let mqlDesk = matchMedia("(min-width: 1024px)");
	let mqlMovil = matchMedia("(max-width: 1024px)");

	//Función que copia el email al portapapeles del usuario
	const copyEmail = () => {
		let opcion = confirm("¿Acepta copiar la dirección 'dev.ledesmanicolas@gmail.com' al portapapeles?");
		if (opcion === true) {
			//Creamos un input
			const $aux = d.createElement("input");
		  	//Al input le asignamos como valor nuestro email
		  	$aux.setAttribute("value", "dev.ledesmanicolas@gmail.com");
		  	//Añadimos el input al body
		  	d.body.appendChild($aux);
		  	//Seleccionamos su contenido
		  	$aux.select();
		  	//Copiamos el contenido al portapapeles
		  	d.execCommand("copy");
		  	//Removemos el input
		  	d.body.removeChild($aux);	

		  	location.hash = "#copy";
		  	
		  	setTimeout(() => {
		 		location.hash = `#close`;
		 	}, 3000);
		}
	}

	if (screen.width > 1024) {
		console.log("la tenes adentro");
		console.log("Hola Desktop");
		$email.classList.add("not-active");
		$email.removeAttribute("href");


		$email.addEventListener("click", copyEmail);			
		
	}

	//Si la resolución es mayor a 1024px...
	mqlDesk.addEventListener("change", mql => {
		if (mql.matches) {
			console.log("Hola Desktop");
			$email.classList.add("not-active");
			$email.removeAttribute("href");
			$email.addEventListener("click", copyEmail);
		}
		else {
			console.log("Chau Desktop");
		}
	})
	//Si la resolución es menor a 1024px...
	mqlMovil.addEventListener("change", mql => {
		if (mql.matches) {
			if($email.classList.contains("not-active")){
				console.log("Hola Movil");
				$email.removeEventListener("click", copyEmail);	
				$email.classList.remove("not-active");
				$email.setAttribute("href", "mailto:dev.ledesmanicolas@gmail.com");
			}	
		}
		else {
			console.log("Chau Movil");
		}
	})
})(document);

