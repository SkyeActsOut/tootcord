/**
 * 
 * @name Tootcord_Example_Bot
 * @author SkyMocha
 * 
 */

const Discord = require("discord.js");
import { Emoji, Guild, GuildMember, Message, MessageReaction, ReactionEmoji, Role, Snowflake, User } from "discord.js";

const client = new Discord.Client({
    intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Discord.Intents.FLAGS.USER, Discord.Intents.FLAGS.GUILD_MEMBER],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER', 'GUILD_MEMBER'],
});

const config = require('./config.json');

import { Tootcord } from 'tootcord'

client.on('ready', async () => {

    const masto = new Tootcord(`https://m.skymocha.net/.`, config['token'])

    client.user.setActivity("SkyMocha", { type: "WATCHING" })

})

client.on('message', async (message: Message) => {

    if (message.author.bot || message.member == null)
        return

    let msg = message.content.toLowerCase();

    if (msg.startsWith('!mast ')) {

        masto.post_toot(msg.slice(5), message.attachments)

    }

})


client.login(config.TOKEN);