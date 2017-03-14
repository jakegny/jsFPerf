const I = require('immutable');
const R = require('ramda');
const _ = require('lodash/fp');

const Benchmark = require('benchmark');
const suite = new Benchmark.Suite('assocPath');

module.exports = (size) => {
  const { value, path, pathStr } = require('./utils/object')[size];
  const immVal = I.fromJS(value);
  return suite
    .add('immutable.setIn', () => { immVal.setIn(path, 42); })
    .add('ramda.assocPath', () => { R.assocPath(path, 42, value); })
    .add('lodash.update'  , () => { _.update(pathStr, 42,  value); });
}