require('dotenv').config();
const { REST, Routes } = require('discord.js');
const path = require('path');
const { loadCommands } = require('../src/utils/loadCommands');

async function deploy() {
  if (!process.env.DISCORD_TOKEN || !process.env.CLIENT_ID) {
    console.error('Set DISCORD_TOKEN and CLIENT_ID in .env');
    process.exit(1);
  }
  const commands = loadCommands(path.join(__dirname, '../commands'));
  const body = [...commands.values()].map((c) => c.data.toJSON());
  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
  console.log(`Deploying ${body.length} commands...`);
  if (process.env.GUILD_ID) {
    await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body });
    console.log('Guild commands deployed (instant).');
  } else {
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body });
    console.log('Global commands deployed.');
  }
}
deploy().catch((e) => { console.error(e); process.exit(1); });
