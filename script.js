"use strict";

/* ********* Menu ******** */
//Funciones anónima autoejecutable 
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