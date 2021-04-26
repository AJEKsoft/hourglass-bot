import config from 'config';
import signale from 'signale';
import path from 'path';
import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import {client} from './utils/client';
import {isAdmin} from './utils/users';

signale.config({
  displayTimestamp: true,
});

const db = lowdb(new FileSync('db.json'));
db.defaults({announcement: ''})
  .write();

// Reaction attendance functionality
client.on('message', async (msg) => {
  if (!msg.guild || msg.author.bot || !isAdmin(msg.member)) return;
  if (config.get('channels.dates') !== msg.channel.id) return;
  if (!msg.cleanContent.match(/next jam/gi)) return;

  signale.info('New date');

  // Clean up all the previous attendee roles
  const role = await msg.guild.roles.fetch(config.get('roles.attendee'));
  for (const attendee of role.members) {
    attendee[1].roles.remove(role);
  }

  // Post a message
  const announcement = await msg.channel.send(`**Hey @everyone!**
React to this message to get this week's <@&${config.get('roles.attendee')}> role and access the jamming channels!
I just can't wait!`);
  announcement.react('🔥');
  await db.set('announcement', announcement.id).write();
});

client.on('messageReactionAdd', async (reaction) => {
  if (reaction.me) return;
  if (reaction.message.id !== await db.get('announcement').value()) return;

  await reaction.fetch().catch((err) => signale.error(err));
  const role = reaction.message.guild.roles.cache.get(config.get('roles.attendee'));
  for (const el of reaction.users.cache) {
    const user = reaction.message.guild.members.cache.find((member) => member.id === el[1].id);
    user.roles.add(role);
  }
});

client.login(config.get('discord.token'));
signale.success('Bot started!');
