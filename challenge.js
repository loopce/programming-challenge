var messagesToSend = [];

const devices = [1, 5, 20, 35, 32, 22, 50, 41];
const commands = ["unlock", "readLog", "lock", "timer"];

var checkResult;
var sendCommand;

(function () {

  function generateCommands() {
      var commandsToSend = [];
      for (var i = 1; i <= 100; i++) {
          var randomNumber = Math.floor(Math.random() * 500);
          var randomDevice = devices[randomNumber % devices.length];
          var randomCommand = commands[randomNumber % commands.length];
          commandsToSend.push({
              id: i,
              command: randomCommand,
              device: randomDevice
          })
      }
      return commandsToSend;
  }

  function decideIfSuccess() {
      return Math.random() < 0.7;
  }

  const commandsToSend = generateCommands();
  messagesToSend = commandsToSend.slice(0);
  var sentCommands = [];

  sendCommand = function(id, command, device) {
      if (sentCommands.some((command) => command.id == id)) {
          console.error("Message was already successfully sent before.");
          return false;
      }
      var element = commandsToSend.find((command) => command.id == id);
      if (element) {
          if (element.command == command) {
              if (element.device == device) {
                  if (decideIfSuccess()) {
                      sentCommands.push(element);
                      return true;
                  } else {
                      return false;
                  }
              } else {
                  console.error("Message is being sent to the wrong device.");
              }
          } else {
              console.error("Wrong command for this message ID.");
          }
      } else {
          console.error("Command ID is invalid.");
      }
      return false;
  }

  checkResult = function() {
      var commandList = commandsToSend;
      var element = sentCommands.pop()
      while (element != undefined) {
          var idx = commandList.findIndex((cmd) => cmd.id == element.id && cmd.command == element.command && cmd.device == element.device);
          if (idx >= 0) {
              commandList.splice(idx, 1);
          } else {
              console.error("Wrong command: " + JSON.stringify(element));
          }
          element = sentCommands.pop();
      }
      element = commandList.pop();
      while (element != undefined) {
          console.error("This command was not sent: " + JSON.stringify(element));
          element = commandList.pop();
      }
  }
})();