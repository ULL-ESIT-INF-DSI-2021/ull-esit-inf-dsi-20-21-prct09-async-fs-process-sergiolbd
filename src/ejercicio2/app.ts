import {watchFile, access, constants} from 'fs';
import {spawn} from 'child_process';
import { ChildProcessWithoutNullStreams } from 'node:child_process';

/**
 * Modo encargado de mostrar info sobre un fichero rediriguiendo salida
 * del comando wc a la salida de echo
 * @param filename Fichero a analizar 
 * @param option Tipo de información a mostrar
 */
export function mode1(filename: string, option: string) {
 /**
  * wc fichero dará resultado de forma x y z 
  * x = nº lineas
  * y = nº palabras
  * z = caracteres o nº de bytes
  * Redirigir la salida de un comando hacia otro
  */
  access(filename, constants.R_OK, (err) => {
    console.log('Ejecutando modo 1');
    if (err) {
      console.log(`${filename} ${err ? 'does not exist' : 'exists'}`);
    } else {
      const wc = spawn('wc', [filename]);
      let echo: ChildProcessWithoutNullStreams;

      let wcOutput = '';
      wc.stdout.on('data', (piece) => wcOutput += piece);

      wc.on('close', () => {
        const wcOutputAsArray = wcOutput.split(/\s+/);
        switch (option) {
          case 'line':
            echo = spawn('echo', [`File ${filename} has ${wcOutputAsArray[1]} lines`]);
            echo.stdout.pipe(process.stdout);
            break;
          case 'words':
            echo = spawn('echo', [`File ${filename} has ${wcOutputAsArray[2]} words`]);
            echo.stdout.pipe(process.stdout);
            break;
          case 'characters':
            echo = spawn('echo', [`File ${filename} has ${wcOutputAsArray[1]} characters`]);
            echo.stdout.pipe(process.stdout);
            break;
          case 'combination': 
            echo = spawn('echo', [`File ${filename} has ${wcOutputAsArray[1]} lines`, 
                                  `\nFile ${filename} has ${wcOutputAsArray[2]} words`, 
                                  `\nFile ${filename} has ${wcOutputAsArray[3]} characters`]);
            echo.stdout.pipe(process.stdout);
            break;
          default: console.log(`--option=${option} not exist`);
            break;
        }
      });
    }
  });
}

/**
 * Modo 2, método que sin hacer uso de pipe y creando subprocesos 
 * @param filename Fichero a analizar
 * @param option Tipo de info a mostrar
 */
export function mode2(filename: string, option: string) {
  console.log('Ejecutando modo 2');
  access(filename, constants.R_OK, (err) => {
    if (err) {
      console.log(`${filename} ${err ? 'does not exist' : 'exists'}`);
    } else {
      const wc = spawn('wc', [filename]);
    
      let wcOutput = '';
      wc.stdout.on('data', (piece) => wcOutput += piece);
    
      wc.on('close', () => {
        const wcOutputAsArray = wcOutput.split(/\s+/);
        switch (option) {
          case 'line':
            console.log(`File ${filename} has ${wcOutputAsArray[1]} lines`);
            break;
          case 'words':
            console.log(`File ${filename} has ${wcOutputAsArray[2]} words`);
            break;
          case 'characters':
            console.log(`File ${filename} has ${wcOutputAsArray[3]} characters`);
            break;
          case 'combination': 
            console.log(`File ${filename} has ${wcOutputAsArray[1]} lines`);
            console.log(`File ${filename} has ${wcOutputAsArray[2]} words`);
            console.log(`File ${filename} has ${wcOutputAsArray[3]} characters`);
            break;
          default: console.log(`--option=${option} not exist`);
            break;
        }
      });
    }
  }); 
}