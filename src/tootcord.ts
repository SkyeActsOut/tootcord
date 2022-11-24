import { MessageAttachment, Snowflake, Collection } from 'discord.js';
import generator, { MegalodonInterface } from 'megalodon';
import * as fs from 'fs';
const download = require('image-downloader');

/**
 * @name Tootcord
 * @author SkyMocha
 * @description For posting toots on Mastodon using Discord.JS
 * 
 * */
export class Tootcord {

    BASE_URL: string;
    client: MegalodonInterface;

    /**
     * @constructor
     * @param BASE_URL the URL for your mastodon server with HTTPS
     * @param access_token the access token for your mastodon account
     */
    constructor(BASE_URL: string, access_token: string) {

        this.BASE_URL = BASE_URL;
        this.client = generator('mastodon', BASE_URL, access_token);
        console.log(`CREATED MASTODON FOR ${BASE_URL}, ACCESS TOKEN ${access_token}`)

    }

    /**
     * @param length 
     * @returns a filename for temporary files stored on your device
     */
    gen_filename(length: number): string {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    /**
     * @description Uploads all files in a MessageAttatchement Collection and returns the IDs
     * @param files 
     * @returns an array of IDs for the images on Mastodon
     */
    async getFiles(files: Collection<Snowflake, MessageAttachment>): Promise<Array<string>> {

        let _files: Array<string> = []

        let _f_arr = files.array()
        for (let i = 0; i < _f_arr.length; i++) {

            let f = _f_arr[i]

            if (f != undefined) {

                let n: string = `${this.gen_filename(8)}.png`

                console.log(f.attachment.toString())
                await download.image({ url: f.attachment.toString(), dest: n })

                let base = 'node_modules/image-downloader/'

                console.log(`${base}${n}`)

                let _temp = fs.createReadStream(`${base}${n}`)

                await this.client.uploadMedia(_temp).then(e => {

                    _files.push(e.data.id)

                }).catch(e => {

                    console.error('ERROR UPLOADING IMAGE')

                })

                fs.unlinkSync(`${base}${n}`)

            }

        }

        return _files
    }

    /**
     * @description posts a toot
     * @param text the text of the toot
     * @param files the files as a Collection of MessageAttachments. Can be gotten from message.attachments
     * @returns a true promise when done
     */
    async post_toot(text: string, files: Collection<Snowflake, MessageAttachment>): Promise<boolean> {

        let _files = await this.getFiles(files)
        let success: boolean = false

        if (text.length > 500)
            return success

        if (_files.length > 0)

            this.client.postStatus(

                text, { media_ids: _files }

            ).then(e => {
                console.log(`STATUS POSTED FOR ${this.BASE_URL} ID ${e.data.url}`)
                success = true
            }).catch(e => {
                console.error(e)
            })

        else

            this.client.postStatus(text).then(() => success = true).catch(e => console.error(e))

        return success

    }

}