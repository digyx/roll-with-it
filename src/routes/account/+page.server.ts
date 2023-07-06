import { users } from '$lib/db/schema';
import { validateEmail, validateFoundryLicense } from '$lib/validators';
import type { Actions, PageServerLoad } from './$types';

import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ parent, locals: { db } }) => {
    const { session } = await parent();

    if (!session) {
        throw redirect(303, '/login');
    }

    const res = await db
        .select({
            foundryLicense: users.foundryLicense,
            foundryVersion: users.foundryVersion
        })
        .from(users)
        .where(eq(users.id, session.user.id));

    const { foundryLicense, foundryVersion } = res[0];

    return {
        foundryLicense,
        foundryVersion
    };
};

export const actions: Actions = {
    updateAccount: async ({ request, url, locals: { getSession, supabase, db } }) => {
        const formData = await request.formData();
        const email = formData.get('email') as string;
        const foundryLicense = formData.get('foundry-license') as string;

        const session = await getSession();
        if (!session) {
            return fail(403, {
                type: 'updateAccount',
                message: 'Unauthorized',
                success: false
            });
        }

        if (session.user.email !== email) {
            // Ensure we have a valid email
            if (!validateEmail(email)) {
                return fail(422, {
                    type: 'updateAccount',
                    message: 'Invalid email address.',
                    success: false
                });
            }

            // Change the email
            let { error } = await supabase.auth.updateUser(
                {
                    email
                },
                {
                    emailRedirectTo: `${url.origin}/auth/callback`
                }
            );

            if (error) {
                return fail(error.status ?? 500, {
                    type: 'updateAccount',
                    message: error.message,
                    success: false
                });
            }
        }

        // Ensure Foundry License is valid
        if (!validateFoundryLicense(foundryLicense)) {
            return fail(422, {
                type: 'updateAccount',
                message: 'Invalid Foundry license.',
                success: false
            });
        }

        // Update Foundry license
        await db.update(users).set({ foundryLicense }).where(eq(users.id, session.user.id));

        return {
            type: 'updateAccount',
            message: 'Saved.',
            success: true,
            email,
            foundryLicense
        };
    },

    changePassword: async ({ request, locals: { getSession, supabase } }) => {
        const formData = await request.formData();
        const currentPassword = formData.get('current-password') as string;
        const newPassword = formData.get('new-password') as string;

        const session = await getSession();
        if (!session) {
            throw redirect(303, '/login');
        }

        // Check that the user put in the correct password
        let { error } = await supabase.auth.signInWithPassword({
            email: session.user.email as string,
            password: currentPassword
        });

        if (error) {
            return fail(error.status ?? 403, {
                type: 'changePassword',
                message: error.message,
                success: false
            });
        }

        // Update the user's password
        let res = await supabase.auth.updateUser({
            password: newPassword
        });

        if (res.error) {
            return fail(res.error.status ?? 500, {
                type: 'changePassword',
                message: res.error.message,
                success: false
            });
        }

        return {
            type: 'changePassword',
            message: 'Password has been changed.',
            success: true
        };
    }
};
