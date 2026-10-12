require('dotenv').config();
const { Client, GatewayIntentBits, Collection, Events, Partials } = require('discord.js');
const path = require('path');
const fs = require('fs');
const { connectDatabase } = require('./database/connect');
const { loadCommands } = require('./src/utils/loadCommands');
const botConfig = require('./config/bot');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
  partials: [Partials.Channel],
});

client.commands = new Collection();
client.botConfig = botConfig;

async function main() {
  await connectDatabase(process.env.MONGO_URI);
  const commands = loadCommands(path.join(__dirname, 'commands'));
  for (const [name, cmd] of commands) client.commands.set(name, cmd);
  console.log(`[RebellsBot] ${client.commands.size} commands loaded`);

  const eventsPath = path.join(__dirname, 'events');
  if (fs.existsSync(eventsPath)) {
    for (const file of fs.readdirSync(eventsPath).filter((f) => f.endsWith('.js'))) {
      const event = require(path.join(eventsPath, file));
      if (event.once) client.once(event.name, (...args) => event.execute(...args, client));
      else client.on(event.name, (...args) => event.execute(...args, client));
    }
  }

  client.once(Events.ClientReady, (c) => {
    console.log(`[RebellsBot] Online as ${c.user.tag}`);
    c.user.setActivity(`${botConfig.currency.name} · /shop`, { type: 3 });
  });

  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    try {
      await command.execute(interaction, client);
    } catch (err) {
      console.error(err);
      const payload = { content: 'Something went wrong. Try again.', ephemeral: true };
      if (interaction.replied || interaction.deferred) await interaction.followUp(payload).catch(() => {});
      else await interaction.reply(payload).catch(() => {});
    }
  });

  await client.login(process.env.DISCORD_TOKEN);
}

main().catch((err) => {
  console.error('[RebellsBot] Failed to start:', err);
  process.exit(1);
});
