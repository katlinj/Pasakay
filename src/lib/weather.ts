import { fetchWeatherApi } from 'openmeteo';

export const params = {
	"latitude": 14.6543,
	"longitude": 121.0733,
	"hourly": ["temperature_2m", "weather_code"],
	"models": "best_match",
	"current": ["temperature_2m", "weather_code"],
	"forecast_days": 1
};

export const url = "https://api.open-meteo.com/v1/forecast";

export async function fetchWeatherData(params, url) {
    const responses = await fetchWeatherApi(url, params);

    const response = responses[0];

    const utcOffsetSeconds = response.utcOffsetSeconds();

    const current = response.current()!;
    const hourly = response.hourly()!;

    let weatherData = {};
    
    return weatherData = {
        current: {
            time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
            temperature2m: current.variables(0)!.value(),
            weatherCode: current.variables(1)!.value(),
        },
        hourly: {
            time: [...Array((Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval())].map(
                (_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
            ),
            temperature2m: hourly.variables(0)!.valuesArray()!,
            weatherCode: hourly.variables(1)!.valuesArray()!,
        },
    };
}