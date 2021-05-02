import * as yargs from 'yargs';
import { watcher } from './watcher';

yargs.command({
  command: 'app',
  describe: 'App',
  builder: {
    user: {
      describe: 'User App',
      demandOption: true,
      type: 'string',
    },
    path: {
      describe: 'user notes paths',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.path === 'string' && typeof argv.user === 'string') {
      watcher(argv.path, argv.user);
    }
  },
});

yargs.argv;