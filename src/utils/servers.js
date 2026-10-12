const path = require('path');
const fs = require('fs');
function loadServers() {
  const custom = path.join(__dirname, '../../config/servers.js');
  const example = path.join(__dirname, '../../config/servers.example.js');
  const file = fs.existsSync(custom) ? custom : example;
  try {
    const list = require(file);
    return (list || []).filter((s) => s && s.enabled !== false);
  } catch { return []; }
}
function getServer(id) { return loadServers().find((s) => s.id === id) || null; }
function serverChoices() {
  return loadServers().slice(0, 25).map((s) => ({
    name: `${s.name} (${s.game}/${s.platform})`.slice(0, 100),
    value: s.id,
  }));
}
module.exports = { loadServers, getServer, serverChoices };
