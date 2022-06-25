//Se define variables
var lati; 
var long; 
let canvas;
let myMap;
let datos; 
let imagen;
let lat;
let lon;
let img;

//Procedimiento que carga los datos del archivo CSV, es el primer procedimiento que se ejecuta
function preload() {
  datos = loadTable("cordenadas.csv", "csv", "header"); //Almacenamos los datos del CSV con las clasificaciones de distintos lugares en una variable
}

//Procedimiento que se ejecutara luego del preload, es el programa principal
function setup() {
  canvas = createCanvas(displayWidth,displayHeight);//Se crea lienzo de la pagina de pantalla completa
  initMap();//Se llama a al procedimiento initMap que mostrara el mapa
}

//Procedimiento que creara y mostrara el mapa
function initMap(){
    const mappa = new Mappa('Leaflet');//Se crea un mapa 
    const options = {
    lat: -34.6075682,//Se carga una latitud para que cuando se cargue la pagina nos lleve a una ubicacion
    lng: -58.4370894,//Se carga una longitud para que cuando se cargue la pagina nos lleve a una ubicacion
    zoom: 8,//Se carga el zoom que tendra la ubicacion colocada en el mapa
    style: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'//Se carga el estilo del mapa
    }
    myMap = mappa.tileMap(options);//Se configura el mapa con la ubicacion,zoom y estilo
    myMap.overlay(canvas);//Se muestra el mapa
    marcador();//Se llama al procedimiento que marcara todos los puntos de las clasificaciones anteriores cargadas
    myMap.onChange(marcador);//Se llama al procedimiento que marcara todos los puntos de las clasificaciones anteriores cargadas cuando nos movemos para cualquier parte del mapa
}

function marcador(){
    clear(); //Se elimina los puntos del mapa
    let numRows = datos.getRowCount(); //Cuenta el numero de filas que tiene el archivo CSV
    lat = datos.getColumn("lat"); //Se obtienen los datos de la columna de latitud del archivo
    lon = datos.getColumn("lon"); //Se obtienen los datos de la columna de longitud del archivo 
    img = datos.getColumn("img"); //Se obtienen los datos de la columna de imagen del archivo
    //Se marcan los puntos en el mapa de las clasificaciones cargadas en el archivo CSC
    for (let i = 0; i < numRows; i++) {
        imagen=createImg(img[i]);//Se crea una imagen
        imagen.hide();//Se esconde la imagen
        let marcador = myMap.latLngToPixel(lat[i],lon[i]);//Se crea un marcador en la latitud y longitud correspondiente a la fila del archivo
        image(imagen,marcador.x,marcador.y,35,35);//Se coloca la imagen creada anteriormente en el marcador
    }
}
