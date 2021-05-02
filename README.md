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

# [Ejercicios](src/)
## [Ejercicio 1](src/ejercicio1.ts)
  En este primer ejercicio se pide realizar una traza de ejecución de un pequeño programa, en dicha traza deberá aparecer el siguiente contenido:  
  * **Pila de llamada o Call Stack**
  * **Registro de eventos de la API o Node.js API**
  * **Cola de manejadores de Node.js o Callback queue**
  * **Consola**
  Tras realizar dicha traza el resultado es el siguiente: 
  ![Imágenenes]()


  * Función **access(path, mode, callback)**: 
    Esta función se encarga de comprobar los permisos de un usuario para el archivo o directorio especificado por `path`. 
    Si se hace referencia a `access` usado en el código a realizar la traza, la función de dicho `access` es la de comprobar si el archivo pasado por parámetros existe en el directorio actual y si además se puede escribir en él.
    ```typescript
    /**
    * Comprueba si el fichero existe en el directorio actual, y si si se puede escribir en el
    * @param {string} filename nombre del fichero 
    * @param {number} constants.F_OK Entero opcional que especifica las comprobaciones de accesibilidad a realizar
    * @function (err)=> Función callback que se invoca con un posible argumento de error
    */
    access(filename, constants.F_OK, (err) => {
    ```
  * Objeto **constants**: 
  Este objeto devolverá un objeto que contiene constantes de uso común para las operaciones del sistema de archivos.
  Es decir es un objeto mediante el cual se pueden obtener otras constantes para realizar determinadas comprobaciones sobre archivos, como se realiza en el código con `constants.F_OK` cuya constante es una bandera que indica que el archivo es visible para el proceso de llamada es decir para un `access` por ejemplo comprobando asi si existe dicho archivo.
    * Tipos de constantes: 
      * Acceso a archivos
      * Copia de archivos
      * Apertura de archivos
      * Tipo de archivo
      * Modo de archivo

## [Ejercicio 2](src/ejercicio1.ts)
  En este segundo ejercicio se solicita escribir una aplicación encargada de mostrar información sobre el número de líneas, palabras o caracteres que tendrá un fichero de texto.  
  Para ello se han creado dos funciones, pues se solicitaba que dicho ejercicio se realizara de dos maneras diferentes, y estas maneras son las siguientes: 
    **1. Haciendo uso del método pipe de un Stream para poder redirigir la salida de un comando hacia otro.**  
    Para ello se ha desarrollado la función `mode1(filename: string, option: string)` la cual recibe como parámetros el nombre del fichero a analizar y las opciones, estas opciones son: `line`, `words`, `characters` o `combination` y dependiendo de la introducida por linea comandos se mostrará una información u otra.  
    En cuanto el desarrollo de la función primero se ha comprobado que dicho fichero se puede existe y se puede leer mediante `access(filename, constants.R_OK, (err) => { ... } `, y en el caso de que no se produzca ningún error se crea un proceso adicional que ejecuta el comando `wc helloworld.txt` haciendo uso de la función `spawn`, esta a su vez devuelve un objeto `childProcess`. Tras ello se lee el contenido del stream obtenido y se almacena en la variable `wcOutput`, para por último añadir un manejador ejecutado sobre el objeto wc, que se ejecuta cuando wc emite el evento `close`. Haciendo uso de este manejador se muestra por consola las estadísticas del fichero, redirigiendo la salida estadar de wc obtenida a la salida del comando `echo` encargado de la salida por consola de la información obtenida mediante `wc helloworld.txt`.
    **2. Sin hacer uso del método pipe, solamente creando los subprocesos necesarios y registrando manejadores a aquellos eventos necesarios para implementar la funcionalidad solicitada.**
    En este segundo modo se ha procedido de manera similar al caso anterior pero sin hacer uso de `pipe` para redirigir la salida del `wc` al `echo`, en este caso simplemente mediante la creación de subprocesos se ha comprobado que el fichero es accesible y se puede leer, se ha ejecutado el comando mediante `spawn`, se ha almacenado el contenido en la variable `wcOutput` para finalmente mostrar por consola mediante un `console.log(...)` la información seleccionada mediante la `option` 

  Además se ha hecho uso de `yargs` para pasar los parametros necesarios por línea comandos, los parametros a indicar son los siguientes: 
  * --ruta="nombre fichero"
  * --mode="1 o 2" --> Hace referencia al modo de ejecución seleccionado si con pipe (1) o sin pipe (2)
  * --option="line, words o characters" o por defecto se ha configurado la opción de que se muestre una combinación de las tres opciones. 

  **Ejemplo ejecución: **
  ![Prueba](media/Pruebaejercicio2.png)
  
## [Ejercicio 3](src/ejercicio1.ts)

  La aplicación a desarrollar deberá controlar los cambios realizados sobre todo el directorio especificado al mismo tiempo que dicho usuario interactúa con la aplicación de procesamiento de notas. Nótese que no hace falta modificar absolutamente nada en la aplicación de procesamiento de notas. Es una aplicación que se va a utilizar para provocar cambios en el sistema de ficheros.

Para ello, utilice la función watch y no la función watchFile, dado que esta última es más ineficiente que la primera. La función watch devuelve un objeto Watcher, que también es un objeto EventEmitter. ¿Qué evento emite el objeto Watcher cuando se crea un nuevo fichero en el directorio observado? ¿Y cuando se elimina un fichero existente? ¿Y cuando se modifica?

Con cada cambio detectado en el directorio observado, el programa deberá indicar si se ha añadido, modificado o borrado una nota, además de indicar el nombre concreto del fichero creado, modificado o eliminado para alojar dicha nota.

Programe defensivamente, es decir, trate de controlar los potenciales errores que podrían surgir a la hora de ejecutar su aplicación.

Por último, trate de contestar a las siguientes preguntas:

    ¿Cómo haría para mostrar, no solo el nombre, sino también el contenido del fichero, en el caso de que haya sido creado o modificado?
    ¿Cómo haría para que no solo se observase el directorio de un único usuario sino todos los directorios correspondientes a los diferentes usuarios de la aplicación de notas?

## [Ejercicio 4](src/ejercicio1.ts)





# Ejemplo de uso de la aplicación  
![Ejemplo uso](media/EjemploUso.png)  

# Bibliografía
* [Sonar Cloud](https://sonarcloud.io/projects)
* [Node.js](https://nodejs.org/es/)
* [File system Node.js](https://nodejs.org/dist/latest-v16.x/docs/api/fs.html)
* [Apuntes patrones de diseño](https://ull-esit-inf-dsi-2021.github.io/typescript-theory/typescript-patterns.html#singleton)







