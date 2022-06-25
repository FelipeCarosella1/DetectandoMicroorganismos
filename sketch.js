//Se define variables
var capture;
let boton1;
let boton2;
let boton3;
let boton4;
let boton5;
var seccion;
let titulo;
let tituloS;
let clasificador;
var result;
let margen;
let tamañoB;
let nombre;
let porcentaje;
let nombreL;
let porcentajeL;
var lati; 
var long; 
let datos; 
let imagen;
let lat;
let lon;
let img;
let fechas;
let horas;
let imagenClasificacion;
let cordenadaX;
let cordenadaY;
let cargadoCordenadas = false;
let cargarClasiificacion = false;
let hora;
let fecha;


//Procedimiento que carga los datos del archivo CSV y ademas carga el clasificador creado es el que primero se ejecuta
function preload () {
  // cargamos el link donde se encuentra nuestro modelo pre entrehado por Teachable Machine 
  // model.json contiene la arquitectura del modelo utilizada por la biblioteca TensorFlow.js  
  clasificador = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Mc7tUTI1E/'+ 'model.json');
  datos = loadTable("cordenadas.csv", "csv", "header"); //Clmacenamos los datos del CSV con las clasificaciones anteriores en una variable
}

//Procedimiento que se ejecutara luego del preload, es el programa principal
function setup() {
  //Activa la camara frontal si es un dispositivo movil
    if (isMobileDevice()) {//Si es un dispositivo movil
      console.log("Es un dispositivo movil");//Avisa por consola que es un dispositivo movil
      var constraints = {
            audio: false, // desactiva el audio de la cam o dispositivo movil
            video: {
            facingMode: {
                exact: "environment" // accede a la camara frontal
            }}};
      capture = createCapture(constraints); // objeto para control camara frontal movil
      capture.hide(); //Se oculta la camara
      /*Se le cargan valores a las variables que se utilizan para colocar distintos elementos en la pagina para la visualizacion en 
      dispositivos moviles*/
      margen = 50;
      tamañoB = 100;
      positionRect = [0,displayWidth+300,displayWidth,480]
      positionCam =[0, 0,displayWidth,displayWidth+100]
      positionEtiquetas = [50,displayWidth+400];
      positiontituloS = [50,displayWidth+300];
      canvasSizes = [displayWidth, displayHeight+550]
      positionBotonY = displayWidth+100;
  } else {//Si es un dispositivo no movil
      console.log("No es un dispositivo movil");//Si no es un dispositivo movil lo escribira por consola
      capture = createCapture(VIDEO);//Se crea el objeto para controlar la camara del dispositivo
      capture.hide();//Se oculta la camara
      /*Se le cargan valores a las variables que se utilizan para colocar distintos elementos en la pagina para la visualizacion en 
      dispositivos que no sean moviles*/
      margen = 100;
      tamañoB = 300;
      positionRect = [320*2+200,100,displayWidth-(320*2+margen+100)-margen,240*2];
      positionCam =[100, 100,320*2,240*2];
      positionEtiquetas = [320*2+250,200];
      positiontituloS = [320*2+200,100];
      canvasSizes = [displayWidth, displayHeight+50]
      positionBotonY = 240*2+2*100;
      //Se crea,coloca y da estilo a una etiqueta de texto que sera el titulo de la camara en la pagina web
      tituloV = createP("Video");
      tituloV.position(margen,100);
      tituloV.style("background-color", "#F1D7BE");
      tituloV.style("font-size", "30px");
  }
  //Se crea el lienzo de la pagina
  createCanvas(canvasSizes[0], canvasSizes[1]); // crea un lienzo de pantalla completa
  background("#2B2B2B");  //

  //Se crea etiqueta de texto
  tituloS = createP("Clasificación");
  tituloS.position(positiontituloS[0],positiontituloS[1]);
  tituloS.style("background-color", "#F1D7BE");
  tituloS.style("font-size", "30px");

  //Creacion de la seccion o rectangulo de clasificacion
  fill("#F1D7BE");
  seccion = rect(positionRect[0],positionRect[1],positionRect[2],positionRect[3]);

  // Se crean, coloca y se da estilo a los botones de la pagina
  boton1 = createButton('captura'); // crea boton de captura imagen
  boton1.position(displayWidth/2-tamañoB/2+tamañoB+10,positionBotonY); // posicion del boton 
  boton1.size(tamañoB);//Tamaño de boton
  boton1.style("background-color: #F1D7BE");//Color de fondo del boton
  boton1.class("btn");//estilo de boton
  boton1.mousePressed(capturarimagen); // accion al precionar el boton 

  boton2 = createButton('Clasificar'); // crea boton de clasificar que hara una pausa de la camara y clasificara la imagen
  boton2.position(displayWidth/2-tamañoB/2, positionBotonY); // posicion del boton
  boton2.size(tamañoB);//Tamaño de boton
  boton2.style("background-color: #F1D7BE");//Color de fondo del boton
  boton2.class("btn btn-warning");//estilo de boton
  boton2.mousePressed(clasificacion); // accion al precionar el boton 

  boton3 = createButton('continuar'); //Crea boton de continuar que reanudara la camara
  boton3.position(displayWidth/2-tamañoB/2-tamañoB-10, positionBotonY); // posicion del boton
  boton3.size(tamañoB);//Tamaño de boton
  boton3.style("background-color: #F1D7BE");//Color de fondo del boton
  boton3.class("btn");//estilo de boton
  boton3.mousePressed(continuar); // accion al precionar el boton

 // Crea las etiquetas de texto para la clasificacion y localizacion
  nombreL = createP("Nombre: ");//Se crea etiqueta para luego colocar cual fue la clasificacion
  porcentajeL = createP("Porcentaje: "); //Se crea etique para que luego se muestre el % de asierto
  nombreL.position(positionEtiquetas[0],positionEtiquetas[1]);//Posicion de etiqueta
  porcentajeL.position(positionEtiquetas[0], positionEtiquetas[1]+100);//Posicion de etiqueta
  nombreL.style("font-size", "25px");//fija el tamaño del texto
  porcentajeL.style("font-size", "25px");//fija el tamaño del texto
  cordenadaX = createP("Latitud: ");//Se crea etiqueta para luego colocar la latitud en la que se encuentra el dispositivo
  cordenadaY = createP("Longitud: ");//Se crea etiqueta para luego colocar la longitud en la que se encuentra el dispositivo
  cordenadaX.position(positionEtiquetas[0],positionEtiquetas[1]+200);//Posicion de etiqueta
  cordenadaY.position(positionEtiquetas[0],positionEtiquetas[1]+300);//Posicion de etiqueta
  cordenadaX.style("font-size", "25px"); // fija el tamaño del texto
  cordenadaY.style("font-size", "26px"); // fija el tamaño del texto
  if('geolocation' in navigator) {//Si la geolocalizacion se encuentra activada en el dispositivo
        console.log('geolocation funcionando');
        navigator.geolocation.getCurrentPosition(async position => { // getCurrentPosition() se usa para obtener la posicion de un dispositivo 
            lati = position.coords.latitude; // obtenemos latitud en la que se encuentra el dipositivo
            long = position.coords.longitude; // obtenemos longitud en la que se encuentra el dipositivo
            cordenadaX.hide();//Se esconden la etiqueta para ser reemplazada
            cordenadaY.hide();//Se esconden la etiqueta para ser reemplazada
            cordenadaX = createP("Latitud: "+lati);//Se crea etiqueta con la latitud del dispositivo
            cordenadaY = createP("Longitud: "+long);//Se crea etiqueta con la longitud del dispositivo
            cordenadaX.position(positionEtiquetas[0],positionEtiquetas[1]+200); 
            cordenadaY.position(positionEtiquetas[0],positionEtiquetas[1]+300); 
            cordenadaX.style("font-size", "25px"); // fija el tamaño del texto
            cordenadaY.style("font-size", "26px"); // fija el tamaño del texto 
            cargarCordenadas = true;//Se carga variable que indicara si la geolocalizacion se encuentra o no activa
            });
    } else {//Si la geolocalizacion esta desactivada en el dispositivo
        console.log('geolocation NO funcionando');//Se escribe mensaje por consola
    };
  boton4 = createButton('Ver Mapa'); //crea boton para ver mapa en el que se encuentra la clasificacion en diferentes partes del mundo 
  boton4.position(displayWidth/2-tamañoB-65-10, positionBotonY+100); //posicion del boton
  boton4.size(tamañoB+65);//Tamaño de boton
  boton4.style("background-color: #F1D7BE");//Color de fondo del boton 
  boton4.class("btn");//Estilo de boton
  boton4.mousePressed(verMapa);//Accion al precionar el boton
  boton5 = createButton('Cargar Cordenadas'); // crea boton para cargar las cordenadas en el mapa con la respectiva clasificacion
  boton5.position(displayWidth/2+10, positionBotonY+100); // posicion del boton
  boton5.size(tamañoB+65);//Tamaño de boton
  boton5.style("background-color: #F1D7BE");//Color de fondo del boton 
  boton5.class("btn");//Estilo de boton
  boton5.mousePressed(cargarCordenadas);//Accion al precionar el boton
  }

