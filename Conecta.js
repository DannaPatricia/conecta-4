const FILAS = 5;
const COLUMNAS = 7;
let tableroSize;
let turno = 0;

window.onload = function () {
    crearJuego();
    darBoton();
}

function crearJuego() {
    crearTablero();
    crearBotones();
}

function crearTablero() {
    //Array from crea un array desde un iterable, en este caso un lenght, el siguiente parametro se trata una funcion 
    //que le da un nuevo valor a cada elemento del objeto iterable (itera)
    //Funcion flecha que crea un nuevo array por cada fila
    tableroSize = Array.from({ length: FILAS }, () => new Array(COLUMNAS));
    const tablero = document.getElementById("tablero");
    let contador = 0;
    for (let i = 0; i < FILAS; i++) {
        for (let j = 0; j < COLUMNAS; j++) {
            const casillaNueva = document.createElement("div");
            tablero.appendChild(casillaNueva);
            casillaNueva.setAttribute("class", "casilla");
            casillaNueva.setAttribute("id", contador);
            casillaNueva.dataset.filled = "false";
            tableroSize[i][j] = casillaNueva;
            contador++;
        }
    }
}

function crearBotones() {
    const btnContenedor = document.getElementById("btnContainer");
    for (let i = 0; i < COLUMNAS; i++) {
        let btnNuevo = document.createElement("div");
        btnContenedor.appendChild(btnNuevo);
        btnNuevo.setAttribute("class", "boton");
        btnNuevo.setAttribute("id", i);
    }
}

function darBoton() {
    const btn = document.querySelectorAll(".boton");
    let turno = 0;
    btn.forEach(btn => {
        btn.addEventListener("click", () => {
            let idBoton = btn.id;
            let color = (turno % 2 === 0 ? 'yellow' : 'red');
            anunciarMensaje(color, 'turno');
            ponerFicha(idBoton, color);
            if (compruebaGanador()){
                anunciarMensaje(color, 'ganador');
                muestraBtnReinicio();
            }
            turno++;
        });
    });
}

function ponerFicha(nColumna, color) {
    for (let i = FILAS - 1; i > -1; i--) {
        /*Esto del dataset son atriutos de datos simples que podemos personalizar
        en este caso el filled indica si la casilla esta llena o no*/
        if (tableroSize[i][nColumna].dataset.filled === "false") {
            tableroSize[i][nColumna].dataset.filled = "true";
            tableroSize[i][nColumna].dataset.id = color;
            tableroSize[i][nColumna].style.transition = "0.45s";
            tableroSize[i][nColumna].style.backgroundColor = color;
            console.log('FICHA  ' + i + ' ' + nColumna);
            break;
        }
    }
}

function compruebaGanador() {
    let conecta = false;
    for (let filas = 0; filas < FILAS; filas++) {
        for (let columnas = 0; columnas < COLUMNAS; columnas++) {
            if(tableroSize[filas][columnas].dataset.filled === 'true'){
                console.log('lleno');
                conecta = asignarDireccion(filas, columnas);
                    if(conecta) return conecta;
            }
        }        
    }
}

function asignarDireccion(filaTbla, columnaTabla){
    return (fichasEnLinea(filaTbla, columnaTabla, 0, 1)
    || fichasEnLinea(filaTbla, columnaTabla, 1, 0)
    || fichasEnLinea(filaTbla, columnaTabla, 1, 1)
    || fichasEnLinea(filaTbla, columnaTabla, 1, -1));
}

function fichasEnLinea(filaTabla, columnaTabla, dFila, dColumna) {
    console.log('   TABLA ' + filaTabla + ' ' + columnaTabla);
    let colorFicha = tableroSize[filaTabla][columnaTabla].dataset.id;
    if (!colorFicha) return false;
    for (let filas = 1; filas < 4; filas++) {
        let filaAux = filaTabla + (filas * dFila);
        let columnaAux = columnaTabla + (filas * dColumna);
        console.log('   AUX ' + filaAux + ' ' + columnaAux);
        //Utilizo .? para evitar un error y solo mostrar undifined
        let casillaColor = tableroSize[filaAux]?.[columnaAux]?.dataset.id;
        console.log('   colorTABLA ' + colorFicha + ' colorAux ' + casillaColor);
        if(casillaColor != colorFicha){
            return false;
        }
    }
    return true;
}


function anunciarMensaje(color, tipoMensaje) {
    const texto = document.getElementById("texto");
    let jugador = (color === 'red' ? 'JUGADOR 1' : 'JUGADOR 2');
    let mensaje = (tipoMensaje === 'turno' ? `TURNO ${jugador}` : `${jugador} HA GANADO`);
    texto.textContent = mensaje;
    texto.style.backgroundColor = color;
}

function muestraBtnReinicio(){
    const body = document.querySelector("body");
    let btn = document.createElement("button");
    btn.setAttribute("id", "reiniciar");
    btn.textContent = "Reiniciar";
    body.appendChild(btn);
    reiniciarJuego();
}

function reiniciarJuego(){
    const btnReinicio = document.getElementById("reiniciar");
    btnReinicio.addEventListener("click", () =>{
        tableroSize.forEach(fila => fila.forEach(casilla => {
            casilla.dataset.filled = "false";
            casilla.style.backgroundColor = "";
            ocultaBtnReinicio();
        }));
        turno = 0;
        anunciarMensaje('', 'turno');
    });
}

function ocultaBtnReinicio(){
    const btnReinicio = document.getElementById("reiniciar");
    btnReinicio.style.display = 'none';
}