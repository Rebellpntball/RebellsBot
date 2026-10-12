const { SlashCommandBuilder } = require('discord.js');
const { getOrCreateUser } = require('../../src/economy/wallet');
const { economy } = require('../../src/ui/embeds');
const botConfig = require('../../config/bot');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('balance')
    .setDescription('Check your shared balance')
    .addUserOption((o) => o.setName('user').setDescription('Other user').setRequired(false)),
  async execute(interaction) {
    const target = interaction.options.getUser('user') || interaction.user;
    const user = await getOrCreateUser(target.id, target.username);
    await interaction.reply({
      embeds: [
        economy(
          'Balance',
          `**${target.username}**\n\n${botConfig.currency.emoji} **${user.balance.toLocaleString()}** ${botConfig.currency.name}\n\n_Shared across every linked server._`,
        ),
      ],
    });
  },
};
