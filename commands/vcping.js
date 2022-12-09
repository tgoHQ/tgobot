//jshint esversion:8
const { SlashCommandBuilder, EmbedBuilder, ChannelType } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('vcping')
		.setDescription('Notifies people that a vc is happening.')
    .addChannelOption(option =>
    option.setName('channel')
			.setDescription('Channel where the VC is happening.')
			.setRequired(true)
      .addChannelTypes(ChannelType.GuildText)),
	async execute(interaction) {
    const channel = interaction.options.getChannel('channel');
    const connected = channel.members.toJSON().length;

    if (connected >= 2) {
      await interaction.reply(`<:call:1050760154418782288> <@&${process.env.VC_PING_ROLE_ID}>, there are ${connected} users connected to ${channel}!`);
    }
    else {
      await interaction.reply(`<:no:1050760960668868670> There are ${connected} users connected to ${channel}. There must be at least 2 for a VC ping to be sent.`);
    }
	},
};
