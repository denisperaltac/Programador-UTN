
function cambiarColor1() {
    document.getElementById("caja1").style.backgroundColor = '#00FFFF';
}

const caja1 = document.getElementById("caja1");

caja1.addEventListener("click" , cambiarColor1);

function cambiarColor2() {
    document.getElementById("caja2").style.backgroundColor = '#00FF00';
}
    
const caja2 = document.getElementById("caja2");
caja2.addEventListener("click" , cambiarColor2);

function cambiarColor3() {
    document.getElementById("caja3").style.backgroundColor = '#FF00FF';
}
        
const caja3 = document.getElementById("caja3");
caja3.addEventListener("click" , cambiarColor3);