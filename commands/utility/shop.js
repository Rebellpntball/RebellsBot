const { SlashCommandBuilder } = require('discord.js');
const { market, shopHomeRow } = require('../../src/ui/embeds');
const botConfig = require('../../config/bot');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('shop')
    .setDescription('Open the shared market GUI (Discord cash \u2192 in-game orders)'),
  async execute(interaction) {
    const embed = market(
      'Community Market',
      `Spend **${botConfig.currency.name}** on items for your servers.\n\n` +
        `**How it works**\n1. Browse categories\n2. Add items to your basket\n3. Checkout \u2192 staff fulfills in-game\n\n` +
        `Works with **DayZ** (PC / Xbox / PlayStation), **Reforger**, and **Rust**.\nOne wallet. All servers.`,
    );
    await interaction.reply({ embeds: [embed], components: [shopHomeRow()] });
  },
};
