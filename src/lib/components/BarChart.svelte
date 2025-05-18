<script>
    import {onMount} from 'svelte';
    import {Chart, BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip} from  'chart.js';

    Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip);

    let {labels, data} = $props();

    let barColors = $derived(data.map(value => {
        if (value > 15 ) return '#da5a5a';
        if (value > 5 ) return '#dd9624';
        return '#36af36'
    }));

    let canvas;
    let chart;

    onMount(() => {
        console.log("canvas is", canvas);
        chart = new Chart(canvas, {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    label: 'No. of People',
                    data,
                    backgroundColor: barColors,
                    borderRadius: 3,
                    hoverBackgroundColor: barColors
                }]
            },
            options: {
                responsive:true,
                maintainAspectRatio:false,
                plugins: {
                    tooltip: {
                        backgroundColor: '#1A2337',
                        titleColor: '#B2C6CF',
                        bodyColor: '#B2C6CF'
                    },
                },
                animation: {
                    duration:300,
                    easing: 'easeOutQuart'
                },
                scales: {
                    y:{
                        beginAtZero:true,
                        ticks: {
                            stepSize:5,
                            color: '#B2C6CF',
                            callback: (value)=> value == 0 ? '' : value
                        },
                        grid: {
                            color: '#1A2337'
                        },
                        border: {
                            display:false
                        }
                    },
                    x:{
                        ticks: {
                            maxRotation:0,
                            minRotation:0,
                            color: '#B2C6CF',
                            callback: (value, index) => index == 0 || index == 7 || index == 15 ? labels[index] : '',
                            autoSkip:false
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });

        return()=>chart.destroy();
    });

    $effect(() => {
        if (chart) {
            chart.data.labels = labels;
            chart.data.datasets[0].data = data;
            chart.data.datasets[0].backgroundColor = barColors;
            chart.data.datasets[0].hoverBackgroundColor = barColors;
            chart.update();
        }
    });

</script>

<div class="chartContainer">
    <canvas bind:this={canvas}></canvas>
</div>

<style>
    .chartContainer {
        width: 100%;
        height: 100%;
        min-height: 300px;
    }

    canvas {
        width: 100% !important;
        height: 100% !important;
    }
</style>

