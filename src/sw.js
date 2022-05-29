const staticResourcesCache = "static-cache-v1";
const resources = [
  "/",
  "/index.html",
  "/js/index.bundle.js",
  "/images/icon_192.png",
  "/images/icon_512.png",
  "https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;700&display=swap",
  "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
];

//Evento de instalación del service worker
self.addEventListener("install", (e) => {
  console.log("Intentando instalar el SW");
  e.waitUntil(
    caches.open(staticResourcesCache).then((cache) => {
      return cache.addAll(resources);
    })
  );
});

//Evento de activación del service worker
self.addEventListener("activate", (e) => {
  //Borramos las caches que no están definidas por nosotros
  caches.keys().then((cacheNames) => {
    return Promise.all(
      cacheNames.map((name) => {
        if (name !== staticResourcesCache) {
          return caches.delete(name);
        }
      })
    );
  });
});

//Interceptación de eventos Fetch en el service worker
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(e.request).catch((e) => {
          console.log(e);
        })
      ); //devolvemos primero la respuesta en cache si existe.
    })
  );
});
