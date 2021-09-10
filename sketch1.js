var capture;
let boton;


function preload () {
// lee el archivo de texto y coloca su contenido en una 
// matriz de cadena con un elemento de matriz por linea en un archivo fuente
  seaRoseLines = loadStrings ('texto.txt'); // siempre debe estar en preload para que funcione
}

function setup() {
  createCanvas(displayWidth, displayHeight); // crea un lienzo de pantalla completa
    background(50);  
    if (isMobileDevice()) {
        console.log("Es un dispositivo movil");
          var constraints = {
                audio: false, // desactiva el audio de la cam o dispositivo movil
                video: {
                  facingMode: {
                    exact: "environment" // accede a la camara frontal
                      }
                    }
              };

  capture = createCapture(constraints); // objeto para control camara frontal mobil
  capture.hide();
    } else {
            console.log("No es un dispositivo movil");
            capture = createCapture(VIDEO);
            capture.hide();
          }
// botones para acciones
  boton = {
    boton1 = createButton('captura'); // crea boton de captura imagen
    boton1.position(displayWidth/2-100/2+100, displayHeight - 65 ); // posicion del boton 
    boton1.size(100);
    boton1.class("btn btn-warning");
    boton1.mousePressed(capturarimagen); // accion al precionar el boton 
    boton2 = createButton('pausa'); // crea boton de captura imagen
    boton2.position(displayWidth/2-100/2, displayHeight - 65 ); // posicion del boton
    boton2.size(100);
    boton2.class("btn btn-warning");
    boton2.mousePressed(pausa); // accion al precionar el boton 
    boton3 = createButton('continuar'); // crea boton de captura imagen
    boton3.position(displayWidth/2-100/2-100, displayHeight - 65 ); // posicion del boton
    boton3.size(100);
    boton3.class("btn btn-warning");
    boton3.mousePressed(continuar); // accion al precionar el boton
  }
  boton.class("btn-group");
}

function pausa() {
    capture.stop(); // pausa el video
}

function continuar() {
  capture.loop(); // retoma el video
}

//  define si es pantalla de PC o dispostivo mobil 
function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

function capturarimagen() {
    save("image"+".jpg"); // captura imagen en formato jpg
}

function draw(){
  image(capture,0, 0,displayWidth,displayHeight-200);
}