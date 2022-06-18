 panelcito = document.getElementById("panel");
 boton = document.getElementById("btn");

document.addEventListener("click", e => {
    if(e.target.matches("#btn") || e.target.matches("#btn *")) {
        boton.classList.toggle("is-active")
        panelcito.classList.toggle("is-active")
        
    }
})

document.addEventListener("click", e=> {
    if(e.target.matches("nav a")) {
        panelcito.classList.remove("is-active")
        boton.classList.remove("is-active")
    }
})