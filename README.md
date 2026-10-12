# RebellsBot

Open-source Discord bot for **DayZ** (PC / Xbox / PlayStation), **Arma Reforger**, and **Rust**.

Shared Discord currency · clean market GUI · orders for in-game delivery · multi-server slots · MIT license.

**Not tied to Expansion Mod.** Catalogs use normal game classnames you define.

## Deploy

```bash
git clone https://github.com/Rebellpntball/RebellsBot.git
cd RebellsBot
cp .env.example .env
# set DISCORD_TOKEN, CLIENT_ID, GUILD_ID, MONGO_URI, OWNER_IDS
cp config/servers.example.js config/servers.js
npm install
npm run deploy
npm start
```

Then in Discord: `/seedcatalog` → `/shop`

## Commands

Players: `/shop` `/market` `/basket` `/balance` `/pay` `/daily` `/link` `/leaderboard`
Staff: `/orders` `/adjust` `/seedcatalog`

## License

MIT
