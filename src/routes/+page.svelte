<script>
    import JeepStop from '$lib/components/JeepStop.svelte';
    import { onMount } from 'svelte';
    import { db } from '$lib/firebase.js';
    import { collection, onSnapshot } from 'firebase/firestore';
    import { params, url, fetchWeatherData } from '$lib/weather.js';
    import { getWeatherType } from '$lib/weathertype';
    import { getTimeSlotFromString, getLocationData, computeQuarterlyAverages, generateQuarterHourLabels, getQuarterHourLabelFromTimeSlot } from '$lib/helpers';
    import { stopAddress } from '$lib/stopaddress';
    import { aechConference, vinzonsHall, aech, area2, krusNaLigas } from '$lib/prevStopsData';

    let currentWeather = null;
    const quarterHourLabels = generateQuarterHourLabels();

    let aechLobbyData = [];
    let aechLobbyQuarterlyLabels = quarterHourLabels.labels;
    let aechLobbyQuarterlyAvg = [];

    onMount(() => {
        const unsubscribe = onSnapshot(collection(db, 'aechLobby'), (snapshot) => {
            // Get the most recent AECH Lobby data
            aechLobbyData = getLocationData(snapshot);

            // // Sort the data by timestamp
            // const latestAECHLobbyCount = aechLobbyData[0].personCount; // latest AECH Lobby count
            // const latestAECHLobbyTimestamp = getTimeSlotFromString(aechLobbyData[0].timestamp); // latest AECH Lobby data timestamp
            // const latestAECHLobbyCountInterval = getQuarterHourLabelFromTimeSlot(latestAECHLobbyTimestamp); // 09:01 -> 09:15

            // if (aechLobbyQuarterlyLabels[latestAECHLobbyCountInterval]) aechLobbyQuarterlyLabels[latestAECHLobbyCountInterval].push(latestAECHLobbyCount); // push to the interval
            // console.log('AECH Lobby intervals:', aechLobbyQuarterlyLabels);

            aechLobbyQuarterlyAvg = computeQuarterlyAverages(aechLobbyData, aechLobbyQuarterlyLabels); // compute averages of each interval
            console.log('AECH Lobby quarterly intervals:', aechLobbyQuarterlyLabels);
            console.log('AECH Lobby quarterly average:', aechLobbyQuarterlyAvg);

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

    <!-- AECH Lobby -->
    {#if aechLobbyData.length > 0}
        <JeepStop
            name = {aechLobbyData[0].location}
            address = {stopAddress[aechLobbyData[0].location]}
            count = {aechLobbyData[0].personCount}
            weather = {currentWeather}
            avg = {aechLobbyQuarterlyAvg}
            labels = {quarterHourLabels.columnLabels}
            lastUpdate = {aechLobbyData[0].timestamp}
        />
    {/if}

    <!-- Vinzons Hall -->
    <JeepStop
        name = {vinzonsHall.data.location}
        address = {stopAddress[vinzonsHall.data.location]}
        count = {vinzonsHall.data.personCount}
        weather = {currentWeather}
        avg = {vinzonsHall.avg}
        labels = {quarterHourLabels.columnLabels}
        lastUpdate = {vinzonsHall.data.timestamp}
    />

    <!-- AECH Conference -->
    <JeepStop
        name = {aechConference.data.location}
        address = {stopAddress[aechConference.data.location]}
        count = {aechConference.data.personCount}
        weather = {currentWeather}
        avg = {aechConference.avg}
        labels = {quarterHourLabels.columnLabels}
        lastUpdate = {aechConference.data.timestamp}
    />

    <!-- Krus Na Ligas -->
    <JeepStop
        name = {krusNaLigas.data.location}
        address = {stopAddress[krusNaLigas.data.location]}
        count = {krusNaLigas.data.personCount}
        weather = {currentWeather}
        avg = {krusNaLigas.avg}
        labels = {quarterHourLabels.columnLabels}
        lastUpdate = {krusNaLigas.data.timestamp}
    />

    <!-- AECH -->
    <JeepStop
        name = {aech.data.location}
        address = {stopAddress[aech.data.location]}
        count = {aech.data.personCount}
        weather = {currentWeather}
        avg = {aech.avg}
        labels = {quarterHourLabels.columnLabels}
        lastUpdate = {aech.data.timestamp}
    />

    <!-- Area 2 -->
    <JeepStop
        name = {area2.data.location}
        address = {stopAddress[area2.data.location]}
        count = {area2.data.personCount}
        weather = {currentWeather}
        avg = {area2.avg}
        labels = {quarterHourLabels.columnLabels}
        lastUpdate = {area2.data.timestamp}
    />

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
