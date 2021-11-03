import os
import logging
import discord
import finnhub

logging.basicConfig(level=logging.INFO)
discord_client = discord.Client()
finnhub_client = finnhub.Client(api_key=os.environ["FINNHUB_API_KEY"])

@discord_client.event
async def on_ready():
    print('We have logged in as {0.user}'.format(discord_client))

@discord_client.event
async def on_message(message):
    if message.author == discord_client.user:
        return

    if message.content.startswith('$'):
        logging.info(f"Received message {message.content}")
        ticker =  message.content.split()[0][1:]
        response = finnhub_client.quote(ticker)

        body = f"""```
{ticker}
    Current:    $ {response["c"]}
    Change:     $ {response["d"]}
    % Change:     {response["dp"]} %
    High:       $ {response["h"]}
    Low:        $ {response["l"]}
    Open:       $ {response["o"]}
    Prev Close: $ {response["pc"]}
```"""
        await message.channel.send(body)

discord_client.run(os.environ["DISCORD_BOT_TOKEN"])