document.addEventListener("DOMContentLoaded", cargarRopas);
var seccion= document.getElementById("seccion-ropas");

async function cargarRopas(){
    try{
        var ropas = await obtenerRopas();
        renderRopas(ropas);

    }catch(error){
        console.log("Error: ", error);
    }
}

async function obtenerRopas(){
    try{
        let respuesta = await fetch('https://fakestoreapi.com/products?limit=20');
        let datos = await respuesta.json();
        return datos;
    }catch(error){
        console.log("Error: ", error);
    }
}

function renderRopas(ropas){
    console.log(ropas);
    //Crear nodos

    ropas.forEach(ropa => {
        console.log(ropa.category);
        if(ropa.category != "electronics"){
            let content = `
            <div class="tarjeta-ropa">
                <img src="${ropa.image}" class="ropa-img"></img>
                <p class="titulo" id="titulo">${ropa.title}</p>
          
                <div class="contenedor-items">
                    <div class="item">
                        <i class="fa-solid fa-star"></i>
                        <p id="id">${ropa.id}</p>
                    </div>  
                    <div class="item">
                        <i class="fa-solid fa-tags"></i>
                        <p id="categoria">${ropa.category}</p>
                    </div>
                    <div class="item" >
                        <i class="fa-solid fa-wallet"></i>
                        <p id="precio">$ ${ropa.price}</p>    
                    </div>
                    <button class="btn btn-compra" id="btn-comprar" onclick="mostrarVentanaCompra(${ropa.id})">Comprar</button>
                </div>
            </div>
            `
            seccion.innerHTML += content;
        }
    });
}

function mostrarVentanaCompra(id){
    console.log(id);
    var contenedorRopa = document.getElementById("ropa");
    contenedorRopa.style.visibility = "visible";
    var cantidad = document.getElementById("campo-cantidad");
}

document.getElementById("btn-agregar").addEventListener("click", function(){
    var input = document.getElementById("campo-cantidad");
    var cantidad = parseInt(input.textContent);
    cantidad++;
    input.textContent = cantidad;
});

document.getElementById("btn-reducir").addEventListener("click", function(){
    var input = document.getElementById("campo-cantidad");
    var cantidad = parseInt(input.textContent);
    if(cantidad > 0 ){
        cantidad--;
    }else{
        var mensaje = document.getElementById("mensaje-cantidad");
        mensaje.textContent = "No es posible un cantidad negativa";
    }
    input.textContent = cantidad;
});

document.getElementById("btn-cancelar").addEventListener("click",function(){
    var contenedorRopa = document.getElementById("ropa");
    var inputCantidad = document.getElementById("campo-cantidad");
    var mensajeError = document.getElementById("mensaje-cantidad");
    var mensajeExito = document.getElementById("mensaje-exito");

    inputCantidad.textContent = "1";
    mensajeError.textContent = "";
    mensajeExito.textContent = "";
    contenedorRopa.style.visibility="hidden";
});

document.getElementById("btn-confirmar").addEventListener("click", function(){
    //Se debe agregar al carrito el producto con su cantidad

    //Luego informar que se envio el articulo al carrito
    var mensajeExito = document.getElementById("mensaje-exito");
    mensajeExito.textContent = "Se adjunto el articulo al carrito";
})