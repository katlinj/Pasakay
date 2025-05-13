<script>
    import JeepStop from '$lib/components/JeepStop.svelte';

</script>

<div class="jeepStopList">

    <!-- just arbitrary examples -->
    <JeepStop
        name='Vinzons Hall'
        address='M33F+P88, Diliman, Quezon City, Metro Manila'
        count='25'
        weather='Sunny, 32°C'
    />

    <JeepStop
        name='Vinzons Hall'
        address='M33F+P88, Diliman, Quezon City, Metro Manila'
        count='10'
        weather='Sunny, 32°C'
    />

    <JeepStop
        name='Vinzons Hall'
        address='M33F+P88, Diliman, Quezon City, Metro Manila'
        count='3'
        weather='Sunny, 32°C'
    />

    <JeepStop
        name='Vinzons Hall'
        address='M33F+P88, Diliman, Quezon City, Metro Manila'
        count='8'
        weather='Sunny, 32°C'
    />

    <JeepStop
        name='Vinzons Hall'
        address='M33F+P88, Diliman, Quezon City, Metro Manila'
        count='17'
        weather='Sunny, 32°C'
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
