<script lang="ts">
    import { goto } from '$app/navigation';

    export let isOpen: boolean;
</script>

<dialog open={isOpen}>
    <article>
        <slot />

        <footer>
            <div class="grid">
                <button type="submit">Confirm</button>
                <button type="button" class="secondary" on:click={() => goto('')}>Cancel</button>
            </div>
        </footer>
    </article>
</dialog>
