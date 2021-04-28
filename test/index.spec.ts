import 'mocha';
import {expect} from 'chai';
import * as fs from 'fs';
import {add} from '../src/index';


describe('Test', () => {
  it ('', () => {
    expect(add(2, 3)).to.be.eq(5);
  });
});

