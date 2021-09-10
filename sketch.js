var capture;
let boton1; 
let boton2;
let pie;
let sup;
let seaRoseLines;
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
  // texto principal a desplegarce
  textSize(16);
  for (var i = 0; i < seaRoseLines.length; i++) {
    fill(128+(i*10));
    text(seaRoseLines[i], 20, 150+i*20);
  }
  boton1 = createButton('Camara'); // crea boton de captura imagen
  boton1.position(20, 150+seaRoseLines.length*20); // posicion del boton 
  boton1.size(100);
  boton1.mousePressed(segundaPagina); // accion al precionar el boton
  boton2 = createButton('Camara'); // crea boton de captura imagen
  boton2.position(0, 200); // posicion del boton 
  boton2.size(100);
  boton2.mousePressed(camara); // accion al precionar el boton
  }
