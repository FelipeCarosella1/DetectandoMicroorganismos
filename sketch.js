let boton1; 
let boton2;
let seaRoseLines;
let margen
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
        margen = 200;
    } else {
            console.log("No es un dispositivo movil");
            margen = 0;
          }
  texto = createP("Clasificar");
  texto.position(50,100);
  texto.style("background-color", "#F0DB4F");
  texto.style("font-size", "30px");
  // texto principal a desplegarce
  textSize(16);
  for (var i = 0; i < seaRoseLines.length; i++) {
    if i > displayWidth-margen{
        text(seaRoseLines[i], 20, 150+i*20);
  }
}

//  define si es pantalla de PC o dispostivo mobil 
function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};