#!/usr/bin/env node

const fs = require('fs');
const pairStringsDistance = require('./pair-strings-distance');
const pairStringsBrute = require('./pair-strings-brute');
const pairStringsTree = require('./pair-strings-tree');
const program = require('commander');
const { performance } = require('perf_hooks');
let fileValue;

program
  .version('0.1.0')
  .arguments('<file>')
  .action(function (file) {
     fileValue = file;
  });

program.parse(process.argv);

if (typeof fileValue === 'undefined') {
   console.error('no file given!');
   process.exit(1);
}

let data = fs.readFileSync(fileValue, 'utf8').trim().split('\n');

const DISTANCE_ALGORITHM = "Distance";
const BRUTEFORCE_ALGORITHM = "Brute Force";
const TREE_ALGORITHM = "Tree";

console.time(BRUTEFORCE_ALGORITHM);
const reportBrute = pairStringsBrute(data);
console.timeEnd(BRUTEFORCE_ALGORITHM);

console.time(DISTANCE_ALGORITHM);
const reportDistance = pairStringsDistance(data);
console.timeEnd(DISTANCE_ALGORITHM);

console.time(TREE_ALGORITHM);
const reportTree = pairStringsTree(data);
console.timeEnd(TREE_ALGORITHM);

if(reportDistance.length !== reportBrute.length){
  console.error(
    `Invalid length of ${DISTANCE_ALGORITHM} report ${reportDistance.length} ${reportBrute.length}`
    );
}

if(reportTree.length !== reportBrute.length){
  console.error(
    `Invalid length of ${TREE_ALGORITHM} report ${reportTree.length} ${reportBrute.length}`
    );
}

