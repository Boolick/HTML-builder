const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const filePath = path.join(__dirname, 'output.txt');

function writeToFile(text) {
  fs.appendFile(filePath, text + '\n', (err) => {
    if (err) {
      console.error('Error writing to file:', err.message);
    } else {
      console.log('Text has been written');
      waitForInput();
    }
  });
}

function waitForInput() {
  rl.question('Enter your text (or type "exit" to finish): ', async (input) => {
    if (input.toLowerCase() === 'exit') {
      console.log('Goodbye!');
      rl.close();
    } else {
      await writeToFile(input);
    }
  });
}

console.log('Hello, Bro!');
waitForInput();
