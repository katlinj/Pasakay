export function getWeatherType(code: number): string {
	if (code === 0) return "Clear sky";
	if ([1, 2, 3].includes(code)) return "Partly cloudy";
	if ([45, 48].includes(code)) return "Foggy";
	if ([51, 53, 55].includes(code)) return "Drizzle";
	if ([56, 57].includes(code)) return "Freezing Drizzle";
	if ([61, 63, 65].includes(code)) return "Rainy";
	if ([66, 67].includes(code)) return "Freezing Rain";
	if ([71, 73, 75].includes(code)) return "Snow fall";
	if (code === 77) return "Snow grains";
	if ([80, 81, 82].includes(code)) return "Rain showers";
	if ([85, 86].includes(code)) return "Snow showers";
	if (code === 95) return "Thunderstorm";
	if ([96, 99].includes(code)) return "Thunderstorm with slight and heavy hail";
	return "Unknown weather type";
}