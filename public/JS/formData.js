//Asignacion de elementos DOM a Variables
var btnEnviar = document.getElementById('btnEnviar');
var switchTengoPc = document.getElementById('switchTengoPC');

var inputNombre = document.getElementById('inputNombre');
var inputApellido = document.getElementById('inputApellido');
var inputEmail = document.getElementById('inputEmail');
var inputTelefono = document.getElementById('inputTelefono');
var inputEdad = document.getElementById('inputEdad')
var selectGenero = document.getElementById('controlSelectGender');

var spanNombre = document.getElementById('spanNombre');
var spanApellido = document.getElementById('spanApellido');
var spanEmail = document.getElementById('spanEmail');
var spanTelefono = document.getElementById('spanTelefono');
var spanGenero = document.getElementById('spanGenero');
var spanEdad = document.getElementById('spanEdad')
var lblTengoPC = document.getElementById('lblTengoPC');
var spanLimpio = document.getElementById('formLimpio');

function clearForm() {
    inputNombre.value = '';
    inputApellido.value = '';
    inputEmail.value = '';
    inputTelefono.value = '';
    inputEdad.value = '';
    selectGenero.value = 'vacio';
}

// EVENTS HANDLERS
inputNombre.addEventListener('input', validarNombre = () => {
    var nombre = inputNombre.value;
    var tieneDigitos = /(\d)/g.test(nombre);

    if (tieneDigitos) {
        if (nombre.length >= 5) inputNombre.value = '';
        spanNombre.innerText = 'Este campo no puede contener números';
    }
    else spanNombre.innerText = '';

    if (nombre.length <= 2) spanNombre.innerText = 'Este campo debe contener más de 2 caracteres';

    return nombre;
});

inputApellido.addEventListener('input', validarApellido = () => {
    var apellido = inputApellido.value;
    var tieneDigitos = /(\d)/g.test(apellido);

    if (tieneDigitos) {
        if (apellido.length >= 5) inputApellido.value = '';
        spanApellido.innerText = 'Este campo no puede contener números';
    }
    else spanApellido.innerText = '';

    if (apellido.length <= 2) spanApellido.innerText = 'Este campo debe contener más de 2 caracteres';

    return apellido;
});

inputEmail.addEventListener('input', validarEmail = () => {
    var email = inputEmail.value;
    var regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!regexEmail.test(email)) spanEmail.innerText = 'Correo no válido';
    else if (email == '') spanEmail.innerText = 'Este campo es obligatorio';
    else spanEmail.innerText = '';

    return email;
});

inputTelefono.addEventListener('input', validarTelefono = () => {
    var telefono = inputTelefono.value;
    var tieneLetras = /[a-z]/g.test(telefono);

    if (tieneLetras) {
        if (telefono.length >= 4) inputTelefono.value = '';
        spanTelefono.innerText = 'Este campo no puede contener letras'
    }
    else if (telefono.length != 8) spanTelefono.innerText = 'El teléfono debe contener 8 digitos'

    else spanTelefono.innerText = '';

    return telefono;
});

inputEdad.addEventListener('input', validarEdad = () => {
    var edad = inputEdad.value;
    if (edad <= 10 || edad >= 60) spanEdad.innerText = 'No te Creo! Escribe tu verdadera edad';
    else if (edad == '' || edad == 0) spanEdad.innerText = 'Esta campo es obligatorio';
    else spanEdad.innerText = '';

    return edad;
});

switchTengoPc.addEventListener('change', cambiarTextoSwitch = () => {
    var switchState = switchTengoPc.checked;

    if (!switchState) lblTengoPC.innerText = 'No Tengo Computadora Pórtatil';
    else lblTengoPC.innerText = 'Tengo Computadora Pórtatil';

    return switchState;
});

function validarGenero() {
    var genero = selectGenero.value;
    if (genero == 'vacio') spanGenero.innerText = 'Selecciona un género';
    else spanGenero.innerText = '';

    return genero
}

function validarForm() {
    var formValido = false;

    if (spanNombre.innerText == '' && spanApellido.innerText == '' && spanEmail.innerText == '' &&
        spanTelefono.innerText == '' && spanEdad.innerText == '' && spanGenero.innerText == '') {

        spanLimpio.innerText = '';
        formValido = true;
    }
    else formValido = false;

    return formValido;
}

// BOTON ENVIAR - CLICK EVENT
btnEnviar.addEventListener('click', async event => {

    let formData = {
        nombre: validarNombre(),
        apellido: validarApellido(),
        email: validarEmail(),
        telefono: validarTelefono(),
        edad: validarEdad(),
        genero: validarGenero(),
        tienePC: cambiarTextoSwitch()
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    };

    if (validarForm()) {
        const response = await fetch('/api', options);
        const json = await response.json();
        console.log('Data Insert Successfull!');
        clearForm();
    }
    else alert(`Formulario Inválido: Favor revise los datos en el formulario`);
});






