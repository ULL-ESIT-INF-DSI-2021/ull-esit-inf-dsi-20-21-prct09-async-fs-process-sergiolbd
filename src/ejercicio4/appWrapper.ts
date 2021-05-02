import * as fs from 'fs';
import { spawn } from 'child_process';

/**
 * Comprobar mediante lstat si la ruta pasada es un directorio o un fichero
 * @param path ruta pasada como parámetro
 */
export function check(path: string): string {
  let type: string = '';
  fs.lstat(path, (err, stats) => {
    if (err) {
      console.log(`Err: ${err}, ${path} not exist`);
      type = 'Not exists';
    } else {
      if (stats.isDirectory()) {
        console.log(`Is a Directory`);
        type = 'directory';
      }
      if (stats.isFile()) {
        console.log('Is a File');
        type = 'file';
      }
    }
  });
  return type;
}

/**
 * 2. Crear un nuevo directorio a partir de una nueva ruta
 * @param path ruta en la que crear un directorio
 */
export function mkdir(path: string) {
  fs.access(path, (err) => {
    if (err) {
      fs.mkdir(path, {recursive: true}, (err) => {
        if (err) {
          console.log(`${err}, \nCannot create directory`);
        } else {
          console.log(`Directory created`);
        }
      });
    } else {
      console.log(`This directory already exists`);
    }
  });
}

/**
 * 3. Listar los ficheros dentro de un directorio.
 * @param path ruta donde listar los ficheros
 */
export function list(path:string) {
  fs.readdir(path, (err, buffer) => {
    if (err) {
      console.log(`${err}`);
    } else {
      if (buffer.length === 0) {
        console.log(`Directory '${path}' is empty`);
      } else {
        buffer.forEach((file) => {
          console.log(file);
        });
      }
    }
  });
}

/**
 * 4. Mostrar el contenido de un fichero
 * @param path ruta donde listar los ficheros
 */
 export function cat(path:string) {
  fs.readFile(path, (err, buffer) => {
    if (err) {
      console.log(`${err}`);
    } else {
      if (buffer.length === 0) {
        console.log(`File '${path}' is empty`);
      } else { 
        console.log(buffer.toString());
      }
    }
  });
}


/**
 * 5. Borrar ficheros y directorios.
 * @param path ruta donde listar los ficheros
 */
export function rm(path:string) {
  fs.lstat(path, (err, stats) => {
    if (err) {
      console.log(`Err: ${err}, ${path} not exist`);
    } else {
      // Comprobamos tipo de archivo y aplicamos su modo de borrado
      if (stats.isDirectory()) {
        fs.rmdir(path, {recursive: true}, (err) => {
          if(err) {
            console.log(err);
          } else {
            console.log(`Delete directory`);
          }
        });
      }
      if (stats.isFile()) {
        fs.unlink(path, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log(`Delete file`);
          }
        });
      }
    }
  });
}

/**
 * Mover y copiar ficheros y/o directorios de una ruta a otra.
 * @param origen 
 * @param destino 
 */
export function move(origen:string, destino: string) {
  fs.access(origen, (err) => {
    if (err) {
      console.log(err);
    } else {
      const movecopy = spawn('cp', ['-r', origen, destino]);
      movecopy.stdout.pipe(process.stdout);
      console.log(`Move and Copy`);
    }
  });
}





