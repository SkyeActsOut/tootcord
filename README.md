# Tootcord

A simple library for posting toots to one or multiple Mastodon server within a Discord.JS bot. 

## Documentation

The primary command is `post_toot` under the `Tootcord` class.

```ts
async function post_toot(text: string, files: Collection<Snowflake, MessageAttachment>): Promise<boolean>;
```

An example can be found in `example.ts`, otherwise, the following is a shorthand example:

```ts
import { Tootcord } from 'tootcord';

let mast_instance = new Tootcord ('m.skymocha.net', 'access_token');

// Discord client.on for message
client.on ('message', async (message: Message) => {

    if (message.content.startsWith('!mastworld')) 
        mast_instance.post_toot ('Hello World!', message.attachments).

}

```

Since `post_toot` returns a `boolean` as `true` when sent successfully, otherwise `post_toot` returns `false`.

Currently `post_toot` returns `false` if the text is over 500 characters, you can implement length and error checking by doing the following:

```ts
// OPTION ONE
let toot: boolean = await masto.post_toot('Hello World!', message.attachments)

if (toot) {
    message.reply('toot sent successfully!')
}
else {
    message.reply('toot could not be sent (longer than 500 characters? unknown erorr?)')
}

// OPTION TWO
masto.post_toot('Hello World!', message.attachments).then ( success => {
        if (success) {
            message.reply('toot sent successfully!')
        }
        else {
            message.reply('toot could not be sent (longer than 500 characters? unknown erorr?)')
        }
    }
)

```

## Access Token

You will need your access token which can be found at:

>
> Preferences --> Development --> New application --> Submit --> Copy Access Token
>

## Known Issues

* You MAY need to change the updateMedia function of Mastodon to the v2 API. Depends on the user. Instructions to come eventually.

* Versions of `tootcord` less than 0.1.4 may have an issue with a blank FS package interfering with Node.JS built in FS

## Support Me

By following me on [Mastodon](https://m.skymocha.net/@skymocha), [YouTube](https://www.youtube.com/@skymochi64), [TikTok](https://www.tiktok.com/@skymochi64) or even supporting me on [Patreon](https://www.patreon.com/skymocha)!

## License  

CC-BY-4.0