// Definimos un nombre y versión para nuestra caché
const CACHE_NAME = 'obras-de-arte-juego-cache-v1';

// Lista de todos los archivos que nuestra aplicación necesita para funcionar offline
const assetsToCache = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './manifest.json',
    
    // Iconos y UI
    './img/favicon.png',
    './img/portada.jpg',
    './img/icon-192.png',
    './img/icon-512.png',
    
    // Audios
    './audio/acierto.mp3',
    './audio/fallo.mp3',
    './audio/start.mp3',
    
    // --- IMPORTANTE: Lista de las 50 imágenes de las obras de arte ---
    './img/la-noche-estrellada.jpg',
    './img/la-mona-lisa.jpg',
    './img/el-grito.jpg',
    './img/la-joven-de-la-perla.jpg',
    './img/guernica.jpg',
    './img/la-persistencia-de-la-memoria.jpg',
    './img/las-meninas.jpg',
    './img/el-nacimiento-de-venus.jpg',
    './img/la-ronda-de-noche.jpg',
    './img/impresion-sol-naciente.jpg',
    './img/el-beso.jpg',
    './img/gothico-americano.jpg',
    './img/el-matrimonio-arnolfini.jpg',
    './img/tarde-de-domingo-en-la-grande-jatte.jpg',
    './img/la-libertad-guiando-al-pueblo.jpg',
    './img/el-tres-de-mayo.jpg',
    './img/el-caminante-sobre-el-mar-de-nubes.jpg',
    './img/noctambulos.jpg',
    './img/la-escuela-de-atenas.jpg',
    './img/la-creacion-de-adan.jpg',
    './img/nenufares.jpg',
    './img/almuerzo-sobre-la-hierba.jpg',
    './img/baile-en-el-moulin-de-la-galette.jpg',
    './img/las-espigadoras.jpg',
    './img/el-jardin-de-las-delicias.jpg',
    './img/cazadores-en-la-nieve.jpg',
    './img/el-columpio.jpg',
    './img/saturno-devorando-a-su-hijo.jpg',
    './img/la-gitana-dormida.jpg',
    './img/composicion-viii.jpg',
    './img/broadway-boogie-woogie.jpg',
    './img/el-hijo-del-hombre.jpg',
    './img/latas-de-sopa-campbell.jpg',
    './img/la-gran-ola-de-kanagawa.jpg',
    './img/la-balsa-de-la-medusa.jpg',
    './img/la-muerte-de-marat.jpg',
    './img/los-jugadores-de-cartas.jpg',
    './img/la-danza.jpg',
    './img/las-senoritas-de-avignon.jpg',
    './img/la-traicion-de-las-imagenes.jpg',
    './img/baco.jpg',
    './img/la-ultima-cena.jpg',
    './img/la-primavera.jpg',
    './img/los-embajadores.jpg',
    './img/vista-de-toledo.jpg',
    './img/el-viejo-guitarrista.jpg',
    './img/la-madre-de-whistler.jpg',
    './img/en-el-moulin-rouge.jpg',
    './img/el-bano.jpg',
    './img/el-temerario-remolcado.jpg'
];

/**
 * Evento 'install': Se dispara cuando el Service Worker se instala.
 * Abrimos nuestra caché y añadimos todos los archivos de la lista.
 */
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache abierta. Añadiendo assets...');
                return cache.addAll(assetsToCache);
            })
            .catch(err => {
                console.error('Fallo al abrir la caché durante la instalación:', err);
            })
    );
});

/**
 * Evento 'fetch': Se dispara cada vez que la aplicación pide un recurso (una imagen, un script, etc.).
 * Interceptamos la petición y respondemos con el archivo desde la caché si lo tenemos.
 * Si no está en la caché, lo pedimos a la red.
 */
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Si encontramos una respuesta en la caché, la devolvemos.
                if (response) {
                    return response;
                }
                // Si no, hacemos la petición a la red.
                return fetch(event.request);
            })
    );
});

/**
 * Evento 'activate': Se dispara cuando el Service Worker se activa.
 * Es un buen lugar para limpiar cachés antiguas si hemos actualizado la versión.
 */
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        // Si encontramos una caché que no está en nuestra "lista blanca", la borramos.
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});