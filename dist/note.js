"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteInstance = void 0;
const fs = __importStar(require("fs"));
const chalk = require('chalk');
/**
 * Constantes que usadas con chalk para dar color a mensajes de error e informativos
 */
const error = chalk.bold.red;
const informative = chalk.bold.green;
/**
 * Clase NoteInstance
 */
class NoteInstance {
    /**
     * Constructor privado para que no se pueda invocar fuera de la clase
     */
    constructor() {
        if (fs.existsSync('./Note/')) {
            fs.mkdirSync(`./Notes/`, { recursive: true });
        }
    }
    /**
     * Método encargado de comprobar que solo se genera una única
     * instancia de la clase
     * @returns {NoteInstance} Única instancia de la clase
     */
    static getNoteInstance() {
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
    addNotes(nota) {
        const data = JSON.stringify(nota, null, 2);
        const ruta = `./Notes/${nota.user}/${nota.title}.json`;
        let test = '';
        if (fs.existsSync(`./Notes/${nota.user}/`)) {
            if (fs.existsSync(ruta)) {
                test = 'Note title taken!';
                console.log(error('Note title taken!'));
            }
            else {
                fs.writeFileSync(ruta, data);
                test = `New note added in ${nota.user}!`;
                console.log(informative(`New note added in ${nota.user}!`));
            }
        }
        else {
            fs.mkdirSync(`./Notes/${nota.user}/`, { recursive: true });
            fs.writeFileSync(ruta, data);
            test = 'New note added!';
            console.log(informative('New note added!'));
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
    modify(user, title, newtitle) {
        const ruta = `./Notes/${user}/${title}.json`;
        const newruta = `./Notes/${user}/${newtitle}.json`;
        if (fs.existsSync(ruta)) {
            fs.renameSync(ruta, newruta);
            console.log(informative(`${title}.json rename to ${newtitle}.json`));
        }
        else {
            console.log(error('You cannot modify a non-existent note!'));
        }
    }
    /**
     * Método encargado eliminar una nota de un determinado usuario
     * @param {string} user Usuario
     * @param {string} title Título
     */
    remove(user, title) {
        const ruta = `./Notes/${user}/${title}.json`;
        if (fs.existsSync(ruta)) {
            fs.rmSync(ruta);
            console.log(informative(`Remove ${title}`));
        }
        else {
            console.log(error('You cannot remove a non-existent note!'));
        }
    }
    /**
     * Método encargado de listar los títulos de la notas de un determinado user
     * @param {string} user Usuario
     * @returns {string[]} Array que almacena datos mostrados por consola para hacer test
     */
    list(user) {
        const ruta = `./Notes/${user}/`;
        const test = [];
        if (fs.existsSync(ruta)) {
            const titles = fs.readdirSync(ruta);
            console.log('Your Notes');
            titles.forEach((note) => {
                const text = fs.readFileSync(ruta + note);
                const titleBody = JSON.parse(text.toString());
                test.push(titleBody.title);
                this.colorsprint(titleBody.color, titleBody.title);
            });
        }
        else {
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
    read(user, title) {
        const ruta = `./Notes/${user}/${title}.json`;
        const test = [];
        if (fs.existsSync(ruta)) {
            const text = fs.readFileSync(ruta);
            const titleBody = JSON.parse(text.toString());
            test.push(titleBody.title, titleBody.body);
            console.log(`${titleBody.title}`);
            this.colorsprint(titleBody.color, titleBody.body);
        }
        else {
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
    colorsprint(color, text) {
        let colorNote;
        switch (color) {
            case 'red':
                console.log(chalk.bold.red(text));
                break;
            case 'yellow':
                console.log(chalk.bold.yellow(text));
                break;
            case 'green':
                console.log(chalk.bold.green(text));
                break;
            case 'blue':
                console.log(chalk.bold.blue(text));
                break;
            default:
                console.log(chalk.bold.orange(text));
                break;
        }
    }
}
exports.NoteInstance = NoteInstance;
