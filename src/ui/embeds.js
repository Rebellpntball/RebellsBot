const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const botConfig = require('../../config/bot');

function base(color = botConfig.colors.primary) {
  return new EmbedBuilder().setColor(color).setFooter({ text: `${botConfig.name} \u00b7 ${botConfig.tagline}` }).setTimestamp();
}
function success(title, description) {
  return base(botConfig.colors.success).setTitle(`\u2705 ${title}`).setDescription(description);
}
function error(title, description) {
  return base(botConfig.colors.error).setTitle(`\u274c ${title}`).setDescription(description);
}
function economy(title, description) {
  return base(botConfig.colors.economy).setTitle(`${botConfig.currency.emoji} ${title}`).setDescription(description);
}
function market(title, description) {
  return base(botConfig.colors.market).setTitle(`\ud83d\uded2 ${title}`).setDescription(description);
}
function order(title, description) {
  return base(botConfig.colors.order).setTitle(`\ud83d\udce6 ${title}`).setDescription(description);
}
function shopHomeRow() {
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId('ui:market').setLabel('Browse Market').setStyle(ButtonStyle.Primary).setEmoji('\ud83d\uded2'),
    new ButtonBuilder().setCustomId('ui:balance').setLabel('My Balance').setStyle(ButtonStyle.Secondary).setEmoji(botConfig.currency.emoji),
    new ButtonBuilder().setCustomId('ui:basket').setLabel('My Basket').setStyle(ButtonStyle.Secondary).setEmoji('\ud83e\uddfa'),
    new ButtonBuilder().setCustomId('ui:help').setLabel('Help').setStyle(ButtonStyle.Secondary).setEmoji('\u2753'),
  );
}
module.exports = { base, success, error, economy, market, order, shopHomeRow };