//Procedimiento al presionar el boton de clasificacion 
function clasificacion() {
    capture.stop(); // pausa el video
    classifyVideo();//Se llama a procemiento que clasificara imagen del momento
}

//Procedimiento al presionar el boton de continuar 
function continuar() {
  capture.loop(); // retoma el video
}

//Funcion que define si es pantalla de PC o dispostivo mobil 
function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

//Procedimiento al presionar el boton de capturar imagen
function capturarimagen() {
    save("image"+".jpg"); //Captura imagen en formato jpg
}

//Procedimiento que obtendra la clasificacion de la imagen
function classifyVideo() {
  clasificador.classify(capture, gotResults); // se guardan los resultados de la clasificacion en gotResults
}

//Procedimiento que guardara y mostrara resultados de la clasificacion
function gotResults(error, results){
  if (error) {
      console.log(error); // muestra el error encontrado  
  }else{
    nombre = results[0].label;//Se almacena el resultado obtenido del nombre de la clasificacion
    porcentaje = int((results[0].confidence)*100)+"%";//Se almacena el resultado obtenido del % de acierto en la clasificacion
    nombreL.hide();//Se esconde la etiqueta de nombre de clasificacion para luego colocar la actualizada
    porcentajeL.hide();//Se esconde la etiqueta de % de clasificacion para luego colocar la actualizada
    nombreL = createP("Nombre: " + nombre);//Crea la etiqueta con el nombre de la clasificacion actualizada
    porcentajeL = createP("Porcentaje: " + porcentaje);//Crea la etiqueta con el % de acierto de la clasificacion actualizada
    nombreL.position(positionEtiquetas[0],positionEtiquetas[1]);//Posicion de etiqueta
    porcentajeL.position(positionEtiquetas[0], positionEtiquetas[1]+100);//Posicion de etiqueta
    nombreL.style("font-size", "25px");//Tamaño de la letra de la etiqueta
    porcentajeL.style("font-size", "25px");//Tamaño de la letra de la etiqueta
    cargarClasiificacion = true;//Se carga variable que indicara si la clasificacion se encuentra o no realizada
  }
}

