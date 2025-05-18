<script>
	// import { _ } from '$env/static/private';
    import HourlyAvg from '$lib/components/HourlyAvg.svelte';

	let { name, address, count, weather, avg, lastUpdate } = $props();
    let showPopup = $state(false);

    //parsing date
    let [datePart, timePart] = $derived(lastUpdate.split('_'));
    let [year, month, day] = $derived(datePart.split('-').map(Number));
    let [hour, minute, second] = $derived(timePart.split('-').map(Number));
    let date = $derived(new Date(year, month-1, day, hour, minute, second));
    let formattedDate = $derived(date.toLocaleString([], {year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit'}));

    let current = $state(new Date());

    let updated = $derived((current - date) >= 0 && (current - date) <= (7 * 24 * 60 * 60 * 1000)); //within last week

    // function isUpdated() {
    //     return ((current - date) >= 0 && (current - date) <= (7 * 24 * 60 * 60 * 1000));
    // }

    function openPopup() {
        showPopup = true;
    }

    const category = $derived.by(() => {
        const c = parseInt(count, 10);
        if (c > 15) return 'High';
        else if (c > 5) return 'Moderate';
        else return 'Low';
    });
    
</script>

<button onclick={openPopup} disabled='{!updated}'>
    <div class="jeepStop {category} updated-{updated}">

        <div class="identifier">

            <img src="{name}.png" alt="{name}" width="100%" class="stopImg">
            <div class="name"> {name} </div>

        </div>

        <div class="details">

            <div class="address">
                <img src="location.svg" alt="Address"/>
                <div class="addresstext">{address}</div>
            </div>
            
            {#if updated}
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
                <div class="lastUpdate">
                    as of {formattedDate}
                </div>
            {:else}
                <div>
                    unupdated
                </div>
            {/if}

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
        avg={avg}
        date={date}
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

    .weather, .lastUpdate {
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