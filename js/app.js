const url = "http://localhost/final-cac/api/api.php";

const documento = document;
const ventana = window;

console.log(document);
console.log(ventana);

const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.modal-close');

document.querySelector('#btn-agregar').addEventListener('click',(e)=>{
    e.preventDefault(); //Evitará que se agregue la almohadilla # en la url
    modal.classList.add('modal--show');
})

closeModal.addEventListener('click', (e)=>{
    e.preventDefault();
    modal.classList.remove('modal--show');
})

const mostrarProductos = function(data){
    const tableBody = this.document.getElementById('tbody');
    tableBody.innerHTML = '';
    
    data.productos.forEach(producto => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td><button class="btn btn-eliminar" onclick="deleteProducto(${producto.id})"><i class="fa-solid fa-trash"></i></button></td>
            <td><button class="btn btn-editar" onclick="updateProducto(${producto.id}, '${producto.nombre}', '${producto.precio}')"><i class="fa-solid fa-pen"></i></button></td>                    
        `;

        tableBody.appendChild(row);
    });

}

addEventListener('DOMContentLoaded', function(){

    function loadProductos()
    {
        fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.productos)
            {
                mostrarProductos(data);
                console.log("Se encontraron productos")
            }
            else
            {
                console.error("No se encontraron productos");
            }
        })
        .catch(error => console.error('Error: ', error));
    }

    function deleteProducto(id)
    {
        let respuesta = confirm("¿Desea realmente eliminar este producto?");

        if(!respuesta){
            alert("No se elimino el producto");
            return;
        }

        fetch(`http://localhost/final-cac/api/api.php?id=${id}`,
            {
                method: 'DELETE',
                headers:{
                    'Content-Type':'application/json'
                }
            })
        .then(response=>response.json())
        .then(data=>
            {
                loadProductos();
            });
        
        loadProductos();
    }

    window.updateProducto = function(id, nombre, precio){
        let ventanaPostPut = document.querySelector('.ventanaPostPut');
        console.log(id, nombre, precio);

        let formPut = document.createElement('form');
        formPut.id='putProducto-form'

        formPut.innerHTML = `
            <h1>Modificar Producto</h1>
            <input type="text" name="nombre" id="nombrePut" placeholder="Nombre del producto" value="${nombre}">
            <input type="number" name="precio" id="precioPut" placeholder="Precio del producto" value="${parseFloat(precio)}">
            <div class="botones">
                <button type="submit" class="btn-modificar">Modificar</button>
                <button type="reset" class="btn-cancelar">Cancelar</button>
            </div>
        `;

        ventanaPostPut.appendChild(formPut);

        formPut.addEventListener('submit', function(event){
            event.preventDefault();

            const nombreInput = document.getElementById('nombrePut').value;
            
            if(nombreInput.trim() === ""){
                console.log("No puede ir vacio");
                return;
            }

            const data = {
                nombre: nombreInput,
                precio: parseFloat(document.getElementById('precioPut').value)
            };

            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(data)
            };

            fetch(`http://localhost/final-cac/api/api.php?id=${id}`, options)
            .then(response=>{
                if(!response.ok){
                    throw new Error('Error en la actualización del producto');
                }
                return response.json();
            })
            .then(data =>{
                loadProductos();
                ventanaPostPut.removeChild(formPut);

                console.log('Producto actualizado con exito: ', data);

            })
            .catch(error =>{
                console.error("Hubo un problema con la petición PUT: ", error);
            })
        })
    };


    const form = this.document.getElementById('postProducto-form');
    let mensajePeticion = document.getElementById('estado-peticion');

    const inputNombre = document.getElementById('nombre');
    const inputPrecio = document.getElementById('precio');

    inputNombre.addEventListener('keypress', ()=>{
        mensajePeticion.classList.remove('mensaje-exito--show');
    })

    inputPrecio.addEventListener('keypress', ()=>{
        mensajePeticion.classList.remove('mensaje-exito--show');
    })

    form.addEventListener('submit', function(event){
        event.preventDefault();
    
        const nombreInput = document.getElementById('nombre').value;
        var nombreError = document.getElementById('error-nombre');
    
        if(nombreInput.trim() === "")
        {
            nombreError.textContent = "El nombre no puede estar vacío";
            return;
        }
    
        const data = {
            nombre: nombreInput,
            precio: parseFloat(document.getElementById('precio').value)
        };
        
        const options = {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(data)
        };
    
        console.log(data);
    
        fetch(url, options)
        .then(response=>{
            if(!response.ok){
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json(); //Convierte la respuesta a json
        })
        .then(data =>{
            loadProductos();
            nombreError.textContent="";
            mensajePeticion.classList.add('mensaje-exito--show');
            form.reset();
            
            console.log('Success: ', data); //Maneja los datos de la respuesta
        })
        .catch(error => {
            console.error('Error: ', error);
        })
    
    });
    
    window.deleteProducto = deleteProducto;
    loadProductos();
});


