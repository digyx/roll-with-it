<script lang="ts">
    import { goto } from '$app/navigation';
    import { enhance } from '$app/forms';

    export let data;
    export let form;

    let showFoundryPassword = false;

    let currentPassword = '';
    let newPassword = '';
    let confirmPassword = '';

    let { session, supabase, foundryLicense, foundryPassword } = data;
    $: ({ session, supabase } = data);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        goto('/', { invalidateAll: true });
    };
</script>

<svelte:head>
    <title>Account | Roll With It</title>
</svelte:head>

<main class="container">
    <h1>Account</h1>
    <section>
        <form method="POST" action="?/updateAccount">
            {#if form?.type === 'updateAccount'}
                <small style="color: {form?.success ? 'green' : 'red'}">{form?.message}</small>
            {/if}
            <label for="email">
                Email
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={form?.email ?? session?.user.email ?? 'You should not be here.'}
                    aria-label="Email"
                    autocomplete="email"
                    required
                />
            </label>

            <label for="foundry-license">
                Foundry License
                <input
                    type="text"
                    name="foundry-license"
                    placeholder="Foundry License"
                    value={form?.foundryLicense ?? foundryLicense}
                    aria-label="Foundry License"
                    required
                />
            </label>

            <label for="foundry-password">
                Foundry Admin Password
                <input
                    type={showFoundryPassword ? 'text' : 'password'}
                    name="foundry-password"
                    placeholder="Foundry Admin Password"
                    aria-label="Foundry Admin Password"
                    value={foundryPassword}
                    required
                />
            </label>

            <label for="show-foundry-password">
                <input
                    type="checkbox"
                    role="switch"
                    id="show-foundry-password"
                    name="show-foundry-password"
                    bind:checked={showFoundryPassword}
                />
                Show Foundry Admin Password
            </label>

            <!-- Needed for spacing -->
            <br />

            <button type="submit">Save Changes</button>
        </form>
    </section>

    <section>
        <form method="POST" action="?/changePassword" use:enhance>
            {#if form?.type === 'changePassword'}
                <small style="color: {form?.success ? 'green' : 'red'}">{form.message}</small>
            {/if}
            <label for="current-password">
                Current Password
                <input
                    type="password"
                    name="current-password"
                    placeholder="Current password"
                    aria-label="Current Password"
                    autocomplete="current-password"
                    bind:value={currentPassword}
                    required
                />
            </label>

            <div class="grid">
                <label for="new-password">
                    New Password
                    <input
                        type="password"
                        name="new-password"
                        placeholder="Leave empty to keep your current password"
                        aria-label="New Password"
                        autocomplete="new-password"
                        bind:value={newPassword}
                        aria-invalid={newPassword.length === 0
                            ? null
                            : newPassword.length < 8
                            ? true
                            : false}
                        required
                    />
                </label>
                <label for="confirm-password">
                    Confirm New Password
                    <input
                        type="password"
                        name="confirm-password"
                        placeholder="Confirm your new password"
                        aria-label="Confirm Password"
                        autocomplete="new-password"
                        bind:value={confirmPassword}
                        aria-invalid={confirmPassword.length === 0
                            ? null
                            : newPassword !== confirmPassword
                            ? true
                            : false}
                        required
                    />
                </label>
            </div>

            <button
                type="submit"
                disabled={currentPassword.length === 0 ||
                newPassword.length < 8 ||
                newPassword !== confirmPassword
                    ? true
                    : false}
            >
                Change Password
            </button>
        </form>
    </section>

    <section>
        <hgroup>
            <h3>Billing Information</h3>
            <h4>Thank you for your support!</h4>
        </hgroup>
    </section>

    <button on:click={handleLogout} class="secondary" type="submit">Logout</button>
</main>
