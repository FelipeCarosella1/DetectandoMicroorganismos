var capture;
let boton1;
let boton2;
let boton3;
var seccion;
let titulo;
let clasificador;
var result;
let margen;
let tamañoB;
let nombre;
let porcentaje;
let nombreL;
let porcentajeL;

function preload () {
  // cargamos el link donde se encuentra nuestro modelo pre entrehado por Teachable Machine 
  // model.json contiene la arquitectura del modelo utilizada por la biblioteca TensorFlow.js  
  clasificador = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/y8n73XnCI/'+ 'model.json');
}

function setup() {
  createCanvas(displayWidth, displayHeight); // crea un lienzo de pantalla completa
    background("#2B2B2B");  
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

  if (result == true){
    margen = 50;
    tamañoB = 100;
    positionRect = [margen,displayHeight+100]
  }
  else{
    margen = 100;
    tamañoB = 300;
    positionRect = [320*2+200,100] 
  }

  fill("#F0DB4F");
  seccion = rect(positionRect[0],positionRect[1],displayWidth-(320*2+margen+100)-margen,240*2);

  titulo = createP("Clasificar");
  titulo.position(margen,100);
  titulo.style("background-color", "#F0DB4F");
  titulo.style("font-size", "30px");

  // botones para acciones
  boton1 = createButton('captura'); // crea boton de captura imagen
  boton1.position(displayWidth/2-tamañoB/2+tamañoB+10, 240*2 + 200); // posicion del boton 
  boton1.size(tamañoB);
  boton1.style("background-color: #F0DB4F");
  boton1.class("btn")
  boton1.mousePressed(capturarimagen); // accion al precionar el boton 

  boton2 = createButton('pausa'); // crea boton de captura imagen
  boton2.position(displayWidth/2-tamañoB/2, 240*2 + 200); // posicion del boton
  boton2.size(tamañoB);
  boton2.style("background-color: #F0DB4F");
  boton2.class("btn btn-warning")
  boton2.mousePressed(pausa); // accion al precionar el boton 

  boton3 = createButton('continuar'); // crea boton de captura imagen
  boton3.position(displayWidth/2-tamañoB/2-tamañoB-10, 240*2 + 200 ); // posicion del boton
  boton3.size(tamañoB);
  boton3.style("background-color: #F0DB4F");
  boton3.class("btn")
  boton3.mousePressed(continuar); // accion al precionar el boton

 // comienza la clasificacion
  nombreL = createP("Nombre: ");
  porcentajeL = createP("Porcentaje: "); // muestra el % de asierto
  nombreL.position(320*2+200,200)
  porcentajeL.position( 320*2+200, 300);
  nombreL.style("font-size", "25px");
  porcentajeL.style("font-size", "25px");
  classifyVideo();
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

function classifyVideo() {
// se comienza con la clasificacion del video  y se obtinen una salida de datos con los resultados obtenidos
  clasificador.classify(capture, gotResults); // se guardan los resultados de la clasificacion en gotResults
}

// TERCER PASO  se obtienen los resultados de la clsificaion en dos variables
function gotResults(error, results){
  if (error) {
      console.log(error); // muestra el error encontrado  
  }else{
      // se almacenan los resultados obtenidos en las variables 
  nombre = results[0].label; // nombre de la clasificacion
  porcentaje = int((results[0].confidence)*100)+"%"; // % de asierto en la clasificacion
  nombreL.hide();
  porcentajeL.hide();
  nombreL = createP("Nombre: " + nombre);
  porcentajeL = createP("Porcentaje: " + porcentaje); // muestra el % de asierto
  if (result == true){

  }else{
    nombreL.position(320*2+200,200)
    porcentajeL.position( 320*2+200, 300);;}
  nombreL.style("font-size", "25px");
  porcentajeL.style("font-size", "25px");
  classifyVideo(); 
  }
} 

function draw(){
  if (result == true){
    image(capture,0, 100,displayWidth,displayWidth+100);
  }
  else{
    image(capture,100, 100,320*2,240*2);
  }
}