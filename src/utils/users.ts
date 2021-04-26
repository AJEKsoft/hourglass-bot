import {
  GuildMember, Message, Snowflake, User,
} from 'discord.js';
import config from 'config';
import {client} from './client';

export const isAdmin = (user: GuildMember) => user.roles.cache.some(
  (role) => (config.get('adminRoles') as string[]).some(
    (adminRole) => adminRole === role.id,
  ),
);
