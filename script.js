//Se realiza esto para saber si el navegador soporta service worker
if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./sw.js')//Registramos service worker
        .then(reg=>console.log('registro de SW exitoso',reg))//Mensaje por consola si se registra exitosamente
        .catch(err=>console.warn("Error al tratar de registrar el SW",err))//Mensaje por consolo si no se registra exitosamente
}