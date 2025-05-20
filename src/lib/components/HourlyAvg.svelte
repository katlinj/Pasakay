<script>
	import BarChart from "./BarChart.svelte";
    import { fade, fly } from 'svelte/transition';

    let { close, name, address, count, weather, category, avg, labels, date} = $props();

    //const hours = ['5am','6am','7am','8am','9am','10am','11am','12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

    let formattedDate = $derived(date.toLocaleString([], {year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit'}));

    let current = $state(new Date());
    let updated = $derived((current.getTime() - date.getTime()) <= (60 * 60 * 1000)); //within last hour

</script>

<div class="hourlyAvg {category} updated-{updated}" in:fly={{ y: 100, duration: 300 }} out:fly={{ y: 100, duration: 300}}>

    <div class="popupHeader">

        <div class="headerText">

            <div class="name">
                {name}
            </div>

            <div class="address">
                <img src="location.svg" alt="Address"/>
                <div class="addresstext">{address}</div>
            </div>

        </div>

        <button onclick={close} class="close">
            <img src="close.svg" alt="Close" width=35em/>
        </button>

    </div>
    
    <hr class="divider {category} updated-{updated}">

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

        <div class="bottomtext">
            <div class="weather">
                {weather}
            </div>
            <div class="lastUpdate">
                as of {formattedDate}
            </div>
        </div>
    {:else}
        <div class="density">
            <div class="count unupdated">
                No. of People
            </div>
            <div class="categoryText">
                (<div class="category unavailable">unavailable</div>)
            </div>
        </div>
        <div class="bottomtext">
            Fetching Data...
        </div>
    {/if}

    <div class="title">
        Historical Average
    </div>

    <div class="graph">
        <BarChart
            labels={labels}
            data={avg}
        />  
    </div>

</div>

<button class="backdrop" onclick={close} aria-label="Close" in:fade={{duration: 300 }} out:fade={{duration:300}}></button>


<style>
    .hourlyAvg {
        position:fixed;
        background: #1A2337;
        z-index: 999;
        padding:1em;
        top: 50%;
        left: 50%;
        width:22em;
        border: solid 3px;
        border-radius: 11px;
        transform: translate(-50%, -50%);
    }
    .backdrop {
        position:fixed;
        top:0;
        border: 0px;
        width:100%;
        height:100%;
        background-color: #14141fbb;
        z-index:998;
    }
    .popupHeader {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .address {
        display: flex;
        align-items: center;
        gap:0.3em;
        font-size: 0.6em;
    }
    .name{
        font-size: 1.3em;
        font-weight: bold;
        margin-bottom:0.2em;
    }
    .close{
        background-color: #00000000;
        border:none;
        cursor:pointer;
    }
    .divider{
        border-top: 1px;
        margin:1em;
    }

    .density {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin:0.8em;
    }
    .category{
        align-items: center;
        display:inline;
    }
    .count {
        font-weight: bold;
        font-size:1.2em;
        text-align: center;
    }
    .count .number {
        text-decoration: underline;
        display:inline;
    }
    .bottomtext {
        font-size: 0.6em;
        text-align: center;
    }
    .lastUpdate {
        font-style: italic;
    }
    .title {
        font-weight: bold;
        text-align: center;
        margin-top: 1em;
        margin-bottom:0.5em;
    }
    .graph {
        background:#14141f;
        width:auto;
        border-radius: 15px;
        flex:1;
        padding:1em;
        min-height:300px;
        margin-top:1rem;
    }

    .High{
        border-color: #743030;
    }
    .Moderate{
        border-color: #a17627;
    }
    .Low{
        border-color: #216732;
    }
    .updated-false{
        border-color: #56566b;
    }

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