# Tootcord

A simple library for posting toots to one or multiple Mastodon server within a Discord.JS bot. 

## Documentation

The primary command is `post_toot` under the `Tootcord` class.

An example can be found in `example.ts`, otherwise, the following is a shorthand example:

```ts
import { Tootcord } from 'tootcord';

let mast_instance = new Tootcord ('m.skymocha.net', 'access_token');

// Discord client.on for message
client.on ('message', async (message: Message) => {

    if (message.content.startsWith('!mastworld')) 
        mast_instance.post_toot ('Hello World!', message.attachments);

}

```

Since `post_toot` returns a `boolean` as true when sent, and currently false if over 500 characters, you can implement length checking by doing the following:

```ts
let toot: boolean = masto.post_toot('Hello World!', message.attachments)

if (toot) {
    message.reply(' toot sent successfully!')
}
else {
    message.reply(' toot could not be sent (longer than 500 characters?)')
}
```

## Access Token

You will need your access token which can be found at:

> Preferences --> Development --> New application --> Submit --> Copy Access Token

## Known Issues

* You MAY need to change the updateMedia function of Mastodon to the v2 API. Depends on the user. Instructions to come eventually.

## Support Me

Support me by following me on [YouTube](https://www.youtube.com/@skymochi64) or [TikTok](https://www.tiktok.com/@skymochi64) or even supporting me on [Patreon](https://www.patreon.com/skymocha)!

## License  

CC-BY-4.0