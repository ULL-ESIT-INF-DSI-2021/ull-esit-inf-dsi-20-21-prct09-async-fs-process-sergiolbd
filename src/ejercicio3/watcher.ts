import * as fs from 'fs';
import {spawn} from 'child_process';
import { rename } from 'node:fs';
const chalk = require('chalk');

export function watcher(path: string, user: string) {
  const pathUser = `./${path}/${user}/`;
  console.log(`Listening to changes in file --> ${path}`);
  fs.access(pathUser, fs.constants.R_OK, (err) => {
    if (err) {
      console.log(`${pathUser} ${err ? 'does not exist' : 'exists'}`);
    } else {
      let numChanges = 1;
      fs.watch(pathUser, 'utf-8', (eventType, filename) => {
        console.log('---------------------------------------');
        // rename change = añadir
        // rename = eliminar
        // change change = modificar
        
  
        if (eventType === 'rename') {
          numChanges = 2;
          fs.access(pathUser+filename, (err) => {
            if (err) {
              console.log(`Note ${filename}` + chalk.bold.red(` removed `) + `from ${pathUser}`)
            } else {
              console.log( chalk.bold.green(`Add `) + `note ${filename} in ${pathUser}`);
              numChanges = 1;
            }
          });
        } else if (eventType === 'change' && numChanges === 1) {
          console.log(`Note ${filename} was` +  chalk.bold.yellow(` modify `) + `in ${pathUser}`);
        } 
      });
    }
  });
}