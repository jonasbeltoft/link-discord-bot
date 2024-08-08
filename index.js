import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv"

dotenv.config()
const { TOKEN, DEV_SERVER_CHANNEL_ID } = process.env

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.GuildWebhooks
	]
});

client.once('ready', () => {
	console.log(`Logged in as ${client.user?.displayName}`);
});

client.on('messageCreate', async (message) => {
	if (message.author.id == client.user?.id) return;

	// Uncomment when testing. It then only acts in given dev server
	// if (message.channelId != DEV_SERVER_CHANNEL_ID) {
	// 	return
	// }

	// Replace links with imbedded links
	const instagram_regex = new RegExp('^https:\/\/www\.instagram\.com\/([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$')
	if (instagram_regex.test(message.content)) {
		await message.delete()
			.then(async (message) => {
				await message.channel.send(
					message.content.replace(
						'.instagram',
						'.ddinstagram'
					) +
					'\nPosted by: ' + message.author.toString()
				)
			})
			.catch(console.error);
	}
	const tiktok_regex = new RegExp('^https:\/\/((vm)|(www))\.tiktok\.com\/([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$')
	if (tiktok_regex.test(message.content)) {
		await message.delete()
			.then(async (message) => {
				message.content.includes('www.tiktok.com') && await message.channel.send(
					message.content.replace(
						'www.tiktok.com',
						'vxtiktok.com'
					) +
					'\nPosted by: ' + message.author.toString()
				)

				message.content.includes('vm.tiktok.com') && await message.channel.send(
					message.content.replace(
						'vm.tiktok.com',
						'vxtiktok.com/t'
					) +
					'\nPosted by: ' + message.author.toString()
				)
			})
			.catch(error => console.log(error));
	}

});

client.login(TOKEN);
