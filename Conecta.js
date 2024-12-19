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
    tableroSize = new Array(5);
    for (var i = 0; i < tableroSize.length; i++) {
        tableroSize[i] = new Array(7);
    }
    const tablero = document.getElementById("tablero");
    var contador = 0;
    for (var i = 0; i < tableroSize.length; i++) {
        for (var j = 0; j < tableroSize[0].length; j++) {
            let casillaNueva = document.createElement("div");
            tablero.appendChild(casillaNueva);
            casillaNueva.setAttribute("class", "casilla");
            casillaNueva.setAttribute("id", contador);
            tableroSize[i][j] = casillaNueva;
            /*  console.log("casilla " + i + "," + j + ", ID:" + contador);*/
            contador++;
        }
    }
}

function crearBotones() {
    const btnContenedor = document.getElementById("btnContainer");
    for (var i = 1; i < 7; i++) {
        var btnNuevo = document.createElement("div");
        btnContenedor.appendChild(btnNuevo);
        btnNuevo.setAttribute("class", "boton");
        btnNuevo.setAttribute("id", i);
    }
}

function darBoton() {
    const btn = document.querySelectorAll(".boton");
    btn.forEach(btn => {
        btn.addEventListener("click", () => {
            var color = "yellow";
            let idBoton = btn.id;
            if (turno % 2 === 0) {
                color = "red";
                console.log("TURNO J1");
            } else {
                console.log("TURNO J2");

            }
            ponerFicha(idBoton, color);
            compruebaGanador();
            turno++;
        })
    });
}

function ponerFicha(nColumna, color) {
    for (var i = tableroSize.length - 1; i > -1; i--) {
        /*Esto del dataset son atriutos de datos simples que podemos personalizar
        en este caso el filled indica si la casilla esta llena o no*/
        if (!tableroSize[i][nColumna].dataset.filled) {
            tableroSize[i][nColumna].dataset.filled = true;
            tableroSize[i][nColumna].dataset.id = color;
            tableroSize[i][nColumna].style.transition = "0.45s";
            tableroSize[i][nColumna].style.backgroundColor = color;
            break;
        }
    }
}

function compruebaGanador() {
    /*FILAS*/
    for (var i = 0; i < tableroSize.length; i++) {
        var contFilas = 1;
        for (var j = 0; j < tableroSize[0].length - 1; j++) {
            if (tableroSize[i][j].dataset.filled === "true" && tableroSize[i][j].dataset.id === tableroSize[i][j + 1].dataset.id) {
                contFilas++;
                if (contFilas === 4) {
                    if (tableroSize[i][j].dataset.id === "red") {
                        console.log("J1 HA GANADO (FILAS)");
                    } else if (tableroSize[i][j].dataset.id === "yellow") {
                        console.log("J2 HA GANADO (FILAS)");
                    }
                }
            } else {
                contFilas = 1;
            }
        }
    }
    /*COLUMNAS*/
    for (var i = 0; i < tableroSize[0].length; i++) {
        var contColum = 1;
        for (var j = 0; j < tableroSize.length - 1; j++) {
            if (tableroSize[j][i].dataset.filled === "true" && tableroSize[j][i].dataset.id === tableroSize[j + 1][i].dataset.id) {
                contColum++;
                if (contColum === 4) {
                    if (tableroSize[j][i].dataset.id === "red") {
                        console.log("J1 HA GANADO (COLUM)");
                    } else if (tableroSize[j][i].dataset.id === "yellow") {
                        console.log("J2 HA GANADO (COLUM)");
                    }
                }
            } else {
                contColum = 1;
            }
        }
    }

    /*DIAGONAL DERECHA*/
    for (var i = 0; i < tableroSize.length - 3; i++) {
        var contDiagD = 0;
        for (var j = 0; j < tableroSize[0].length - 2; j++) {
            if (tableroSize[i + (contDiagD * 1)][j].dataset.filled === "true" && tableroSize[i + (contDiagD * 1)][j].dataset.id === tableroSize[i + (contDiagD * 1) + 1][j + 1].dataset.id) {
                contDiagD++;
                if (contDiagD === 3) {
                    if (tableroSize[i + (contDiagD * 1)][j + 1].dataset.id === "red") {
                        console.log("J1 HA GANADO (DIAGD)");
                        break;
                    } else if (tableroSize[i + (contDiagD * 1)][j + 1].dataset.id === "yellow") {
                        console.log("J2 HA GANADO (DIAGD)");
                        break;
                    }
                }
            } else {
                contDiagD = 0;
            }
        }
    }
    /*DIAGONAL IZQUIERDA*/
    for (var i = 0; i < tableroSize.length - 3; i++) {
        var contDiagI = 0;
        for (var j = tableroSize[0].length-1; j > 2; j--) {
            if (tableroSize[i + (contDiagI * 1)][j].dataset.filled === "true" && tableroSize[i + (contDiagI * 1)][j].dataset.id === tableroSize[i + (contDiagI * 1) + 1][j - 1].dataset.id) {
                contDiagI++;
                if (contDiagI === 3) {
                    if (tableroSize[i + (contDiagI * 1)][j - 1].dataset.id === "red") {
                        console.log("J1 HA GANADO (DIAGI)");
                        break;
                    } else if (tableroSize[i + (contDiagI * 1)][j - 1].dataset.id === "yellow") {
                        console.log("J2 HA GANADO (DIAGI)");
                        break;
                    }
                }
            } else {
                contDiagI = 0;
            }
        }
    }
}

function animacion(nColumna) {
    for (var i = 0; i < tableroSize.length; i++) {
        if (!tableroSize[i][nColumna].dataset.filled) {
            tableroSize[i][nColumna].style.transition = "0.45s";
            tableroSize[i][nColumna].style.backgroundColor = "red";
            tableroSize[i][nColumna].style.transition = "0.45s";
            tableroSize[i][nColumna].style.backgroundColor = "rgb(65, 4, 65)";
        }
    }
}

function encuentraFicha() {
    var valido = false;
    for (var i = 0; i < tableroSize.length - 1; i++) {
        for (var j = 0; j < tableroSize[0].length - 1; j++) {
            if (tableroSize[i][j].dataset.filled === "true") {
                valido = true;
            }
        }
    }
}



