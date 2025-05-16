<script>
    import JeepStop from '$lib/components/JeepStop.svelte';

    import { onMount } from 'svelte';
    import { db } from '$lib/firebase.js';
    import { collection, onSnapshot } from 'firebase/firestore';
    import { params, url, fetchWeatherData } from '$lib/weather.js';
    import { getWeatherType } from '$lib/weathertype';

    let vinzonsHall = {
        location: 'Vinzons Hall',
        personCount: 0,
    };

    let krusNaLigas = {
        location: 'Krus na Ligas',
        personCount: 0,
    };

    let AECH = {
        location: 'AECH',
        personCount: 0,
    };

    let area2 = {
        location: 'Area 2',
        personCount: 0,
    };

    let currentWeather = null;

	onMount(() => {
		const unsubscribe = onSnapshot(collection(db, 'jeepStops'), (snapshot) => {
            // Most recent document for Vinzons Hall
			const vinzonsData = snapshot.docs
				.map(doc => ({ id: doc.id, ...doc.data() }))
				.filter(doc => doc.location === 'Vinzons Hall')
				.sort((a, b) => b.lastUpdated.toMillis() - a.lastUpdated.toMillis());

			if (vinzonsData.length > 0) {
                vinzonsHall = vinzonsData[0];
			}

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
        name = {vinzonsHall.location}
        address = 'M33F+P88, Diliman, Quezon City, Metro Manila'
        count = {vinzonsHall.personCount}
        weather = {currentWeather}
    />

    <!-- Krus na Ligas -->
    <JeepStop
        name = {krusNaLigas.location}
        address = '56 B. Baluyot, Diliman, Quezon City, Metro Manila'
        count = {krusNaLigas.personCount}
        weather = {currentWeather}
    />

    <!-- AECH -->
    <JeepStop
        name = {AECH.location}
        address = 'J3X9+FFG, P. Velasquez Street, UP Campus Diliman, Quezon City, 1101 Metro Manila'
        count = {AECH.personCount}
        weather = {currentWeather}
    />

    <!-- Area 2 -->
    <JeepStop
        name = {area2.location}
        address = 'M359+W97, J.P. Laurel, Diliman, Quezon City, Metro Manila'
        count = {area2.personCount}
        weather = {currentWeather}
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
