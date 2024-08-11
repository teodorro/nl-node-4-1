const fs = require('fs');
const readline = require('node:readline');
const path = require('path');
const { stdin: input, stdout: output } = require('node:process');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv)).argv;
const filename =
  argv._.length > 0 ? argv._[0] : `${new Date().toISOString()}.txt`;
const rl = readline.createInterface({ input, output });
const numberOfAnswers = 5;
let i = 1;

const writer = fs.createWriteStream(filename);
writer.on('finish', (e) => {});
writer.on('close', (e) => {});

const question = (answer) => {
  let rand = Math.round(Math.random() + 1);
  writer.write(`question: ${rand}\r\n`, 'UTF8');
  const num = parseInt(answer);
  writer.write(`answer: ${num}\r\n`, 'UTF8');
  if (typeof num === 'number' && Number.isFinite(num)) {
    if (num !== 2 && num !== 1) {
      console.log('Please enter 1 or 2');
      rl.prompt();
    } else if (num !== rand) {
      console.log('Wrong answer!');
      rl.prompt();
      if (i++ === numberOfAnswers) {
        rl.close();
        writer.end();
      } else {
        console.log('Once more');
      }
    } else {
      console.log('Right answer!');
      rl.prompt();
      if (i++ === numberOfAnswers) {
        rl.close();
        writer.end();
      } else {
        console.log('Once more');
      }
    }
  } else {
    console.log(`Please enter a number`);
    rl.prompt();
  }
};

rl.question(`Загадано 1 или 2. Угадайте\r\n`, (answer) => {
  rl.on('line', (anotherAnswer) => question(anotherAnswer));
  question(answer);
});
