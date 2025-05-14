<script>
    import JeepStop from '$lib/components/JeepStop.svelte';

    import { onMount } from 'svelte';
    import { db } from '$lib/firebase.js';
    import { collection, onSnapshot } from 'firebase/firestore';

    let jeepStops = [];

    onMount(() => {
        const unsubscribe = onSnapshot(collection(db, 'jeepStops'), (snapshot) => {
        jeepStops = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        console.log(jeepStops);
        });

        return () => unsubscribe();
    });
</script>

<div class="jeepStopList">

    {#each jeepStops as stop}
        <JeepStop
            name = {stop.name}
            address = {stop.address}
            count = {stop.peopleCount}
            weather = 'Sunny, 32°C'
        />
    {/each}

</div>

<style>
    :global(body) {
        background-color:#14141f;
        color: #B2C6CF;
        font-family:sans-serif;
    }

    .jeepStopList {
        display:flex;
        flex-direction: column;
        gap: 1em;
        margin:1em;
        align-items: center;
    }
</style>
