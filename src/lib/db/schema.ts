import { pgTable, text, uuid, varchar } from 'drizzle-orm/pg-core';
import { supportedFoundryVersions } from '../foundryVersions';

export const users = pgTable('users', {
    id: uuid('id').primaryKey(),
    foundryLicense: varchar('foundry_license', { length: 29 }).notNull(),
    foundryVersion: text('foundry_version').default(supportedFoundryVersions[0]).notNull(),
    instanceUrl: text('instance_url').notNull()
});
