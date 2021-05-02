import * as yargs from 'yargs';
import {mode1, mode2} from './app';

/**
 * Comando para obtener la info de un fichero
 */
yargs.command({
  command: 'info', 
  describe: 'Show number of lines', 
  builder: {
    ruta: {
      describe: 'ruta',
      demandOption: true,
      type: 'string',
    },
    mode: {
      describe: 'mode',
      demandOption: true,
      type: 'number',
    },
    option: {
      describe: 'option',
      demandOption: true,
      type: 'string',
      default: 'combination'
    },
  },

  handler(argv) {
    if (typeof argv.ruta === 'string' && typeof argv.option === 'string' &&
        typeof argv.mode === 'number') {
      if (argv.mode === 1) {
        mode1(argv.ruta, argv.option);
      } else if (argv.mode === 2) {
        mode2(argv.ruta, argv.option);
      } else {
        console.log(`Error --mode=${argv.mode} not exist`);
      }
    }
  }
});

yargs.argv;