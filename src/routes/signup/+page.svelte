<script lang="ts">
    import { enhance } from '$app/forms';
    import { validateEmail, validateFoundryLicense, validatePassword } from '$lib/validators.js';

    export let form;

    let email = form?.email ?? '';
    let emailIsInvalid: boolean | null = null;

    let password = '';
    let passwordIsInvalid: boolean | null = null;

    let foundryLicense = form?.foundryLicense ?? '';
    let foundryLicenseIsInvalid: boolean | null = null;

    const validateForm = () => {
        // Only change the isInvalid state on forms that have been interacted with already
        if (email) {
            emailIsInvalid = !validateEmail(email);
        }

        if (password) {
            passwordIsInvalid = !validatePassword(password);
        }

        if (foundryLicense) {
            foundryLicenseIsInvalid = !validateFoundryLicense(foundryLicense);
        }
    };
</script>

<svelte:head>
    <title>Sign Up | Roll With It</title>
</svelte:head>

<main id="sign-up" class="container">
    <article class="grid">
        <div id="sign-up-form">
            <hgroup>
                <h1>Sign Up</h1>
                {#if form}
                    <h2 style="color: red">{form?.message}</h2>
                {:else}
                    <h2>A Foundry license is required for an account.</h2>
                {/if}
            </hgroup>

            <form method="POST" use:enhance>
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    aria-label="Email"
                    aria-invalid={emailIsInvalid}
                    bind:value={email}
                    on:input={validateForm}
                    autocomplete="email"
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    aria-label="Password"
                    aria-invalid={passwordIsInvalid}
                    bind:value={password}
                    on:input={validateForm}
                    autocomplete="new-password"
                    required
                />
                <small>No silly requirements. Just 8 characters.</small>

                <input
                    type="text"
                    name="foundry-license"
                    placeholder="Foundry VTT License"
                    aria-label="Foundry VTT License"
                    aria-invalid={foundryLicenseIsInvalid}
                    bind:value={foundryLicense}
                    on:input={validateForm}
                    required
                />

                <fieldset>
                    <label for="remember">
                        <input type="checkbox" role="switch" id="remember" name="remember" />
                        Remember me
                    </label>
                </fieldset>

                <button type="submit">Sign Up</button>
                <p>
                    Already have an account? <a href="/login">Login Now</a>
                </p>
            </form>
        </div>
        <div id="sign-up-art" />
    </article>
</main>

<style>
    main#sign-up {
        position: absolute;
        top: 50%;
        left: 50%;

        transform: translate(-50%, -50%);
    }

    article {
        padding: 0;
    }

    div#sign-up-form {
        padding: 2rem;
    }

    div#sign-up-art {
        display: none;
        background-color: #374956;
        background-image: url('https://images.pexels.com/photos/977935/pexels-photo-977935.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
        background-position: center;
        background-size: cover;
    }

    @media (min-width: 992px) {
        div#sign-up-art {
            display: block;
        }
    }
</style>
