var contador = document.getElementById("mensaje")
var contando = document.getElementById("resultado"); 

contador.addEventListener("keypress", function(e) {
    
    var cantidad = contador.value.length + 1 ;
    const maxCaracteres = 20;
    if(cantidad >= maxCaracteres) {
        e.preventDefault();   
    }
    contando.innerHTML = `${cantidad}/20`;
})
