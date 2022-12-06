//jshint esversion:8
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('botInfo')
		.setDescription('Displays information about this bot.'),
	async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor("137c5a")
      .addFields(
        {name: "Open Source", value: "This bot is open source and its code is freely available on <:github:1049292058583638038> [Github](https://github.com/kevin8181/tgobot3) under the AGPL-3.0 license."},
        {name: "Icons", value: "The icons used by this bot are provided by [iconsdiscord](https://discord.com/invite/aPvvhefmt3)."}
      );
		await interaction.reply(``);
	},
};
