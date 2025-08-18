const { Client, GatewayIntentBits } = require('discord.js');
const Database = require('better-sqlite3');
const path = require('path');
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
});

const db = new Database(path.join(__dirname, '../staff.db'));

// 🔧 Ensure displayname column exists
db.prepare(`
  CREATE TABLE IF NOT EXISTS staff (
    user_id TEXT PRIMARY KEY,
    username TEXT,
    tag TEXT,
    avatar TEXT,
    description TEXT,
    role TEXT,
    displayname TEXT
  )
`).run();
const token = 'MTQwMDE3MjczOTgyNTg5MzQ2OA.GQ-27D.it5TFltEMJvigCdxG1h0KX7zPAojRkBc0-u8mQ';
const GUILD_ID = '1340992503637217330';
const STAFF_ROLE_ID = '1353033811180388498';

client.once('ready', async () => {
  console.log(`🤖 Logged in as ${client.user.tag}`);
  const guild = await client.guilds.fetch(GUILD_ID);
  const members = await guild.members.fetch();

  const insert = db.prepare(`
    INSERT OR REPLACE INTO staff (
      user_id, username, tag, avatar, description, role, displayname
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  members.forEach(member => {
    if (member.roles.cache.has(STAFF_ROLE_ID)) {
      insert.run(
        member.user.id,
        member.user.username,
        `${member.user.username}#${member.user.discriminator}`,
        member.user.displayAvatarURL({ dynamic: true }),
        '', // description is blank unless edited later
        'Staff',
        member.displayName // ✅ Server display name (nickname or username)
      );
    }
  });

  console.log('✅ Staff synced to database');
  client.destroy();
});

client.login(token);
