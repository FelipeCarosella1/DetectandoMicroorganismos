var lati; // variable de latitud
var long; // variable de longitud
let canvas;
let myMap;
let datos; // variable que almacena los datos del archivo CSV
let imagen;
let lat;
let lon;
let img;


function preload() {
// el primer comoponete es el archivo csv , el segundo es el tipo de archivo
// el tercer componente es el encabezado del archivo exel de datos csv
// asi los datos estaran cargados antes de ejecutar las demas instrucciones
  datos = loadTable("cordenadas.csv", "csv", "header"); // almacenamos los datos en la variable

}

function setup() {
  canvas = createCanvas(displayWidth,displayHeight);
  initMap();
}

function initMap(){
    const mappa = new Mappa('Leaflet');;
    const options = {
    lat: -34.6075682,
    lng: -58.4370894,
    zoom: 8,
    style: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
    }
    myMap = mappa.tileMap(options);
    myMap.overlay(canvas);
    marcador();
    myMap.onChange(marcador);
}

function marcador(){
    clear()
    let numRows = datos.getRowCount(); // almacena las filas como datos
    // almacenamos altitud y longitus en una matriz
    lat = datos.getColumn("lat"); // usamos el nombre que figura en al tabla exel CSV
    lon = datos.getColumn("lon"); // usamos el nombre que figura en la tabla exel CSV 
    img = datos.getColumn("img"); // usamos el nombre que figura en al tabla exel CSV
    // ciclo repetitivo que recorra todos los datos desde 0 hasta el valor de menor de filas 
    for (let i = 0; i < numRows; i++) {
        imagen=createImg(img[i]);
        imagen.hide();
        let marcador = myMap.latLngToPixel(lat[i],lon[i]);
        image(imagen,marcador.x,marcador.y,35,35);        
    }
}

function gurdar(lati,long){
    let table;
    let newRow
    table = new p5.Table();
    table.addColumn('lat');
    table.addColumn('lon');
    table.addColumn('img');
    let numRows = datos.getRowCount(); // almacena las filas como datos
    // almacenamos altitud y longitus en una matriz
    lat = datos.getColumn("lat"); // usamos el nombre que figura en al tabla exel CSV
    lon = datos.getColumn("lon"); // usamos el nombre que figura en la tabla exel CSV 
    img = datos.getColumn("img"); // usamos el nombre que figura en al tabla exel CSV
    // ciclo repetitivo que recorra todos los datos desde 0 hasta el valor de menor de filas 
    for (let i = 0; i < numRows; i++) {
        newRow = table.addRow();
        newRow.setNum('lat', lat[i]);
        newRow.setNum('lon', lon[i]);
        newRow.setString('img', img[i]);
    }
    newRow = table.addRow();
    newRow.setNum('lat', lati);
    newRow.setNum('lon', long);
    newRow.setString('img', "agua_enojada.jpg");
    saveTable(table, 'cordenadas.csv');
}