//jshint esversion:10
const { SlashCommandBuilder, PermissionFlagsBits, inlineCode } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('slowmode')
		.setDescription('Sets slowmode on a channel.')
    .addChannelOption(option =>
		option.setName('channel')
			.setDescription('The channel to slowmode')
			.setRequired(true))
		.addIntegerOption(option =>
		option.setName('time')
			.setDescription('Time to slowmode, in seconds. Use 0 to remove slowmode.')
			.setRequired(true))
    .addStringOption(option =>
		option.setName('reason')
			.setDescription('Reason for the slowmode')
			.setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

	async execute(interaction) {

    const targetChannel = interaction.options.getChannel('channel');
    const reason = interaction.options.getString('reason');
		const slowmodeTime = interaction.options.getInteger('time');
		const author = interaction.user;

		try {
			await targetChannel.setRateLimitPerUser(slowmodeTime, reason)
	      .then(function() {
					interaction.reply(`:stopwatch: Set slowmode in ${targetChannel.toString()} to ${inlineCode(slowmodeTime + " seconds")} with reason ${inlineCode(reason)}.`);
					modlog.create({
						type: "Slowmode",
						author,
						reason,
						targetChannel,
						slowmodeTime,
						interaction,
					});
				})
				.catch(function(e) {
					interaction.reply(`:octagonal_sign: Error: ${inlineCode(e.message)}`);
				})
		}
		finally {}
	},
};
