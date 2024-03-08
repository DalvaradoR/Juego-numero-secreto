let numeroSecreto = 0;
let intentos = 0;
let listaNumerosPasados = [];
let numeroMaximo = 10;


//esta funcion asigna el texto a diferentes tipos de elementos en HTML recibe el tipo de elemento y tambien se le asigna el texto
function asignarTextoElemento(elemento, texto) {
    //elementoHTML (es la variable) = document.queryselector nos permite acceder a cada uno de los elementos y necesita los parametros de la etiqueta por ejemplo 'h1', 'p'.
    let elementoHTML = document.querySelector(elemento);
    //innerHTML nos permite ponerle un texto que 
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento() {
    //numeroDeUsuario (es la variable) = parseInt nos guarda el dato como tipo Number document.getElementById nos permite acceder a el elementos por medio del identificador id. (id son atributos en este caso tiene type, id, min, max, class) y necesita los parametros del parametro identificador en esta caso id es valorUsuario, cuando no tiene la terminacion .value nos retorna el objeto pero como necesitamos el valor ponemos .value
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    if (numeroDeUsuario == numeroSecreto) {
        //usamos tamplete string ()`texto ${variables} ${operadores ternarios}`) con el opetador ternario ${(a==1) ? (si entonces) "vez" : (sino) "veces"}
        asignarTextoElemento('p',`Acertaste el numero en ${intentos} ${(intentos==1) ? "vez" : "veces"}`);
        //obtenemos el elemento por id "reiniciar" con el metodo removeAttribute remobemos el atributo en este caso el atributo es disabled
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (numeroDeUsuario>numeroSecreto) {
            asignarTextoElemento('p','el numero secreto es menor');
        } else {
            asignarTextoElemento('p','el numero secreto es mayor');
        }
        //intentos va en el else del primer if porque si no acierta a la primera se le suma un numero al intento
        intentos++;
        //limpia la caja donde dijita el numero el usuario
        limpiarCaja();
    }
    return;
}

function limpiarCaja() {
    //utilizamos el document.querySelector por id utilizando el signo #
    /*esta funcion de puede utilizar de 3 maneras diferentes.almacena el valor vacio '' en la variable cajaVacia unicamente en a funcion (no se puede utilizar fuera de la funcion a menos que se retorne con return cajaVacia). 
    manera nunero 1
    Codigo: let cajaVacia = document.querySelector('#valorUsuario');
    cajaVacia.value = '';
    manera numero 2
    codigo: let cajaVacia = document.querySelector('#valorUsuario').value = '';
    y la ultima forma que es la que utilizaremos es:
    */
    document.querySelector('#valorUsuario').value = '';

}


function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;

    console.log(numeroGenerado);
    console.log(listaNumerosPasados);

    //si ya generamos todos los numeros posibles mostramos al usuario y salimos
    if (listaNumerosPasados.length==numeroMaximo){
        asignarTextoElemento('p','ya se generaron todos los numero posibles');
    } else{

    //si el numero generado esta incluido en la lista de numero pasados
    if (listaNumerosPasados.includes(numeroGenerado)) {
        return generarNumeroSecreto();
    } else{
        listaNumerosPasados.push(numeroGenerado);
        return numeroGenerado;
    }
}

}

function condicionesIniciales() {
    asignarTextoElemento('h1','Juego del número secreto');
    asignarTextoElemento('p',`Indica un número del 1 al ${numeroMaximo}`);
    intentos = 1;
    numeroSecreto = generarNumeroSecreto();
}

function nuevoJuego() {
    //limpiamos caja
    limpiarCaja();
    //Indicar el mensaje de intervalo de numeros
    //inicializar el contador
    //generar un numero secreto
    condicionesIniciales();
    //obtenemos el elemento por id "reiniciar" con el metodo setAttribute agregamos el atributo en este caso el atributo es disabled con el valor verdadero, true.
    document.getElementById('reiniciar').setAttribute('disabled','true');
}

condicionesIniciales();