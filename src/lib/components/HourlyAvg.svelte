<script>
    let { close, name, address, count, weather, category} = $props();
</script>

<div class="hourlyAvg {category}">

    <div class="popupHeader">

        <div class="title">

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
    
    <hr class="divider {category}">

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

    <div class="graphTitle">
        Hourly Average
    </div>

    <div class="graph"></div>

</div>

<button class="backdrop" onclick={close} aria-label="Close"></button>


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
        text-align: center;
    }
    .graphTitle {
        font-weight: bold;
        text-align: center;
        margin-top: 1em;
        margin-bottom:0.5em;
    }
    .graph {
        background:#14141f;
        width:auto;
        height:10em;
        border-radius: 15px;
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