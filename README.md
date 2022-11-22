# tootcord

A simple library for posting toots to one or multiple Mastodon server.

## Documentation

```ts
import { Tootcord } from 'tootcord';

let mast_instance = new Tootcord ('m.skymocha.net', 'access_token');

// Discord client.on for message
client.on ('message', async (message: Message) => {

    if (message.content.startsWith('!mastworld')) 
        mast_instance.post_toot ('Hello World!', message.attachments);

}

```