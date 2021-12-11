export interface RawWeatherData {
  generationtime_ms: number;
  latitude: number;
  daily_units: DailyUnits;
  hourly: Hourly;
  utc_offset_seconds: number;
  elevation: number;
  longitude: number;
  hourly_units: HourlyUnits;
  daily: Daily;
}

export interface Daily {
  apparent_temperature_min: number[];
  precipitation_sum: number[];
  windgusts_10m_max: number[];
  temperature_2m_max: number[];
  winddirection_10m_dominant: number[];
  precipitation_hours: number[];
  shortwave_radiation_sum: number[];
  apparent_temperature_max: number[];
  windspeed_10m_max: number[];
  temperature_2m_min: number[];
  time: string[];
  sunset: string[];
  sunrise: string[];
  weathercode: number[];
}

export interface DailyUnits {
  precipitation_sum: string;
  apparent_temperature_min: string;
  windgusts_10m_max: string;
  temperature_2m_max: string;
  winddirection_10m_dominant: string;
  precipitation_hours: string;
  shortwave_radiation_sum: string;
  apparent_temperature_max: string;
  windspeed_10m_max: string;
  temperature_2m_min: string;
  time: string;
  sunset: string;
  sunrise: string;
  weathercode: string;
}

export interface Hourly {
  temperature_2m: number[];
  pressure_msl: number[];
  soil_temperature_54cm: number[];
  windspeed_80m: number[];
  precipitation: number[];
  winddirection_120m: number[];
  apparent_temperature: number[];
  winddirection_10m: number[];
  soil_moisture_3_9cm: number[];
  freezinglevel_height: number[];
  winddirection_180m: number[];
  snow_height: number[];
  windspeed_120m: number[];
  soil_temperature_18cm: number[];
  direct_radiation: number[];
  windgusts_10m: number[];
  evapotranspiration: number[];
  soil_moisture_1_3cm: number[];
  cloudcover: number[];
  shortwave_radiation: number[];
  relativehumidity_2m: number[];
  weathercode: number[];
  vapor_pressure_deficit: number[];
  soil_temperature_6cm: number[];
  soil_moisture_9_27cm: number[];
  windspeed_10m: number[];
  dewpoint_2m: number[];
  winddirection_80m: number[];
  soil_temperature_0cm: number[];
  cloudcover_low: number[];
  cloudcover_mid: number[];
  soil_moisture_27_81cm: number[];
  time: string[];
  diffuse_radiation: number[];
  windspeed_180m: number[];
  cloudcover_high: number[];
  soil_moisture_0_1cm: number[];
}

export interface HourlyUnits {
  soil_moisture_0_1cm: string;
  pressure_msl: string;
  temperature_2m: string;
  windspeed_80m: string;
  precipitation: string;
  freezinglevel_height: string;
  apparent_temperature: string;
  winddirection_10m: string;
  winddirection_120m: string;
  soil_moisture_3_9cm: string;
  snow_height: string;
  winddirection_180m: string;
  windspeed_120m: string;
  soil_temperature_18cm: string;
  direct_radiation: string;
  windgusts_10m: string;
  soil_moisture_1_3cm: string;
  evapotranspiration: string;
  cloudcover: string;
  shortwave_radiation: string;
  vapor_pressure_deficit: string;
  weathercode: string;
  relativehumidity_2m: string;
  soil_temperature_6cm: string;
  soil_moisture_9_27cm: string;
  windspeed_10m: string;
  dewpoint_2m: string;
  winddirection_80m: string;
  soil_temperature_0cm: string;
  cloudcover_low: string;
  cloudcover_mid: string;
  soil_moisture_27_81cm: string;
  time: string;
  diffuse_radiation: string;
  windspeed_180m: string;
  cloudcover_high: string;
  soil_temperature_54cm: string;
}

export interface HourlyData {
  temperature_2m: number;
  pressure_msl: number;
  soil_temperature_54cm: number;
  windspeed_80m: number;
  precipitation: number;
  winddirection_120m: number;
  apparent_temperature: number;
  winddirection_10m: number;
  soil_moisture_3_9cm: number;
  freezinglevel_height: number;
  winddirection_180m: number;
  snow_height: number;
  windspeed_120m: number;
  soil_temperature_18cm: number;
  direct_radiation: number;
  windgusts_10m: number;
  evapotranspiration: number;
  soil_moisture_1_3cm: number;
  cloudcover: number;
  shortwave_radiation: number;
  relativehumidity_2m: number;
  weathercode: number;
  vapor_pressure_deficit: number;
  soil_temperature_6cm: number;
  soil_moisture_9_27cm: number;
  windspeed_10m: number;
  dewpoint_2m: number;
  winddirection_80m: number;
  soil_temperature_0cm: number;
  cloudcover_low: number;
  cloudcover_mid: number;
  soil_moisture_27_81cm: number;
  time: string;
  diffuse_radiation: number;
  windspeed_180m: number;
  cloudcover_high: number;
  soil_moisture_0_1cm: number;
}

export interface DailyData {
  apparent_temperature_min: number;
  precipitation_sum: number;
  windgusts_10m_max: number;
  temperature_2m_max: number;
  winddirection_10m_dominant: number;
  precipitation_hours: number;
  shortwave_radiation_sum: number;
  apparent_temperature_max: number;
  windspeed_10m_max: number;
  temperature_2m_min: number;
  time: string;
  sunset: string;
  sunrise: string;
  weathercode: number;
}

export type Tense = "now" | "past" | "future";

export interface WeatherHour {
  tense: Tense;

  date: Date;
  newWeatherCode: boolean;
  units: HourlyUnits;
  values: HourlyData;

  nextHour?: WeatherHour;
}

export interface WeatherDay {
  date: Date;
  tense: Tense;

  units: DailyUnits;
  values: DailyData;

  hours: WeatherHour[];

  nextDay?: WeatherDay;
}
export interface WeatherData {
  days: WeatherDay[];

  tempRange: ValueRange;
  apparentTempRange: ValueRange;
  maxPrecipitation: number;
}

export interface ValueRange {
  min: number;
  max: number;
}

export interface LooseObject {
  [key: string]: any;
}

export interface Options {
  useFeelLikeTemp: boolean;
  hidePast: boolean;
}
