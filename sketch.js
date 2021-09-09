var capture;
let boton;
let boton1; 
let boton2;
let boton3;
let boton4;
let seaRoseLines;
let resultado;
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
  fill(80);
  rect(0,0,displayWidth,100);
  fill("#F0DB4F");
  rect(0,displayHeight-100,displayWidth,displayHeight);
  et = createP("Más agua limpia más vida");
  et.position(50,-30);
  et.style("font-size","50px");
  texto()
  boton1 = createButton('Camara'); // crea boton de captura imagen
  boton1.position(20, 150+seaRoseLines.length*20); // posicion del boton 
  boton1.size(100);
  boton1.mousePressed(segundaPagina); // accion al precionar el boton
  boton4 = createButton('Camara'); // crea boton de captura imagen
  boton4.position(0, 200); // posicion del boton 
  boton4.size(100);
  boton4.mousePressed(texto); // accion al precionar el boton
  }

function segundaPagina(){
// botones para acciones
  boton1.hide(); 
  boton = createButton('captura'); // crea boton de captura imagen
  boton.position(displayWidth-100*2, displayHeight - 65 ); // posicion del boton 
  boton.size(100);
  boton.mousePressed(capturarimagen); // accion al precionar el boton 
  boton2 = createButton('pausa'); // crea boton de captura imagen
  boton2.position(displayWidth/2-100/2, displayHeight - 65 ); // posicion del boton
  boton2.size(100);
  boton2.mousePressed(pausa); // accion al precionar el boton 
  boton3 = createButton('continuar'); // crea boton de captura imagen
  boton3.position(0, displayHeight - 65 ); // posicion del boton
  boton3.size(100);
  boton3.mousePressed(continuar); // accion al precionar el boton
  camara();
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


function camara()  {
  resultado = true
  while (resultado == true){
    image(capture,0, 100,displayWidth,displayHeight-200); 
  }
}

function texto(){
    // texto principal a desplegarce
  resultado = false
  textSize(16);
  for (var i = 0; i < seaRoseLines.length; i++) {
    fill(128+(i*10));
    text(seaRoseLines[i], 20, 150+i*20);
  }
}