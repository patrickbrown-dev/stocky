# Stocky

[![CodeQL](https://github.com/p16n/stocky/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/p16n/stocky/actions/workflows/codeql-analysis.yml) [![Create and publish a Docker image](https://github.com/p16n/stocky/actions/workflows/docker-image.yml/badge.svg)](https://github.com/p16n/stocky/actions/workflows/docker-image.yml) [![Canary Deployment](https://github.com/p16n/stocky/actions/workflows/canary-deployment.yml/badge.svg?branch=main&event=push)](https://github.com/p16n/stocky/actions/workflows/canary-deployment.yml) [![Production Deployment](https://github.com/p16n/stocky/actions/workflows/production-deployment.yml/badge.svg?branch=main&event=release)](https://github.com/p16n/stocky/actions/workflows/production-deployment.yml)

![Image of Mr. Stocky himself](./stocky.png)

Stocky is a little Discord bot that knows about stocks.

## Installation

**Stocky is now available for the public!** Simply click on the following link
and authorize him to the server of your choosing.

[https://discord.com/api/oauth2/authorize?client_id=905504527418003486&scope=applications.commands](https://discord.com/api/oauth2/authorize?client_id=905504527418003486&scope=applications.commands)

## Development

1. Create your bot in the [Discord Developer Portal][discord_dev_portal].
2. Generate an API key from [FinnHub][finnhub].
3. Populate `.env` with the secrets from your Discord Bot and FinnHub. Use `.env_example` for help.
4. Build the docker image: `docker build . --file Dockerfile --tag stocky:latest`
5. Run the `DeployCommands` script: `docker run -i --env-file=.env stocky:latest node target/DeployCommands.js`
6. Run Stocky in docker: `docker run --env-file=.env stocky:latest`

## Usage

* `/quote SYMBOL`: Get real-time quote data for US stocks.
* `/basic_financials SYMBOL`: Get company basic financials such as margin, P/E ratio, 52-week high/low etc.

Don't see a command you want? I accept PRs!


[finnhub]: https://finnhub.io
[discord_dev_portal]: https://discord.com/developers/applications
