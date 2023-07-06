<script lang="ts">
    import { page } from '$app/stores';
    import { supportedFoundryVersions } from '$lib/foundryVersions';
    import ConfirmationModal from '$lib/components/confirmationModal.svelte';

    export let isRunning: boolean;
    export let currentWorld: string;
    export let instanceUrl: string;
    export let foundryVersion: string;

    $: selectedVersion = $page.url.hash.split('?')[1];
</script>

<article>
    <div class="grid">
        <label for="instance-status">
            Foundry Status
            <input
                type="text"
                id="instance-status"
                value={isRunning ? 'Running' : 'Stopped'}
                aria-invalid={!isRunning}
                readonly
            />
        </label>

        <label for="current-world">
            Current World
            <input type="text" id="current-world" value={currentWorld} readonly />
        </label>

        <label for="foundry-version">
            Foundry Version
            <details role="list">
                <summary style="color: var(--form-element-color)" aria-haspopup="listbox">
                    {foundryVersion}
                </summary>

                <ul role="listbox">
                    {#each supportedFoundryVersions.filter((ver) => ver != foundryVersion) as ver}
                        <li><a href={`#open?${ver}`}>{ver}</a></li>
                    {/each}
                </ul>
            </details>
        </label>
    </div>

    <label for="link">
        Instance Link
        <input type="text" id="instance-link" value={instanceUrl} readonly />
    </label>

    <div class="grid">
        <div />
        <div class="grid">
            <button
                class={isRunning ? 'secondary outline' : 'primary'}
                disabled={isRunning ? true : false}
            >
                Start
            </button>
            <button
                class={isRunning ? 'primary' : 'secondary outline'}
                disabled={isRunning ? false : true}
            >
                Stop
            </button>

            <button
                class="secondary"
                on:click={() => {
                    window.location.href = instanceUrl;
                }}
            >
                Launch
            </button>
        </div>
    </div>
</article>

<form method="POST" action="?/changeFoundryVersion">
    <input type="hidden" bind:value={selectedVersion} name="foundry-version" />

    <ConfirmationModal isOpen={$page.url.hash.startsWith('#open')}>
        <h1>Are you sure?</h1>
        <p>Are you sure that you would like to switch to version {selectedVersion}?</p>
        <br />
        <small
            ><em>Note: we recommend that you do <strong>not</strong> downgrade Foundry versions.</em
            ></small
        >
    </ConfirmationModal>
</form>
