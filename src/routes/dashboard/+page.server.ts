import type { Actions, PageServerLoad } from './$types';

import { fail, redirect } from '@sveltejs/kit';
import { users } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import { supportedFoundryVersions } from '$lib/foundryVersions';

export const load: PageServerLoad = async ({ parent, locals: { db, redis } }) => {
    const { session } = await parent();

    if (!session) {
        throw redirect(303, '/login');
    }

    const res = await db
        .select({
            instanceUrl: users.instanceUrl,
            foundryVersion: users.foundryVersion
        })
        .from(users)
        .where(eq(users.id, session.user.id));

    const { instanceUrl, foundryVersion } = res[0];

    const storageQuota = await redis.hget(session.user.id, 'storageQuota');
    const isRunning = await redis.hget(session.user.id, 'isRunning');
    const currentWorld = await redis.hget(session.user.id, 'currentWorld');

    return {
        storageQuota: parseInt(storageQuota ?? '0'),
        isRunning: isRunning === 'true',
        currentWorld: currentWorld ?? 'None',
        instanceUrl: `https://${instanceUrl}.rollwithit.app/join`,
        foundryVersion
    };
};

export const actions: Actions = {
    changeFoundryVersion: async ({ request, locals: { getSession, db } }) => {
        const formData = await request.formData();
        const foundryVersion = formData.get('foundry-version') as string;

        const session = await getSession();

        if (!session) {
            return fail(403, {
                message: 'Unauthorized'
            });
        }

        if (!supportedFoundryVersions.includes(foundryVersion)) {
            return fail(404, {
                message: 'Unsupported Foundry Version'
            });
        }

        await db.update(users).set({ foundryVersion }).where(eq(users.id, session.user.id));

        throw redirect(303, '/dashboard');
    }
};
