<script>
    import HourlyAvg from '$lib/components/HourlyAvg.svelte';

	let { name, address, count, weather } = $props();
    let category = $state('Low');
    let showPopup = $state(false);

    function openPopup() {
        showPopup = true;
    }

    if (parseInt(count, 10) > 15) {
        category = 'High';
    }
    else if (parseInt(count, 10) > 5) {
        category = 'Moderate';
    }
    else {
        category = 'Low';
    }
</script>

<button onclick={openPopup}>
    <div class="jeepStop {category}">

        <div class="identifier">

            <img src="{name}.png" alt="{name}" width="100%" class="stopImg">
            <div class="name"> {name} </div>

        </div>

        <div class="details">

            <div class="address">
                <img src="location.svg" alt="Address"/>
                <div class="addresstext">{address}</div>
            </div>

            <div class="density">
                <div class="count">
                    <div class="number"> {count} </div>
                    {#if parseInt(count, 10) == 1}
                        Person
                    {:else}
                        People
                    {/if}
                </div>

                <div class="categoryText">
                    (<div class="category {category}">{category}</div>)
                </div>
            </div>

            <div class="weather">
                {weather}
            </div>

        </div>

    </div>
</button>

<!-- Hourly Average Popup -->
 {#if showPopup}
    <HourlyAvg 
        close={() => showPopup = false}
        name={name}
        address={address}
        count={count}
        weather={weather}
        category={category}
    />
 {/if}

<style>
    .jeepStop {
        background-color: #1A2337;
        color: #B2C6CF;
        display:flex;
        border: solid 3px;
        border-radius: 11px;
        width:20em;
        gap:1em;
        padding:1em;
        cursor: pointer;
    }

    button {
        all:unset;
        cursor:pointer;
    }

    /* left side, image + name */
    .identifier {
        width:40%;
        display: flex;
        flex-direction: column;
        gap:0.2em;
        align-items: center;
    }

    img.stopImg {
        border: solid #14141F 8px;
        border-radius: 5px;
    }

    /* right side, address + count + weather */
    .details {
        display:flex;
        flex-direction: column;
        justify-content: right;
        width:60%;
        align-items: center;
        justify-content:space-between;
        
    }

    .address {
        display: flex;
        gap:0.3em;
        font-size: 0.6em;
    }

    .density {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .category{
        align-items: center;
        display:inline;
    }

    .count {
        font-weight: bold;
        font-size:1.2em;
    }

    .count .number {
        text-decoration: underline;
        display:inline;
    }

    .weather {
        font-size: 0.6em;
    }

    /* conditional border colors */
    .jeepStop.High{
        border-color: #743030;
    }
    .jeepStop.Moderate{
        border-color: #a17627;
    }
    .jeepStop.Low{
        border-color: #216732;
    }

    /* conditional category colors */
    .category.High{
        color: #DA5A5A;
    }
    .category.Moderate{
        color: #DD9624;
    }
    .category.Low{
        color: #36AF36;
    }
</style>