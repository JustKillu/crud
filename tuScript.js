// Crear un objeto para almacenar los datos
let datos = {
    items: [],
    item: {},
    index: -1
};

// Leer los datos de LocalStorage
function leerDatos() {
    let datosGuardados = localStorage.getItem('datos');
    if (datosGuardados) {
        datos.items = JSON.parse(datosGuardados);
    }
}

// Guardar los datos en LocalStorage
function guardarDatos() {
    localStorage.setItem('datos', JSON.stringify(datos.items));
}

// Crear un nuevo item
function crearItem(item) {
    datos.items.push(item);
    guardarDatos();
}

// Leer un item
function leerItem(index) {
    return datos.items[index];
}

// Actualizar un item
function actualizarItem(index, itemActualizado) {
    datos.items[index] = itemActualizado;
    guardarDatos();
}

// Eliminar un item
function eliminarItem(index) {
    datos.items.splice(index, 1);
    guardarDatos();
    location.reload();
}

// Manipular el DOM
function mostrarItems() {
    let lista = document.getElementById('lista');
    lista.innerHTML = '';
    for (let i = 0; i < datos.items.length; i++) {
        let item = datos.items[i];
        lista.innerHTML += `<li><strong>Nombre:</strong> ${item.nombre} <strong>Apellido:</strong> ${item.apellido} <strong>Email:</strong> ${item.email} <strong>Telefono:</strong> ${item.telefono} <button onclick="editarItem(${i})">Editar</button> <button onclick="eliminarItem(${i})">Eliminar</button></li>`;
    }
}

// Editar un item
function editarItem(index) {
    datos.item = leerItem(index);
    datos.index = index;
    document.getElementById('nombre').value = datos.item.nombre;
    document.getElementById('nombre').classList.add('editando');
    document.getElementById('apellido').value = datos.item.apellido;
    document.getElementById('apellido').classList.add('editando');
    document.getElementById('email').value = datos.item.email;
    document.getElementById('email').classList.add('editando');
    document.getElementById('telefono').value = datos.item.telefono;
    document.getElementById('telefono').classList.add('editando');
    document.getElementById('boton').value = 'Editar';
    document.getElementById('cancelar').style.display = 'block';
}

// Cancelar la edición
document.getElementById('cancelar').addEventListener('click', function() {
    document.getElementById('nombre').value = '';
    document.getElementById('nombre').classList.remove('editando');
    document.getElementById('apellido').value = '';
    document.getElementById('apellido').classList.remove('editando');
    document.getElementById('email').value = '';
    document.getElementById('email').classList.remove('editando');
    document.getElementById('telefono').value = '';
    document.getElementById('telefono').classList.remove('editando');
    document.getElementById('boton').value = 'Enviar';
    document.getElementById('cancelar').style.display = 'none';
});


// Evento submit del formulario
document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault();
    let item = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value
    };
    if (datos.index === -1) {
        crearItem(item);
    } else {
        actualizarItem(datos.index, item);
        document.getElementById('boton').value = 'Enviar';
    }
    mostrarItems();
});

// Inicializar
leerDatos();
mostrarItems();
