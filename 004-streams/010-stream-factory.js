const {createReadStream, createWriteStream} = require('fs');

const program = require('commander');
const {CaesarCipherEncode} = require("./cipher/caesar-stream");

// console.log("args ------------>", process.argv);

program
  .option('-i, --input [path]', 'input file name')
  .option('-o, --output [path]', 'output file name')
  .option('-s, --shift [shift]', 'cipher shift', 1);

program.parse(process.argv);


const encoder = new CaesarCipherEncode(parseInt(program.opts().shift, 10));

function createInputStream(path) {
  return path ? createReadStream(path) : process.stdin;
}

function createOutputStream(path) {
  return path ? createWriteStream(path) : process.stdout;
}

const input = createInputStream(program.opts().input);
const output = createOutputStream(program.opts().output);

input.pipe(encoder).pipe(output);
