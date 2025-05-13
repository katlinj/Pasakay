<script>
    import Header from '$lib/components/Header.svelte';

	let { children } = $props();
</script>

<Header/>

{@render children()}

<div class="shadow"></div>

<style>
    .shadow {
        position:fixed;
        background: linear-gradient(to top, #14141fff, transparent);
        bottom: 0px;
        left: 0px;
        width: 100%;
        height: 15%;
        z-index: 999;
    }
</style>