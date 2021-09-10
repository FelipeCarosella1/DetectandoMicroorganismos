let boton1; 
let boton2;
let seaRoseLines;
function preload () {
// lee el archivo de texto y coloca su contenido en una 
// matriz de cadena con un elemento de matriz por linea en un archivo fuente
  seaRoseLines = loadStrings ('texto.txt'); // siempre debe estar en preload para que funcione
}


function setup() {
  createCanvas(displayWidth, displayHeight); // crea un lienzo de pantalla completa
  background(50);  
  // texto principal a desplegarce
  textSize(16);
  for (var i = 0; i < seaRoseLines.length; i++) {
    fill(128+(i*10));
    text(seaRoseLines[i], 20, 150+i*20);
  }
}
