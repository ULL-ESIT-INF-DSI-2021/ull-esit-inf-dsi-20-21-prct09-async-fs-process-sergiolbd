import * as fs from 'fs';
import {spawn} from 'child_process';
import { rename } from 'node:fs';
const chalk = require('chalk');

/**
 * Método encargado de escuchar cambios en las notas del usuario
 * rename change = añadir
 * rename = eliminar
 * change change = modificar
 * @param path 
 * @param user 
 */
export function watcher(path: string, user: string) {
  const pathUser = `./${path}/${user}/`;
  console.log(`Listening to changes in file --> ${path}`);
  fs.readdir(pathUser, (err, oldFile) => {
    if (err) {
      console.log(err);
    } else {
      fs.watch(pathUser, 'utf-8', (eventType, filename) => {
        fs.readdir(pathUser, (err, newFile) => {
          if (err) {
            console.log(err);
          } else {
            if (eventType === 'rename' && oldFile.length < newFile.length) {
              console.log( chalk.bold.green(`Add `) + `note ${filename} in ${pathUser}`);
            } else if (eventType === 'change') {
              console.log(`Note ${filename} was` +  chalk.bold.yellow(` modify `) + `in ${pathUser}`);
            } else if (eventType === 'rename') {
              console.log(`Note ${filename}` + chalk.bold.red(` removed `) + `from ${pathUser}`);
            }
          }
          oldFile = newFile;
        })
      });
    };
  });
}