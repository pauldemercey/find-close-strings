#!/usr/bin/env node

const fs = require('fs');


const program = require('commander');
const ALPHABET = "abcdefghijklmnopqrstovwxyz";
const maxSize = (input) => {
  let size = parseInt(input);
  if(size > ALPHABET.length){
    size = ALPHABET.length;
  }
  return size;
}

program
  .version('0.1.0')
  .option('-s, --size <n>', 'Size of one line', parseInt)
  .option('-l, --lines <n>', 'Number of lines', parseInt)
  .option('-a, --alphabet-size <n>', 'Size of the alphabet', maxSize)
  .option('-f, --file <name>', 'Save file as <name>', /^[a-z0-9\-.]+$/i)
  .parse(process.argv);

const size = program.size || 10;
const lines = program.lines || 10;
const alphabetSize = program.alphabetSize || 5;
let fileName = program.file || `${lines}-${size}-${alphabetSize}.txt`;
fileName = `./data/${fileName}`;

console.log(
  `Generating file with: size:${size}, lines:${lines}, alphabetSize:${alphabetSize}`
  );

const alphabet = ALPHABET.slice(0, alphabetSize);
let data = [];
let dataLen = data.length;
while(dataLen < lines){
  let line = [];
  let lineLen = line.length;
  while(lineLen < size){
    let letter = alphabet[Math.floor(Math.random()*alphabet.length)];
    lineLen = line.push(letter);
  }
  line = line.join('');
  dataLen = data.push(line);
}


try {
  fs.writeFileSync(fileName, data.join('\n'));
}
catch (err) {
  console.error(err);
  return
}

console.log(`successfuly written in ${fileName}`);

try {
  fs.lstatSync(fileName);
}
catch (err) {
  console.error(err);
  return
}