//Procedimiento que cargara cordenadas con la clasificacion en el archivo CSV para luego mostrarse en el mapa
function cargarCordenadas(){
    if (cargarCordenadas==true & cargarClasiificacion==true){//Verifica que se cargaran las cordenadas y se haya realizado la clasificacion
        //Se definen variables
        let table;
        let newRow;
        //Verificara que clasificacion se obtuvo para asociarla al nombre de una imagen
        if (nombre == "Levaduras"){
          imagen = "levadura.png";//Se carga la variable con el nombre de la imagen
        }else{
          if(nombre == "Microorganismos"){
            imagen = "contaminada.png";//Se carga la variable con el nombre de la imagen
          }else{
            imagen = "limpia.png";//Se carga la variable con el nombre de la imagen
          }
        }
        fecha = day()+"/"+month()+"/"+year();//Se carga la fecha actual en la variable
        hora =  hour()+":"+minute()+":"+second();//Se carga la hora, minutos y segundos actuales en la variable
        table = new p5.Table();//Se crea una tabla
        table.addColumn('lat');//Se agrega columna de latitud
        table.addColumn('lon');//Se agrega columna de longitud
        table.addColumn('img');//Se agrega columna de nombre de imagen
        table.addColumn('fecha');//Se agrega columna de fecha
        table.addColumn('hora');//Se agrega columna de hora
        let numRows = datos.getRowCount(); //Cuenta el numero de filas que tiene el archivo CSV
        lat = datos.getColumn("lat"); //Se obtienen los datos de la columna de latitud del archivo
        lon = datos.getColumn("lon"); //Se obtienen los datos de la columna de longitud del archivo
        img = datos.getColumn("img"); //Se obtienen los datos de la columna de imagen del archivo
        horas = datos.getColumn("hora"); //Se obtienen los datos de la columna de hora del archivo
        fechas = datos.getColumn("fecha"); //Se obtienen los datos de la columna de fecha del archivo
        //Se carga en la tabla los datos que se encuentran en el archivo CSV
        for (let i = 0; i < numRows; i++) {
          newRow = table.addRow();//Se agrega una fila a la tabla
          newRow.setNum('lat', lat[i]);//Se le agrega a la columna de lat de la tabla la latitud correspondiente a la fila del archivo
          newRow.setNum('lon', lon[i]);//Se le agrega a la columna de lon de la tabla la longitud correspondiente a la fila del archivo
          newRow.setString('img', img[i]);//Se le agrega a la columna de img de la tabla la imagen correspondiente a la fila del archivo
          newRow.setString('fecha',str(fechas[i]));//Se le agrega a la columna de fecha de la tabla la fecha correspondiente a la fila del archivo
          newRow.setString('hora',str(horas[i]));//Se le agrega a la columna de horas de la tabla la hora correspondiente a la fila del archivo
        }
        newRow = table.addRow();//Se agrega una fila a la tabla
        newRow.setNum('lat', lati);//Se le agrega a la columna de lat de la tabla la latitud correspondiente del dispositivo
        newRow.setNum('lon', long);//Se le agrega a la columna de lon de la tabla la longitud correspondiente del dispositivo
        newRow.setString('img', imagen);//Se le agrega a la columna de img de la tabla la imagen correspondiente de la clasificacion
        newRow.setString('fecha',str(fecha));//Se le agrega a la columna de fecha de la tabla la fecha actual
        newRow.setString('hora',str(hora));//Se le agrega a la columna de hora de la tabla la hora actual
        saveTable(table, 'cordenadas.csv');//Se descarga o guarda la tabla como archivo CSV
    }else{//Cuando la clasificacion no se realizo o la geolocolizacion esta desactivada
      if (cargarClasiificacion==true){//Si la geolocalizacion no se activo
        window.alert('Para poder cargar tus cordenadas con tu clasificacion debes activar tu ubicacion en tu dispositivo y refrescar la pagina.');//Mensaje de alerta que se vera en la pagina
      }else{
        if (cargarCordenadas==true){//Si la clasificacion no se realizo
          window.alert('Para poder cargar tus cordenadas con tu clasificacion debes hacer una clasificacion.');//Mensaje de alerta que se vera en la pagina
      }else{//Si la geolocalizacion no se activo y la clasificacion no se realizo
        window.alert('Para poder cargar tus cordenadas con tu clasificacion debes activar tu ubicacion en tu dispositivo y refrescar la pagina. Y luego debes hacer una clasificacion.');//Mensaje de alerta que se vera en la pagina
      }
    }
  }
}

//Procedimiento que ejecutara el index que creara el mapa
function verMapa(){
  window.location.href = "./index1.html";//Se crea una nueva pagina con el index que mostrara el mapa
}

//Procedimiento para mostrar la web cam, este procedimiento se ejecuta luego del setup siempre hasta que sea detenido el programa
function draw(){
  image(capture,positionCam[0],positionCam[1],positionCam[2],positionCam[3]);//Se posiciona la imagen de la camara
}
