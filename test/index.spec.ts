import 'mocha';
import {expect} from 'chai';
import * as fs from 'fs';
import {NoteInstance} from '../src/note';
import {note} from '../src/types';


describe('Test', () => {
  // Primer test
  const noteInstance1 = NoteInstance.getNoteInstance();
  const noteInstance2 = NoteInstance.getNoteInstance();

  it('Check that they are the same instance', () => {
    let sameInstance: boolean;
    if (noteInstance1 === noteInstance2) {
      sameInstance = true;
    } else {
      sameInstance = false;
    }
    expect(sameInstance).to.be.eq(true);
  });

  it('Check exist dir ./Note/', () => {
    expect(fs.existsSync('./Notes/')).to.be.eq(true);
  });

  it('noteInstance1.add(note) in sergio', () => {
    noteInstance1.addNotes({user: 'sergio', title: 'Prueba', body: 'Check test', color: 'blue'});
    expect(fs.existsSync(`./Notes/sergio/Prueba.json`)).to.be.eq(true);
  });

  it('noteInstance1.add(note) Note is a repeat note', () => {
    const test = noteInstance1.addNotes({user: 'sergio', title: 'Prueba', body: 'Check test', color: 'blue'});
    expect(test).to.be.eq('Note title taken!');
  });

  it('noteInstance1.modify(oldname, newname)', ()=> {
    noteInstance1.modify('sergio', 'Prueba', 'X');
    expect(fs.existsSync(`./Notes/sergio/X.json`) && !fs.existsSync(`./Notes/sergio/Prueba.json`)).to.be.eq(true);
  });

  it('noteInstance1.modify(oldname, newname)', ()=> {
    expect(noteInstance1.modify('Marta', 'Prueba', 'X')).to.be.eq('You cannot modify a non-existent note!');
  });

  it('noteInstance1.list(Sergio)', () => {
    expect(noteInstance1.list('sergio')).to.deep.eq(['Prueba']);
  });

  it('noteInstance1.list(Sofia)', () => {
    expect(noteInstance1.list('Sofia')).not.to.deep.eq(['Prueba']);
  });

  it('noteInstance1.read(sergio, X)', () => {
    expect(noteInstance1.read('sergio', 'X')).to.deep.eq(['Prueba', 'Check test']);
  });

  it('noteInstance1.remove(sergio, X)', () => {
    noteInstance1.remove('sergio', 'X');
    expect(fs.existsSync('./Notes/sergio/X.json')).to.be.eq(false);
  });

  it('noteInstance1.read(sergio, Prueba)', () => {
    expect(noteInstance1.read('sergio', 'Prueba')).to.deep.eq(['Note not found!']);
  });

  it('noteInstance1.remove(sergio, Hola)', () => {
    expect(noteInstance1.remove('sergio', 'Hola')).to.be.eq('You cannot remove a non-existent note!');
  });

  /** Check add a note in a not exist user*/
  it('noteInstance1.add(note) in Sofia', () => {
    const test = noteInstance1.addNotes({user: 'Sofia', title: 'PruebaSofia', body: 'Check test', color: 'blue'});
    expect(test).to.be.eq('New note added in Sofia!');
  });

  it('noteInstance1.remove(Sofia, PruebaSofia)', () => {
    noteInstance1.remove('Sofia', 'PruebaSofia');
    expect(fs.existsSync('./Notes/Pepe/PruebaSofia.json')).to.be.eq(false);
    fs.rmdirSync('./Notes/Sofia');
  });

  /** Check chalk */
  it('noteInstance1.colorsPrint(red, texto)', () => {
    expect(noteInstance1.colorsprint('red', 'texto')).to.be.eq('chalk.bold.red(texto)');
  });
});
