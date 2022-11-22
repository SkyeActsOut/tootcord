import { MessageAttachment, Snowflake, Collection } from 'discord.js';

export as namespace "tootcord";

export = Tootcord;

declare class Tootcord {

    /**
     * @constructor
     * @param BASE_URL the URL for your mastodon server with HTTPS
     * @param access_token the access token for your mastodon account
     */
    constructor(BASE_URL: string, access_token: string);

    /**
     * @param length 
     * @returns a filename for temporary files stored on your device
     */
    gen_filename(length: number): string;

    /**
     * @description Uploads all files in a MessageAttatchement Collection and returns the IDs
     * @param files 
     * @returns an array of IDs for the images on Mastodon
     */
    async getFiles(files: Collection<Snowflake, MessageAttachment>): Promise<Array<string>>;

    /**
     * @description posts a toot
     * @param text the text of the toot
     * @param files the files as a Collection of MessageAttachments. Can be gotten from message.attachments
     * @returns a true promise when done
     */
    async post_toot(text: string, files: Collection<Snowflake, MessageAttachment>): Promise<boolean>;
}