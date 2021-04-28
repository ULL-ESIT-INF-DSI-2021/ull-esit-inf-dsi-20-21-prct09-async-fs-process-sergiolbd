import { note } from './types';
/**
 * Clase NoteInstance
 */
export declare class NoteInstance {
    /**
     * Atributo privado estático para almacenar la única instancia
     * que va a tener dicha clase
     */
    private static noteInstance;
    /**
     * Constructor privado para que no se pueda invocar fuera de la clase
     */
    private constructor();
    /**
     * Método encargado de comprobar que solo se genera una única
     * instancia de la clase
     * @returns {NoteInstance} Única instancia de la clase
     */
    static getNoteInstance(): NoteInstance;
    /**
     * Método encargado de añadir una nota a la base de datos de notas
     * @param {note} nota Nota a añadir
     * @returns {string} Cadenas a mostrar por pantalla se retornan para hacer test
     */
    addNotes(nota: note): string;
    /**
     * Método encargado realizar una modificación en la base de datos
     * @param {string} user Usuario
     * @param {string} title Titulo de la nota
     * @param {string} modify Modificación
     * @param {string} typemodify Tipo de modificación (Rename | append)
     */
    modify(user: string, title: string, newtitle: string): void;
    /**
     * Método encargado eliminar una nota de un determinado usuario
     * @param {string} user Usuario
     * @param {string} title Título
     */
    remove(user: string, title: string): void;
    /**
     * Método encargado de listar los títulos de la notas de un determinado user
     * @param {string} user Usuario
     * @returns {string[]} Array que almacena datos mostrados por consola para hacer test
     */
    list(user: string): string[];
    /**
     * Método encargado de leer el cuerpo de una determinada nota
     * @param {string} user Usuario
     * @param {string} title Título de la nota
     * @returns {string[]} Array que almacena datos mostrados por consola para hacer test
     */
    read(user: string, title: string): string[];
    /**
     * Método usa chalk para determinar el color de la nota y mostrar por pantalla con el color
     * @param {string} color Color
     * @param {string} text Título
     */
    colorsprint(color: string, text: string): void;
}
