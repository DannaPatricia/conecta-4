const FILAS = 5; // Número de filas del tablero
const COLUMNAS = 7; // Número de columnas del tablero
let tableroSize; // Matriz para representar el tablero
let turno = 0; // Contador de turnos

// Función que se ejecuta al cargar la ventana
window.onload = function () {
    crearJuego(); // Inicializa el tablero y los botones
    darBoton(); // Asigna eventos de click a los botones
}

function crearJuego() {
    crearTablero(); // Crea la estructura del tablero
    crearBotones(); // Crea los botones para insertar fichas
}

function crearTablero() {
    // Crea una matriz 2D para representar las casillas del tablero
    tableroSize = Array.from({ length: FILAS }, () => new Array(COLUMNAS));
    const tablero = document.getElementById("tablero");
    let contador = 0;

    // Genera las casillas del tablero en el DOM
    for (let i = 0; i < FILAS; i++) {
        for (let j = 0; j < COLUMNAS; j++) {
            const casillaNueva = document.createElement("div");
            tablero.appendChild(casillaNueva);
            casillaNueva.setAttribute("class", "casilla"); // Clase para estilos CSS
            casillaNueva.setAttribute("id", contador); // Identificador único para cada casilla
            casillaNueva.dataset.filled = "false"; // Marca inicial de casilla vacía
            tableroSize[i][j] = casillaNueva; // Añade la casilla a la matriz
            contador++;
        }
    }
}

function crearBotones() {
    const btnContenedor = document.getElementById("btnContainer");
    // Genera los botones de las columnas
    for (let i = 0; i < COLUMNAS; i++) {
        let btnNuevo = document.createElement("div");
        btnContenedor.appendChild(btnNuevo);
        btnNuevo.setAttribute("class", "boton"); // Clase para estilos CSS
        btnNuevo.setAttribute("id", i); // ID que identifica a qué columna pertenece el botón
    }
}

function darBoton() {
    const btn = document.querySelectorAll(".boton"); // Selecciona todos los botones de columna
    let turno = 0; // Turno inicial
    btn.forEach(btn => {
        btn.addEventListener("click", () => {
            let idBoton = btn.id; // Obtiene el ID del botón
            let color = (turno % 2 === 0 ? 'yellow' : 'red'); // Alterna entre amarillo y rojo según el turno
            anunciarMensaje(color, 'turno'); // Muestra el turno actual
            ponerFicha(idBoton, color); // Coloca la ficha en la columna seleccionada
            if (compruebaGanador()) { // Comprueba si hay un ganador
                anunciarMensaje(color, 'ganador'); // Muestra el mensaje de victoria
                muestraBtnReinicio(); // Muestra el botón para reiniciar el juego
            }
            turno++; // Incrementa el turno
        });
    });
}

function ponerFicha(nColumna, color) {
    // Recorre las filas de abajo hacia arriba para encontrar la primera casilla disponible
    for (let i = FILAS - 1; i > -1; i--) {
        if (tableroSize[i][nColumna].dataset.filled === "false") {
            tableroSize[i][nColumna].dataset.filled = "true"; // Marca la casilla como ocupada
            tableroSize[i][nColumna].dataset.id = color; // Almacena el color de la ficha
            tableroSize[i][nColumna].style.transition = "0.45s"; // Transición para el color
            tableroSize[i][nColumna].style.backgroundColor = color; // Cambia el color de la casilla
            console.log('FICHA  ' + i + ' ' + nColumna); // Log para depuración
            break;
        }
    }
}

function compruebaGanador() {
    let conecta = false;
    // Recorre cada casilla del tablero para buscar combinaciones ganadoras
    for (let filas = 0; filas < FILAS; filas++) {
        for (let columnas = 0; columnas < COLUMNAS; columnas++) {
            if (tableroSize[filas][columnas].dataset.filled === 'true') {
                conecta = asignarDireccion(filas, columnas); // Comprueba direcciones desde la casilla actual
                if (conecta) return conecta; // Si hay ganador, detiene la comprobación
            }
        }
    }
}

function asignarDireccion(filaTbla, columnaTabla) {
    // Comprueba todas las direcciones posibles para una combinación ganadora
    return (fichasEnLinea(filaTbla, columnaTabla, 0, 1) || // Horizontal
        fichasEnLinea(filaTbla, columnaTabla, 1, 0) || // Vertical
        fichasEnLinea(filaTbla, columnaTabla, 1, 1) || // Diagonal descendente
        fichasEnLinea(filaTbla, columnaTabla, 1, -1)); // Diagonal ascendente
}

function fichasEnLinea(filaTabla, columnaTabla, dFila, dColumna) {
    let colorFicha = tableroSize[filaTabla][columnaTabla].dataset.id; // Obtiene el color de la ficha actual
    if (!colorFicha) return false;

    // Comprueba las siguientes 3 casillas en la dirección dada
    for (let filas = 1; filas < 4; filas++) {
        let filaAux = filaTabla + (filas * dFila);
        let columnaAux = columnaTabla + (filas * dColumna);
        let casillaColor = tableroSize[filaAux]?.[columnaAux]?.dataset.id; // Usa optional chaining para evitar errores
        if (casillaColor != colorFicha) {
            return false; // Si no coincide el color, detiene la comprobación
        }
    }
    return true; // Si todas las fichas coinciden, hay una línea ganadora
}

function anunciarMensaje(color, tipoMensaje) {
    const texto = document.getElementById("texto");
    let jugador = (color === 'red' ? 'JUGADOR 1' : 'JUGADOR 2'); // Determina el jugador según el color
    let mensaje = (tipoMensaje === 'turno' ? `TURNO ${jugador}` : `${jugador} HA GANADO`); // Genera el mensaje
    texto.textContent = mensaje;
    texto.style.backgroundColor = color;
}

function muestraBtnReinicio() {
    const body = document.querySelector("body");
    let btn = document.createElement("button");
    btn.setAttribute("id", "reiniciar");
    btn.textContent = "Reiniciar";
    body.appendChild(btn); // Añade el botón de reinicio al cuerpo del documento
    reiniciarJuego();
}

function reiniciarJuego() {
    const btnReinicio = document.getElementById("reiniciar");
    btnReinicio.addEventListener("click", () => {
        // Resetea todas las casillas del tablero
        tableroSize.forEach(fila => fila.forEach(casilla => {
            casilla.dataset.filled = "false";
            casilla.style.backgroundColor = ""; // Limpia el color de la casilla
            ocultaBtnReinicio(); // Oculta el botón de reinicio
        }));
        turno = 0; // Reinicia el contador de turnos
        anunciarMensaje('', 'turno'); // Limpia el mensaje del turno
    });
}

function ocultaBtnReinicio() {
    const btnReinicio = document.getElementById("reiniciar");
    btnReinicio.style.display = 'none'; // Oculta el botón de reinicio
}
