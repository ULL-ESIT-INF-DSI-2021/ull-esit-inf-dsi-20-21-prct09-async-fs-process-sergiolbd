import * as yargs from 'yargs';
import {cat, check, list, mkdir, move, rm} from './appWrapper';

/**
 * Comando para comprobar si es un fichero o directorio
 */
yargs.command({
  command: 'check', 
  describe: 'Check if it is a directory or a file', 
  builder: {
    ruta: {
      describe: 'ruta',
      demandOption: true,
      type: 'string',
    },
  },

  handler(argv) {
    if (typeof argv.ruta === 'string') {
      check(argv.ruta);
    }
  }
});

/**
 * Comando para crear un directorio
 */
yargs.command({
  command: 'mkdir', 
  describe: 'Create a directory', 
  builder: {
    ruta: {
      describe: 'ruta',
      demandOption: true,
      type: 'string',
    },
  },

  handler(argv) {
    if (typeof argv.ruta === 'string') {
      mkdir(argv.ruta);
    }
  }
});

/**
 * Comando para listar los ficheros dentro de un directorio
 */
 yargs.command({
  command: 'ls', 
  describe: 'show file in directory', 
  builder: {
    ruta: {
      describe: 'ruta',
      demandOption: true,
      type: 'string',
    },
  },

  handler(argv) {
    if (typeof argv.ruta === 'string') {
      list(argv.ruta);
    }
  }
});

/**
 * Comando para mostrar contenido de un fichero
 */
 yargs.command({
  command: 'cat', 
  describe: 'show content of file', 
  builder: {
    ruta: {
      describe: 'ruta',
      demandOption: true,
      type: 'string',
    },
  },

  handler(argv) {
    if (typeof argv.ruta === 'string') {
      cat(argv.ruta);
    }
  }
});

/**
 * Comando para mostrar contenido de un fichero
 */
 yargs.command({
  command: 'rm', 
  describe: 'Delete a file or a directory', 
  builder: {
    ruta: {
      describe: 'ruta',
      demandOption: true,
      type: 'string',
    },
  },

  handler(argv) {
    if (typeof argv.ruta === 'string') {
      rm(argv.ruta);
    }
  }
});

/**
 * Comando para copiar y mover ficheros y/o directorios
 */
 yargs.command({
  command: 'move', 
  describe: 'copy and move file or directory', 
  builder: {
    origen: {
      describe: 'origen',
      demandOption: true,
      type: 'string',
    },
    destino: {
      describe: 'destino',
      demandOption: true,
      type: 'string',
    },
  },

  handler(argv) {
    if (typeof argv.origen === 'string' && typeof argv.destino === 'string') {
      move(argv.origen, argv.destino);
    }
  }
});


yargs.argv;