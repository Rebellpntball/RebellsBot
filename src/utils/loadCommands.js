const fs = require('fs');
const path = require('path');

function loadCommands(commandsDir) {
  const commands = new Map();
  if (!fs.existsSync(commandsDir)) return commands;
  for (const folder of fs.readdirSync(commandsDir)) {
    const folderPath = path.join(commandsDir, folder);
    if (!fs.statSync(folderPath).isDirectory()) continue;
    for (const file of fs.readdirSync(folderPath).filter((f) => f.endsWith('.js'))) {
      const cmd = require(path.join(folderPath, file));
      if (cmd?.data?.name) commands.set(cmd.data.name, cmd);
    }
  }
  return commands;
}

module.exports = { loadCommands };
