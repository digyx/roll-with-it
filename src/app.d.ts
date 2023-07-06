// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { SupabaseClient, Session } from '@supabase/supabase-js';
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import type { Redis } from 'ioredis';

declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            db: PostgresJsDatabase;
            redis: Redis;
            supabase: SupabaseClient;
            getSession: () => Promise<Session | null>;
        }
        // interface PageData {}
        // interface Platform {}
    }
}

export {};
