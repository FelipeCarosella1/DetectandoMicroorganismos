;
//ESTE ES NUESTRO SERVICE WORKER
//Asignar nombre y version al cache
const CACHE_NAME = 'v1_cache_Mas_Agua_Limpia_Mas_Vida',//Nombre de cache
  urlsToCache = [//Son las url que se cachean
    './',
    './script.js',
    './sketch1.js',
    './icon.png'
  ] //Se guardan los

//3 EVENTOS DEL SERVICE WORKER

//Durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)//Esperar hasta que el service worker abra nuestro cache
      .then(cache => {
        return cache.addAll(urlsToCache)//Se agrega al cache del dispositivo todas las urls de la variable usrlsToCache
          .then(() => self.skipWaiting())//Seguir esperando hasta que termine la lista
      })
      .catch(err => console.log('Falló registro de cache', err))//Si da error enviamos mensaje por consola
  )
})

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME] //Se utiliza para saber si cambio el cache
  e.waitUntil(
    caches.keys()//Permite ver las llaves del cache que sufrieron modificaciones
      .then(cacheNames => {//Devuelve el conjunto de archivos del cache
        return Promise.all(
          cacheNames.map(cacheName => {//Permite evaluar cada archivo e cache
            //Eliminamos lo que ya no se necesita en cache
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      // Le indica al SW activar el cache actual
      .then(() => self.clients.claim())
  )
})

//cuando el navegador recupera una url
self.addEventListener('fetch', e => {
  //Responder ya sea con el objeto en caché o continuar y buscar la url real
  e.respondWith(
    caches.match(e.request)
      .then(res => {
        if (res) {
          //recuperar del cache
          return res
        }
        //recuperar de la petición a la url
        return fetch(e.request)
      })
  )
})