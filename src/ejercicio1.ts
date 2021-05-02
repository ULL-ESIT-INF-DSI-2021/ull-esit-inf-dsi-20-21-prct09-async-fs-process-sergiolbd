/**
 * Modo ejecución:
 * tsc
 * node dist/ejercicio1.js helloworld.txt
 */ 
import {access, constants, watch} from 'fs';

// Comprobar que el fichero ha sido pasado por linea comandos
if (process.argv.length !== 3) {
  console.log('Please, specify a file');
} else {
  const filename = process.argv[2];

  /**
   * Comprueba si el fichero existe en el directorio actual, y si si se puede escribir en el
   * @param {string} filename nombre del fichero 
   * @param {number} constants.F_OK Entero opcional que especifica las comprobaciones de accesibilidad a realizar
   * @function (err)=> Función callback que se invoca con un posible argumento de error
   */
  access(filename, constants.F_OK, (err) => {
    if (err) {
      console.log(`File ${filename} does not exist`);
    } else {
      console.log(`Starting to watch file ${filename}`);

      // Observar continuamente los cambios producidos en el fichero pasado como argumento
      const watcher = watch(process.argv[2]);

      watcher.on('change', () => {
        console.log(`File ${filename} has been modified somehow`);
      });

      console.log(`File ${filename} is no longer watched`);
    }
  });
}
