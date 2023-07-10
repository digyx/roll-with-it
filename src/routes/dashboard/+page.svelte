<script lang="ts">
    import Quota from '$lib/components/quota.svelte';
    import Dashboard from '$lib/components/dashboard.svelte';

    export let data;
    let { storageQuota, isRunning, currentWorld, instanceUrl, foundryVersion } = data;
</script>

<svelte:head>
    <title>Dashboard | Roll With It</title>
</svelte:head>

<main class="container">
    <h1>Dashboard</h1>

    <section>
        <Dashboard {isRunning} {currentWorld} {instanceUrl} {foundryVersion} />
    </section>

    <section id="storage-quota">
        <Quota
            current={storageQuota / 10000}
            currentDisplay={`Used: ${(storageQuota / 1024).toFixed(2)} GB`}
            maxDisplay="Total: 10 GB"
        >
            <hgroup>
                <h1>Storage Quota</h1>
                <h2>
                    Includes assets and <span
                        data-tooltip="The Foundry application does not count against your quota."
                        data-placement="right">game data.</span
                    >
                </h2>
            </hgroup>
        </Quota>
    </section>
</main>
