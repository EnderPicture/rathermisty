import type {
	RawWeatherData,
	WeatherData,
	WeatherHour,
	WeatherDay,
	ValueRange,
	Hourly,
	HourlyUnits,
	HourlyData,
	LooseObject,
	Tense,
	DailyUnits,
	DailyData
} from '$lib/types/weather';

export const crunchWeatherData = (rawWeatherData: RawWeatherData): WeatherData => {
	let days: WeatherDay[] = [];
	let dayIndex = -1;

	let tempRange: ValueRange = {
		min: Number.MAX_VALUE,
		max: Number.MIN_VALUE
	};
	let apparentTempRange: ValueRange = {
		min: Number.MAX_VALUE,
		max: Number.MIN_VALUE
	};
	let maxPrecipitation = 0;

	let lastHour: WeatherHour | null = null;
	let lastDay: WeatherDay | null = null;

	let now = new Date();

	// loop though every hour
	for (let i = 0; i < rawWeatherData.hourly.time.length; i++) {
		const hour: WeatherHour = {
			date: new Date(rawWeatherData.hourly.time[i]),
			tense: 'past',
			newWeatherCode: false,
			units: rollup(-1, rawWeatherData.hourly_units) as HourlyUnits,
			values: rollup(i, rawWeatherData.hourly) as HourlyData
		};
		if (lastHour) {
			lastHour.nextHour = hour;
		}
		hour.tense = computeTense(hour.date, 1);
		hour.newWeatherCode = lastHour?.values.weathercode != hour.values.weathercode;
		if (maxPrecipitation < hour.values.precipitation) {
			maxPrecipitation = hour.values.precipitation;
		}

		// new day
		if (lastHour?.date.getDate() !== hour.date.getDate()) {
			dayIndex++;
			const day: WeatherDay = {
				date: new Date(hour.date.toDateString()),
				tense: 'now',
				units: rollup(-1, rawWeatherData.daily_units) as DailyUnits,
				values: rollup(dayIndex, rawWeatherData.daily) as DailyData,
				hours: []
			};
			day.tense = computeTense(day.date, 24);

			// calculate minMax
			if (tempRange.min > day.values.temperature_2m_min)
				tempRange.min = day.values.temperature_2m_min;
			if (tempRange.max < day.values.temperature_2m_max)
				tempRange.max = day.values.temperature_2m_max;
			if (apparentTempRange.min > day.values.apparent_temperature_min)
				apparentTempRange.min = day.values.apparent_temperature_min;
			if (apparentTempRange.max < day.values.apparent_temperature_max)
				apparentTempRange.max = day.values.apparent_temperature_max;

			if (lastDay) {
				lastDay.nextDay = day;
			}
			days.push(day);
			lastDay = day;
		}
		lastDay?.hours.push(hour);
		lastHour = hour;
	}

	return {
		days: days,

		tempRange: tempRange,
		apparentTempRange: apparentTempRange,
		maxPrecipitation: maxPrecipitation
	};
};

const computeTense = (date: Date, precision: 1 | 24): Tense => {
	let tense: Tense = 'past';

	let now = new Date();

	let future = new Date(date.getTime());
	future.setHours(future.getHours() + precision);

	if (+date < +now && +now < +future) {
		tense = 'now';
	} else if (+now < +date) {
		tense = 'future';
	}

	return tense;
};

const rollup = (index: number, object: LooseObject): LooseObject => {
	const keys = Object.keys(object);
	const output: LooseObject = {};
	keys.forEach((key) => {
		if (index === -1) {
			output[key] = object[key];
		} else {
			output[key] = object[key][index];
		}
	});
	return output;
};
