import {Client, Message} from 'discord.js';
import config from 'config';

export const client = new Client({
  fetchAllMembers: false,
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
  presence: {
    status: 'online',
    // activity: {
    //   name: 'no one.',
    //   type: 'LISTENING',
    // },
  },
});
