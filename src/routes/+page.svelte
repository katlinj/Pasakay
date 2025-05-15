<script>
    import JeepStop from '$lib/components/JeepStop.svelte';

    import { onMount } from 'svelte';
    import { db } from '$lib/firebase.js';
    import { collection, onSnapshot } from 'firebase/firestore';
    import { params, url, fetchWeatherData } from '$lib/weather.js';
    import { getWeatherType } from '$lib/weathertype';

    let jeepStops = [];
    let currentWeather = '';

    // Listens to the 'jeepStops' collection and updates each card for every change
    onMount(() => {
        const unsubscribe = onSnapshot(collection(db, 'jeepStops'), (snapshot) => {
            jeepStops = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            // Fetch current weather data whenever data is updated
            fetchWeatherData(params, url).then((data) => {
                const weatherCode = data.current.weatherCode;
                const currentTemp = Math.round(data.current.temperature2m);
                currentWeather = getWeatherType(weatherCode) + ', ' + currentTemp + '°C';
            });
        });

        return () => unsubscribe();
    });
</script>

<div class="jeepStopList">

    {#each jeepStops as stop}
        {#if stop.location == 'Vinzons Hall'}
            <JeepStop
                name = {stop.location}
                address = 'M33F+P88, Diliman, Quezon City, Metro Manila'
                count = {stop.personCount}
                weather = {currentWeather}
            />
        {/if}
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
