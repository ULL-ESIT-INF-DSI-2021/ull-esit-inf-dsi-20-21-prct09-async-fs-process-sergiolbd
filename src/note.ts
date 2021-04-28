import * as fs from 'fs';
const chalk = require('chalk');
import {note} from './types';

/**
 * Constantes que usadas con chalk para dar color a mensajes de error e informativos
 */
const error = chalk.bold.red;
const informative = chalk.bold.green;

/**
 * Clase NoteInstance
 */
export class NoteInstance {
  /**
   * Atributo privado estático para almacenar la única instancia
   * que va a tener dicha clase
   */
  private static noteInstance: NoteInstance;

  /**
   * Constructor privado para que no se pueda invocar fuera de la clase
   */
  private constructor() {
    if (fs.existsSync('./Note/')) {
      fs.mkdirSync(`./Notes/`, {recursive: true});
    }
  }

  /**
   * Método encargado de comprobar que solo se genera una única
   * instancia de la clase
   * @returns {NoteInstance} Única instancia de la clase
   */
  public static getNoteInstance(): NoteInstance {
    if (!NoteInstance.noteInstance) {
      NoteInstance.noteInstance = new NoteInstance();
    }
    return NoteInstance.noteInstance;
  }

  /**
   * Método encargado de añadir una nota a la base de datos de notas
   * @param {note} nota Nota a añadir
   * @returns {string} Cadenas a mostrar por pantalla se retornan para hacer test
   */
  addNotes(nota: note) {
    const data = JSON.stringify(nota, null, 2);
    const ruta: string = `./Notes/${nota.user}/${nota.title}.json`;
    let test: string = '';
    if (fs.existsSync(`./Notes/${nota.user}/`)) {
      if (fs.existsSync(ruta)) {
        test = 'Note title taken!';
        console.log(error('Note title taken!'));
      } else {
        fs.writeFileSync(ruta, data);
        test = `New note added in ${nota.user}!`;
        console.log(informative(`New note added in ${nota.user}!`));
      }
    } else {
      fs.mkdirSync(`./Notes/${nota.user}/`, {recursive: true});
      fs.writeFileSync(ruta, data);
      test = `New note added in ${nota.user}!`;
      console.log(informative(`New note added in ${nota.user}!`));
    }
    return test;
  }

  /**
   * Método encargado realizar una modificación en la base de datos
   * @param {string} user Usuario
   * @param {string} title Titulo de la nota
   * @param {string} modify Modificación
   * @param {string} typemodify Tipo de modificación (Rename | append)
   */
  modify(user:string, title: string, newtitle: string) {
    const ruta: string = `./Notes/${user}/${title}.json`;
    const newruta: string = `./Notes/${user}/${newtitle}.json`;
    let test = '';
    if (fs.existsSync(ruta)) {
      fs.renameSync(ruta, newruta);
      console.log(informative(`${title}.json rename to ${newtitle}.json`));
    } else {
      test = 'You cannot modify a non-existent note!';
      console.log(error('You cannot modify a non-existent note!'));
    }
    return test;
  }

  /**
   * Método encargado eliminar una nota de un determinado usuario
   * @param {string} user Usuario
   * @param {string} title Título
   */
  remove(user: string, title: string) {
    const ruta: string = `./Notes/${user}/${title}.json`;
    let test = '';
    if (fs.existsSync(ruta)) {
      fs.rmSync(ruta);
      test = `Remove ${title}`;
      console.log(informative(`Remove ${title}`));
    } else {
      test = 'You cannot remove a non-existent note!';
      console.log(error('You cannot remove a non-existent note!'));
    }
    return test;
  }

  /**
   * Método encargado de listar los títulos de la notas de un determinado user
   * @param {string} user Usuario
   * @returns {string[]} Array que almacena datos mostrados por consola para hacer test
   */
  list(user: string) {
    const ruta: string = `./Notes/${user}/`;
    const test: string[] = [];
    if (fs.existsSync(ruta)) {
      const titles = fs.readdirSync(ruta);
      console.log('Your Notes');
      titles.forEach((note) => {
        const text = fs.readFileSync(ruta + note);
        const titleBody = JSON.parse(text.toString());
        test.push(titleBody.title);
        this.colorsprint(titleBody.color, titleBody.title);
      });
    } else {
      test.push('This user has no notes!');
      console.log('This user has no notes!');
    }
    return test;
  }

  /**
   * Método encargado de leer el cuerpo de una determinada nota
   * @param {string} user Usuario
   * @param {string} title Título de la nota
   * @returns {string[]} Array que almacena datos mostrados por consola para hacer test
   */
  read(user: string, title: string) {
    const ruta: string = `./Notes/${user}/${title}.json`;
    const test: string[] = [];
    if (fs.existsSync(ruta)) {
      const text = fs.readFileSync(ruta);
      const titleBody = JSON.parse(text.toString());
      test.push(titleBody.title, titleBody.body);
      console.log(`${titleBody.title}`);
      this.colorsprint(titleBody.color, titleBody.body);
    } else {
      test.push('Note not found!');
      console.log(error('Note not found!'));
    }
    return test;
  }

  /**
   * Método usa chalk para determinar el color de la nota y mostrar por pantalla con el color
   * @param {string} color Color
   * @param {string} text Título
   */
  colorsprint(color: string, text: string) {
    let test = '';
    switch (color) {
      case 'red': console.log(chalk.bold.red(text));
        test = `chalk.bold.red(${text})`;
        break;
      case 'yellow': console.log(chalk.bold.yellow(text));
        break;
      case 'green': console.log(chalk.bold.green(text));
        break;
      case 'blue': console.log(chalk.bold.blue(text));
        break;
      default: console.log(chalk.bold.black(text));
        break;
    }
    return test;
  }
}
