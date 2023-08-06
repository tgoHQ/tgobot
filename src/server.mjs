import fs from "node:fs";
import path from "node:path";
import {
	Client,
	Collection,
	Events,
	GatewayIntentBits,
	AuditLogEvent,
	REST,
	Routes,
} from "discord.js";

const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildBans,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.MessageContent,
	],
	presence: {
		activities: [
			{
				name: "outside",
			},
		],
	},
	allowedMentions: {
		parse: ["roles", "users"],
	},
});

// Grab all the command files
const commandFiles = fs
	.readdirSync("./commands")
	.filter((file) => file.endsWith(".js"));

//deploy slash commands
const commands = [];
// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
	const command = import(`./commands/${file}`);
	commands.push(command.data.toJSON());
}
// Construct and prepare an instance of the REST module
const rest = new REST({ version: "10" }).setToken(token);
// and deploy your commands!
(async () => {
	try {
		console.log(
			`Started refreshing ${commands.length} application (/) commands.`
		);
		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(Routes.applicationCommands(clientId), {
			body: commands,
		});
		console.log(
			`Successfully reloaded ${data.length} application (/) commands.`
		);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();

//load commands
client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = import(filePath);
	client.commands.set(command.data.name, command);
}

//load events
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
	.readdirSync(eventsPath)
	.filter((file) => file.endsWith(".js"));
for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = import(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(client, ...args));
	} else {
		client.on(event.name, (...args) => event.execute(client, ...args));
	}
}

client.login(token);
