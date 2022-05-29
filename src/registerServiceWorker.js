//Función para registrar el service worker en nuestro navegador (si es soportado)

const registerServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").then((registration) => {
      console.log("Registrado con el scope: ", registration.scope);
    });
  }
};
export default registerServiceWorker;
