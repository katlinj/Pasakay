<script>
    import JeepStop from '$lib/components/JeepStop.svelte';
    import { onMount } from 'svelte';
    import { db } from '$lib/firebase.js';
    import { collection, onSnapshot } from 'firebase/firestore';
    import { params, url, fetchWeatherData } from '$lib/weather.js';
    import { getWeatherType } from '$lib/weathertype';
    import { getLocationData, computeHourlyAverages, computeQuarterlyAverages } from '$lib/helpers';
    import { vinzonsHall, krusNaLigas, AECH, area2 } from '$lib/stopnames';

    let currentWeather = null;
    let vinzonsQuarterlyAvg = [];
    let aechQuarterlyAvg = [];
    let krusNaLigasQuarterlyAvg = [];
    let area2QuarterlyAvg = [];

    onMount(() => {
        const unsubscribe = onSnapshot(collection(db, 'jeepStops'), (snapshot) => {
            // Per Stop
            const vinzonsData = getLocationData(snapshot, 'Vinzons Hall'); // most recent data
            const aechData = getLocationData(snapshot, 'AECH');
            const krusNaLigasData = getLocationData(snapshot, 'Krus na Ligas');
            const area2Data = getLocationData(snapshot, 'Area 2');

            if (vinzonsData.length > 0) vinzonsHall.set(vinzonsData[0]);
            if (krusNaLigasData.length > 0) krusNaLigas.set(krusNaLigasData[0]);
            if (aechData.length > 0) AECH.set(aechData[0]);
            if (area2Data.length > 0) area2.set(area2Data[0]);

            aechQuarterlyAvg = computeQuarterlyAverages(aechData); // quarterly average data
            console.log('AECH:', aechQuarterlyAvg);

            vinzonsQuarterlyAvg = computeQuarterlyAverages(vinzonsData);
            console.log('Vinzons Hall:', vinzonsQuarterlyAvg);

            krusNaLigasQuarterlyAvg = computeQuarterlyAverages(krusNaLigasData);
            console.log('Krus na Ligas:', krusNaLigasQuarterlyAvg);

            area2QuarterlyAvg = computeQuarterlyAverages(area2Data);
            console.log('Area 2:', area2QuarterlyAvg);
        
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

    <!-- Vinzons Hall -->
    <JeepStop
        name = {$vinzonsHall.location}
        address = 'M33F+P88, UP Diliman, Quezon City, Metro Manila'
        count = {$vinzonsHall.personCount}
        weather = {currentWeather}
        avg = {vinzonsQuarterlyAvg.quarterlyAvg}
        labels = {vinzonsQuarterlyAvg.columnLabels}
        lastUpdate = {$vinzonsHall.timestamp}
    />

    <!-- Krus na Ligas -->
    <JeepStop
        name = {$krusNaLigas.location}
        address = '56 B. Baluyot, Diliman, Quezon City, Metro Manila'
        count = {$krusNaLigas.personCount}
        weather = {currentWeather}
        avg = {krusNaLigasQuarterlyAvg.quarterlyAvg}
        labels = {krusNaLigasQuarterlyAvg.columnLabels}
        lastUpdate = {$krusNaLigas.timestamp}
    />

    <!-- AECH -->
    <JeepStop
        name = {$AECH.location}
        address = 'J3X9+FFG, P. Velasquez Street, UP Diliman, Quezon City, Metro Manila'
        count = {$AECH.personCount}
        weather = {currentWeather}
        avg = {aechQuarterlyAvg.quarterlyAvg}
        labels = {aechQuarterlyAvg.columnLabels}
        lastUpdate = {$AECH.timestamp}
    />

    <!-- Area 2 -->
    <JeepStop
        name = {$area2.location}
        address = 'M359+W97, J.P. Laurel, UP Diliman, Quezon City, Metro Manila'
        count = {$area2.personCount}
        weather = {currentWeather}
        avg = {area2QuarterlyAvg.quarterlyAvg}
        labels = {area2QuarterlyAvg.columnLabels}
        lastUpdate = {$area2.timestamp}
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
