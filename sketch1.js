var capture;
let boton1;
let boton2;
let boton3;
var result;

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
  result = true;
    } else {
            console.log("No es un dispositivo movil");
            capture = createCapture(VIDEO);
            capture.hide();
            result = false;
          }
// botones para acciones
  texto = createP("Clasificar");
  texto.position(50,100);
  texto.style("background-color", "#F0DB4F");
  texto.style("font-size", "30px");
  boton1 = createButton('captura'); // crea boton de captura imagen
  boton1.position(displayWidth/2-100/2+100+10, displayHeight - 65 ); // posicion del boton 
  boton1.size(100);
  boton1.style("background-color: #F0DB4F");
  boton1.class("btn")
  boton1.mousePressed(capturarimagen); // accion al precionar el boton 
  boton2 = createButton('pausa'); // crea boton de captura imagen
  boton2.position(displayWidth/2-100/2, displayHeight - 65 ); // posicion del boton
  boton2.size(100);
  boton2.style("background-color: #F0DB4F");
  boton2.class("btn btn-warning")
  boton2.mousePressed(pausa); // accion al precionar el boton 
  boton3 = createButton('continuar'); // crea boton de captura imagen
  boton3.position(displayWidth/2-100/2-100-10, displayHeight - 65 ); // posicion del boton
  boton3.size(100);
  boton3.style("background-color: #F0DB4F");
  boton3.class("btn")
  boton3.mousePressed(continuar); // accion al precionar el boton
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
  if (result == true){
    image(capture,0, 0,displayWidth-100/(7/9),displayWidth-100);
  }
  else{
    image(capture,100, 100,displayWidth-200,displayWidth-200);
  }
}