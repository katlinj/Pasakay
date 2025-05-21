<script>
    import JeepStop from '$lib/components/JeepStop.svelte';
    import { onMount } from 'svelte';
    import { db } from '$lib/firebase.js';
    import { collection, onSnapshot } from 'firebase/firestore';
    import { params, url, fetchWeatherData } from '$lib/weather.js';
    import { getWeatherType } from '$lib/weathertype';
    import { getLocationData, computeQuarterlyAverages, sortJeepStopList } from '$lib/helpers';
    import { stopAddress } from '$lib/stopaddress';

    let currentWeather = null;
    const locationsSet = new Set();
    const jeepStopList = [];

    onMount(() => {
        const unsubscribe = onSnapshot(collection(db, 'jeepStops'), (snapshot) => {
            // Collect unique locations
            snapshot.forEach((doc) => {
                const data = doc.data();
                const location = data.location;

                if (location && location !== 'basi_house') {
                    locationsSet.add(location);
                }
            });
            
            jeepStopList.length = 0;
            locationsSet.forEach((location) => {
                const locationData = getLocationData(snapshot, location);
                const locationAvg = computeQuarterlyAverages(locationData);
                if (locationData.length > 0) jeepStopList.push([locationData[0], locationAvg]);
            });
            sortJeepStopList(jeepStopList);

            console.log('jeepStopList: ', jeepStopList);

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

    {#each jeepStopList as [locationData, locationAvg]}
        <JeepStop
            name = {locationData.location}
            address = {stopAddress[locationData.location]}
            count = {locationData.personCount}
            weather = {currentWeather}
            avg = {locationAvg.quarterlyAvg}
            labels = {locationAvg.columnLabels}
            lastUpdate = {locationData.timestamp}
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
