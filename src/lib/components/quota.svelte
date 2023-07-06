<script lang="ts">
    export let current: number;
    export let currentDisplay: string;
    export let maxDisplay: string;
</script>

<slot />

<div id="storage-quota-label">
    <p>{currentDisplay}</p>
    <p>{maxDisplay}</p>
</div>
<progress id="storage-quota" value={current} max="1" />

<style>
    div#storage-quota-label {
        display: flex;
        justify-content: space-between;
    }
</style>
