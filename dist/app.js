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
const yargs = __importStar(require("yargs"));
const note_1 = require("./note");
/**
 * Instanciamos un objeto de tipo NoteInstance para poder
 * acceder a sus métodos con las opciones seleccionadas con yargs
 */
const noteInstance1 = note_1.NoteInstance.getNoteInstance();
/**
 * Command add Note
 */
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        user: {
            describe: 'User Note',
            demandOption: true,
            type: 'string',
        },
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
        body: {
            describe: 'Body of note',
            demandOption: true,
            type: 'string',
        },
        color: {
            describe: 'Note color',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if (typeof argv.user === 'string' && typeof argv.title === 'string' &&
            typeof argv.body === 'string' && typeof argv.color === 'string') {
            const newNote = { user: argv.user, title: argv.title, body: argv.body, color: argv.color };
            noteInstance1.addNotes(newNote);
        }
    },
});
/**
 * Commnand Modify Note
 */
yargs.command({
    command: 'modify',
    describe: 'Modify note',
    builder: {
        user: {
            describe: 'User Note',
            demandOption: true,
            type: 'string',
        },
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
        newtitle: {
            describe: 'newtitle of note',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if (typeof argv.user === 'string' && typeof argv.title === 'string' &&
            typeof argv.newtitle === 'string') {
            noteInstance1.modify(argv.user, argv.title, argv.newtitle);
        }
    },
});
/**
 * Commnand Modify Note
 */
yargs.command({
    command: 'remove',
    describe: 'Remove note',
    builder: {
        user: {
            describe: 'User Note',
            demandOption: true,
            type: 'string',
        },
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if (typeof argv.user === 'string' && typeof argv.title === 'string') {
            noteInstance1.remove(argv.user, argv.title);
        }
    },
});
/**
 * Commnand List Note
 */
yargs.command({
    command: 'list',
    describe: 'list note',
    builder: {
        user: {
            describe: 'User Note',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if (typeof argv.user === 'string') {
            noteInstance1.list(argv.user);
        }
    },
});
/**
 * Commnand Read Note
 */
yargs.command({
    command: 'read',
    describe: 'read note',
    builder: {
        user: {
            describe: 'User Note',
            demandOption: true,
            type: 'string',
        },
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if (typeof argv.user === 'string' && typeof argv.title === 'string') {
            noteInstance1.read(argv.user, argv.title);
        }
    },
});
yargs.parse();
