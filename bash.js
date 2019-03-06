const commands = require('./commands.js');

process.stdout.write('prompt > '); // Prompts the user for input

process.stdin.on('data', (userInput) => { // This event triggers after a user types in a line
  userInput = userInput.toString().trim(); // Removes the '\n' character at the end of 'data'

  commands.evalutateCmd(userInput); // This function will be implemented in commands.js
});
