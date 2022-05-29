# Rock, paper & scissors

Pequeña aplicación del popular juego piedra, papel o tijeras. El build se encuentra disponible online en <https://tourmaline-strudel-5108b1.netlify.app](https://tourmaline-strudel-5108b1.netlify.app/>

## Descripción y librerías utilizadas

La aplicación se ha realizado desde 0 utilizando el famoso bundler webpack. Todos los archivos trabajados se encuentran en el directorio "src" y se compilan en el directorio "dist" al realizar el build.

Se ha utizado un Service Worker para poder cachear los assets y tener disponible la aplicación offline. Para ello se ha creado también un archivo "manifest.json" y se han incluido las etiquetas "meta" necesarias.

La estructura de vistas se ha realizado utilizando componentes jsx (librería react y react-dom). El rutado se ha implementado mediante la librería react-router-dom, de modo que se trata de una Single Page Aplication.

Las funciones helper se han testeado unitariamente mediante la librería jest.

La persistencia de datos se ha implementado mediante IndexedDB para poder utilizar la app en modo offline. Para manejar IndexedDB se ha utilizado la librería Dexter Js.

## Build de la aplicación

1.  Realizar **`git clone git@github.com:felixnoga/rockpaperscissors.git`**
2.  Instalar las dependencias con **`npm install`**
3.  Ejecutar **`npm run build`** para crear el build final.
4.  El directorio root de la aplicación es /dist. Utilizar un server o arrancar webpack-dev-server incorporado en la app mediante **`npm start`**.
