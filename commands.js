const fs = require('fs');

function done(output) { // write out data
  process.stdout.write(output);
  process.stdin.write('\nprompt >');
}

function evalutateCmd(userInput) { // where we will store our commands
  // parses the user input to understand which command was typed
  const userInputArray = userInput.split(" ");
  const command = userInputArray[0];

  switch (command) {
    case "echo":
      commandLibrary.echo(userInputArray.slice(1).join(" "));
      break;
    case "cat":
      commandLibrary.cat(userInputArray.slice(1));
      break;
    case "head":
      commandLibrary.head(userInputArray.slice(1)); // outputs the first n lines of a file
      break;
    case "tail":
      commandLibrary.tail(userInputArray.slice(1)); // outputs the last n lines of a file
      break;
    default:
      console.log("Command not found");
  }
}

const commandLibrary = { // where we will store the logic of our commands
  // the echo command
  "echo": function(userInput) {
    done(userInput);
  },

  // the cat command
  "cat": function(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      done(data);
    });
  },

  // the head command
  "head": function(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      var text = data.toString('utf8');
      var slicedText = text.split('\n').slice(0,10).join('\n');
      var bufferText = Buffer.from(slicedText, 'utf8');
      done(bufferText);
    })
  },

  // the tail command
  "tail": function(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      var text = data.toString('utf8');
      var slicedText = text.split('\n').slice(-10).join('\n');
      var bufferText = Buffer.from(slicedText, 'utf8');
      done(bufferText);
    })
  }

  // errorHandler function?
};

module.exports.commandLibrary = commandLibrary;
module.exports.evalutateCmd = evalutateCmd;
