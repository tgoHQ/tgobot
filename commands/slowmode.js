//jshint esversion:10
const { SlashCommandBuilder, PermissionFlagsBits, inlineCode } = require('discord.js');
const modlog = require("../modules/modlog");
const parse = require('parse-duration');
const humanizeDuration = require("humanize-duration");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('slowmode')
		.setDescription('Sets slowmode on the current channel.')
		.addStringOption(option =>
		option.setName('time')
			.setDescription('Slowmode interval. Set to 0 seconds to disable slowmode.')
			.setRequired(true))
    .addStringOption(option =>
		option.setName('reason')
			.setDescription('Reason for the slowmode')
			.setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

	async execute(interaction) {

    const targetChannel = interaction.channel;
    const reason = interaction.options.getString('reason');

		const slowmodeIntervalRaw = interaction.options.getString('time');
		const slowmodeInterval = parse(slowmodeIntervalRaw);
		const slowmodeIntervalHuman = humanizeDuration(slowmodeInterval);

		const author = interaction.user;

		await targetChannel.setRateLimitPerUser(slowmodeInterval / 1000, reason)
      .then(function() {
				interaction.reply(`:stopwatch: Set slowmode in ${targetChannel.toString()} to ${inlineCode(slowmodeIntervalHuman)} with reason ${inlineCode(reason)}.`);
				modlog.create({
					type: "Slowmode",
					author,
					reason,
					targetChannel,
					slowmodeInterval,
					interaction,
				});
			})
	},
};
