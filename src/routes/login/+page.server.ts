import type { Actions } from './$types';

import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
    default: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData();
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            return fail(error.status ?? 500, {
                message: error.message,
                success: false,
                email
            });
        }

        throw redirect(303, '/dashboard');
    }
};
