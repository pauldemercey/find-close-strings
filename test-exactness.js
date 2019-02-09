#!/usr/bin/env node

const pairStringsDistance = require('./pair-strings-distance');
const pairStringsTree = require('./pair-strings-tree');

const testData = require('./test-data');

[{
  name: "Distance",
  func: pairStringsDistance
}, {
  name: "Tree",
  func: pairStringsTree
}].forEach(({ name, func }) => {
  testData.forEach(({ data, expected }, testIndex) => {
    const result = func(data);
    if(result.length !== expected.length){
      console.error(name, "Length not expected.", result.length, expected.length);
    }
    expected.forEach(([e1, e2]) => {
      const found = result.find(
        ([r1, r2]) => (e1===r1 && e2===r2) || (e1===r2 && e2===r1)
      );

      if(!found){
        console.error(`Missing pair ${name}, Test ${testIndex} ${data[e1]}, ${data[e2]}` );
      }
    });
  });
});
