# Práctica 8: Aplicación de procesamiento de notas de texto
[![Test](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct09-async-fs-process-sergiolbd/actions/workflows/node.js.yml/badge.svg?branch=master)](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct09-async-fs-process-sergiolbd/actions/workflows/node.js.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2021_ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-sergiolbd&metric=alert_status)](https://sonarcloud.io/dashboard?id=ULL-ESIT-INF-DSI-2021_ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-sergiolbd)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2021_ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-sergiolbd&metric=coverage)](https://sonarcloud.io/dashboard?id=ULL-ESIT-INF-DSI-2021_ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-sergiolbd)

# Introducción
En esta primera práctica del segundo bloque de la asignatura, se ha solicitado la implementación de una aplicación de procesamiento de notas de texto, las cuales se puedan añadir modificar, eliminar, listar y leer de un usuario concreto.  
Estos ficheros de notas serán almacenados como ficheros JSON dentro de cada uno de los usuarios.  

# Material usado
* GitHub Actions
  * [Coveralls](https://sonarcloud.io/dashboard?id=ULL-ESIT-INF-DSI-2021_ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-sergiolbd)
  * [Test](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-sergiolbd/actions/workflows/node.js.yml)
  * [SonarCloud](https://sonarcloud.io/dashboard?id=ULL-ESIT-INF-DSI-2021_ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-sergiolbd)
* [API síncrona proporcinada por Node.js](https://nodejs.org/dist/latest-v15.x/docs/api/fs.html#fs_synchronous_api)
* [yargs](https://www.npmjs.com/package/yargs): 
  * `npm install yargs`
  * `npm --save-dev @types/yargs`
    * Herramienta que permite parsear diferentes argumentos pasados a un programa desde la línea de comandos.
* [chalk](https://www.npmjs.com/package/chalk)]:
  * `npm i chalk`
  * `npm --save-dev @types/chalk`
    * Herramienta que permite dar color a la salida por pantalla


# Ejemplo de uso de la aplicación  
![Ejemplo uso](media/EjemploUso.png)  

# Bibliografía
* [Sonar Cloud](https://sonarcloud.io/projects)
* [Node.js](https://nodejs.org/es/)
* [File system Node.js](https://nodejs.org/dist/latest-v16.x/docs/api/fs.html)
* [Apuntes patrones de diseño](https://ull-esit-inf-dsi-2021.github.io/typescript-theory/typescript-patterns.html#singleton)







