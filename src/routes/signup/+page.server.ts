import { users } from '$lib/db/schema';
import type { Actions } from './$types';

import { fail, redirect } from '@sveltejs/kit';
import { uniqueNamesGenerator, adjectives, animals } from 'unique-names-generator';
import { validateEmail, validateFoundryLicense } from '$lib/validators';

export const actions: Actions = {
    default: async ({ request, url, locals: { supabase, db } }) => {
        const formData = await request.formData();

        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const foundryLicense = formData.get('foundry-license') as string;

        // Validate form data
        if (!validateEmail(email)) {
            return fail(422, {
                message: 'Invalid email address',
                email,
                foundryLicense
            });
        }

        if (!validateFoundryLicense(foundryLicense)) {
            return fail(422, {
                message: 'Invalid Foundry license',
                email,
                foundryLicense
            });
        }

        const {
            data: { user },
            error
        } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${url.origin}/auth/callback`
            }
        });

        if (error) {
            return fail(error.status ?? 500, {
                message: error.message,
                email,
                foundryLicense
            });
        } else if (user?.identities?.length === 0) {
            return fail(409, {
                message: 'User already registered',
                email,
                foundryLicense
            });
        }

        await db.insert(users).values({
            id: user?.id ?? 'uwu',
            foundryLicense,
            instanceUrl: uniqueNamesGenerator({
                dictionaries: [adjectives, animals],
                separator: '-'
            })
        });

        throw redirect(303, '/signup/success');
    }
};
