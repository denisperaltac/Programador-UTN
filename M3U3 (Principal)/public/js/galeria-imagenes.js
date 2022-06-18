
const Rural = document.getElementById("Rural")
const Fabrica = document.getElementById("Fabrica")
const Productos = document.getElementById("Productos")
const Caffito = document.getElementById("Caffito")

const galeriaRural = document.getElementById("galeriaRural")
const galeriaFabrica = document.getElementById("galeriaFabrica")
const galeriaProductos = document.getElementById("galeriaProductos")
const galeriaCaffito = document.getElementById("galeriaCaffito")

const btnQuit1 = document.getElementById("btnQuit1")
const btnQuit2 = document.getElementById("btnQuit2")
const btnQuit3 = document.getElementById("btnQuit3")
const btnQuit4 = document.getElementById("btnQuit4")

Rural.addEventListener("click", e => {
    galeriaRural.classList.add("is-active")
});

Fabrica.addEventListener("click", e => {
    galeriaFabrica.classList.add("is-active")
});

Productos.addEventListener("click", e => {
    galeriaProductos.classList.add("is-active")
});


Caffito.addEventListener("click", e => {
    galeriaCaffito.classList.add("is-active")
});

btnQuit1.addEventListener("click", e => {
    galeriaRural.classList.remove("is-active")
})

btnQuit2.addEventListener("click", e => {
    galeriaFabrica.classList.remove("is-active")
})

btnQuit3.addEventListener("click", e => {
    galeriaProductos.classList.remove("is-active")
})

btnQuit4.addEventListener("click", e => {
    galeriaCaffito.classList.remove("is-active")
})