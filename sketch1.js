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
  boton = [boton1 = createButton('captura'),boton2 = createButton('pausa'),boton3 = createButton('continuar')]
    // crea boton de captura imagen
    boton[0].position(displayWidth/2-100/2+100, displayHeight - 65 ); // posicion del boton 
    boton[0].size(100);
    boton[0].class("btn btn-warning");
    boton[0].mousePressed(capturarimagen); // accion al precionar el boton 
     // crea boton de captura imagen
    boton[1].position(displayWidth/2-100/2, displayHeight - 65 ); // posicion del boton
    boton[1].size(100);
    boton[1].class("btn btn-warning");
    boton[1].mousePressed(pausa); // accion al precionar el boton 
     // crea boton de captura imagen
    boton[2].position(displayWidth/2-100/2-100, displayHeight - 65 ); // posicion del boton
    boton[2].size(100);
    boton[2].class("btn btn-warning");
    boton[2].mousePressed(continuar); // accion al precionar el boton
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