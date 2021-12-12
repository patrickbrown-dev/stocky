# Stocky

[![CodeQL](https://github.com/p16n/stocky/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/p16n/stocky/actions/workflows/codeql-analysis.yml)[![Create and publish a Docker image](https://github.com/p16n/stocky/actions/workflows/docker-image.yml/badge.svg)](https://github.com/p16n/stocky/actions/workflows/docker-image.yml)[![Upsert slash commands for Discord bot](https://github.com/p16n/stocky/actions/workflows/deploy-commands.yml/badge.svg)](https://github.com/p16n/stocky/actions/workflows/deploy-commands.yml)

![Image of Mr. Stocky himself](./stocky.png)

Stocky is a little Discord bot that knows about stocks.

## Installation

At the moment the version of this bot I host isn't publicly available. In the meantime, you could do the following:

1. Create your bot in the [Discord Developer Portal][discord_dev_portal].
2. Generate an API key from [FinnHub][finnhub].
3. Populate `k8s/secrets.yml` with the secrets from your Discord Bot, desired Discord server, and FinnHub.
4. Run the `deploy-commands.yml` script (you'll need to set secrets as Environment Variables or use a `.env` file).
5. Apply `k8s/stocky.yml` and `k8s/secrets.yml` to your Kubernetes cluster.

In the future, adding Stocky to your Discord Server will be as simple as clicking a link and granting him permissions.

## Usage

* `/quote SYMBOL`: Get real-time quote data for US stocks.
* `/basic_financials SYMBOL`: Get company basic financials such as margin, P/E ratio, 52-week high/low etc.

Don't see a command you want? I accept PRs!



[finnhub]: https://finnhub.io
[discord_dev_portal]: https://discord.com/developers/applications