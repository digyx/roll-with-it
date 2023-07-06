<script lang="ts">
    import '@picocss/pico';
    import '../app.css';

    export let data;
</script>

<nav class="container-fluid">
    <ul>
        <li>
            <a href="/"><strong>Roll With It</strong></a>
        </li>
    </ul>

    <ul>
        {#if data.session === null}
            <li><a href="/login">Login</a></li>
        {:else}
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/account">Account</a></li>
        {/if}
    </ul>
</nav>

<slot />
