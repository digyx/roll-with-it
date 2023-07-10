<script lang="ts">
    import { enhance } from '$app/forms';
    export let form;
</script>

<svelte:head>
    <title>Login | Roll With It</title>
</svelte:head>

<main id="login" class="container">
    <article class="grid">
        <div id="login-form">
            <hgroup>
                <h1>Login</h1>
                {#if form}
                    <h2 style="color: red">{form?.message}</h2>
                {:else}
                    <h2>Email and password, please</h2>
                {/if}
            </hgroup>

            <form method="post" use:enhance>
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={form?.email ?? ''}
                    aria-label="Email"
                    autocomplete="email"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    aria-label="Login"
                    autocomplete="current-password"
                    required
                />
                <fieldset>
                    <label for="remember">
                        <input type="checkbox" role="switch" id="remember" name="remember" />
                        Remember me
                    </label>
                </fieldset>

                <button type="submit">Login</button>
                <p>
                    Don't have an account? <a href="/signup">Sign Up Now</a>
                </p>
            </form>
        </div>
        <div id="login-art" />
    </article>
</main>

<style>
    main#login {
        position: absolute;
        top: 50%;
        left: 50%;

        transform: translate(-50%, -50%);
    }

    article {
        padding: 0;
    }

    div#login-form {
        padding: 2rem;
    }

    div#login-art {
        display: none;
        background-color: #374956;
        background-image: url('https://images.pexels.com/photos/977935/pexels-photo-977935.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
        background-position: center;
        background-size: cover;
    }

    @media (min-width: 992px) {
        div#login-art {
            display: block;
        }
    }
</style>
