//display a preview in chat of lighterpack links

//detect links
//spin up browser
//take screenshot
//send in chat

import { Events, Listener } from "@sapphire/framework";

import { AttachmentBuilder, EmbedBuilder, Message } from "discord.js";
import puppeteer from "puppeteer";

export class LighterpackAutoMessageListener extends Listener {
	public constructor(
		context: Listener.LoaderContext,
		options: Listener.Options
	) {
		super(context, {
			...options,
			event: Events.MessageCreate,
		});
	}

	public async run(message: Message) {
		// check if member is a bot
		if (message?.member?.user.bot) return;

		//check if link is lighterpack
		const link = /\bhttps?:\/\/lighterpack.com\/r\/[a-zA-Z0-9]{6}\b/.exec(
			message.content
		);
		if (!link) return;

		message.channel.sendTyping();

		const browser = await puppeteer.launch({
			executablePath: "/usr/bin/google-chrome",
			args: ["--no-sandbox", "--disable-setuid-sandbox"],
		});
		const page = await browser.newPage();
		await page.goto(link[0]);

		const summaryDiv = await page.waitForSelector(".lpListSummary");
		const screenshotBuffer = await summaryDiv!.screenshot();

		const titleElement = await page.waitForSelector(".lpListName"); // select the element
		const title = await titleElement!.evaluate((el) => el.textContent); // grab the textContent from the element, by evaluating this function in the browser context

		await message.reply({
			files: [new AttachmentBuilder(screenshotBuffer, { name: "preview.jpg" })],
			allowedMentions: {},
			embeds: [
				new EmbedBuilder()
					.setTitle(title)
					.setURL(link[0])
					.setColor("#137c5a")
					.setImage("attachment://preview.jpg"),
			],
		});

		await browser.close();
	}
}
