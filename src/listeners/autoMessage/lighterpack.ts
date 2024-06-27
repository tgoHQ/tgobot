//display a preview in chat of lighterpack links

//detect links
//spin up browser
//take screenshot
//send in chat

import { Events, Listener } from "@sapphire/framework";

import { AttachmentBuilder, Message } from "discord.js";
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

		const browser = await puppeteer.launch({
			executablePath: "/usr/bin/google-chrome",
			args: ["--no-sandbox", "--disable-setuid-sandbox"],
		});
		const page = await browser.newPage();
		await page.goto(link[0]);

		const div = await page.waitForSelector(".lpListSummary");
		const screenshotBuffer = await div!.screenshot();

		await message.reply({
			files: [new AttachmentBuilder(screenshotBuffer)],
			allowedMentions: {},
		});

		await browser.close();
	}
}
