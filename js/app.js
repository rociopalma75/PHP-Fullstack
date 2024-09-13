const url = "http://localhost/final-cac/api/api.php";


const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.modal-close');
const form = this.document.getElementById('postProducto-form');
const mensajePeticion = document.getElementById('estado-peticion');

document.querySelector('#btn-agregar').addEventListener('click',(e)=>{
    e.preventDefault(); //Evitará que se agregue la almohadilla # en la url
    form.elements['id'].value = null; //Lo tuve que agregar ya que si no queda agregado el id de un producto modificado
    form.reset();
    mensajePeticion.classList.remove('mensaje-exito--show');
    modal.classList.add('modal--show');
})

closeModal.addEventListener('click', (e)=>{
    e.preventDefault();
    modal.classList.remove('modal--show');
})

addEventListener('DOMContentLoaded', function(){

    loadProductos();

    window.deleteProducto = deleteProducto;
    window.updateProducto = update;
});

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

//Petición GET
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

//Petición DELETE
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
    .then(data=>loadProductos())       
}


//Petición POST y PUT
form.addEventListener('submit', function(event){
    event.preventDefault();

    const data = {
        id: document.getElementById('id').value,
        nombre: document.getElementById('nombre').value,
        precio: parseFloat(document.getElementById('precio').value)
    }
    
    var nombreError = document.getElementById('error-nombre');

    if(data.nombre.trim() === "")
    {
        nombreError.textContent = "El nombre no puede estar vacío";
        return;
    }

    let methodForm;
    let urlForm;

    if(data.id){
        methodForm = 'PUT';
        urlForm = `${url}?id=${data.id}`;
    }else{
        methodForm = 'POST';
        urlForm = `${url}`;
    }

    const options = {
        method: methodForm,
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data)
    };
    
    fetch(urlForm, options)
    .then(response=> response.json())
    .then(data =>{
        loadProductos();
        nombreError.textContent="";
        mensajePeticion.classList.add('mensaje-exito--show');
    })
    .catch(error => {
        console.error('Error: ', error);
    })
});

const update = (id, nombre, precio)=>{
    form.elements['id'].value = id;
    form.elements['nombre'].value = nombre;
    form.elements['precio'].value = precio;

    mensajePeticion.classList.remove('mensaje-exito--show');
    modal.classList.add('modal--show');
}