import { ModeToggle } from '@/components/mode-toggle';
import { SearchCity } from '@/components/search-city'
import { Banner } from '@/components/banner'
import { InfoCard } from '@/components/info-card'
import { useState } from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

interface WeatherData {
  main: {
    feels_like: number;
    temp: number;
    temp_max: number;
    temp_min: number;
    humidity: number;
  };
  name: string;
  weather: {
    description: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
  };
  visibility: number;
}

export default function Main() {
  const [city, setCity] = useState("Manila");
  
  const { data, refetch } = useQuery<WeatherData>({
    queryKey: ['weather'],
    queryFn: async () => {
      const response = await axios.get<WeatherData>(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${"57a49a207949984dc00306efe9038f8f"}`);
      return response.data;
    }
  });

  const kelvinToCelsius = (temp: number): string => `${Math.round(temp - 273.15)}°C`;

  const estimateRainProbability = (cloudiness: number, humidity: number, windSpeed: number): number => {
    if (cloudiness === undefined || humidity === undefined || windSpeed === undefined) {
      return 0; // Or handle it according to your use case
    }
    return Math.min((cloudiness >= 50 ? 30 : 0) + (humidity >= 70 ? 20 : 0) + (windSpeed * 3.6 >= 30 ? 10 : 0), 100);
  };

  return (
    <div className="font-nunito">
      <nav className="w-full bg-white h-14 dark:bg-gray-950 border-b border-gray-100 dark:border-gray-900 flex items-center flex-row justify-between">
        <div className="flex flex-row items-center mx-4">
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-400 dark:from-sky-200 dark:to-blue-400 text-2xl font-bold">Weather</h1>
        </div>
        <div className="flex flex-row">
          <SearchCity q={city} onSearch={(searchValue) => setCity(searchValue)} refetch={refetch} />
        </div>
        <div className="flex flex-row mx-4">
          <ModeToggle />
        </div>
      </nav>
      <div className="flex flex-col md:flex-row">
        {!data ? (
          <div>Loading...</div>
        ) : (
          <>
            <Banner
              feelsLike={data.main.feels_like}
              city={data.name}
              temperature={data.main.temp}
              maxTemp={data.main.temp_max}
              minTemp={data.main.temp_min}
              description={data.weather[0].description}
            />
            <div className="w-full flex justify-center items-center mt-5">
              <div className="w-full mx-5 md:mx-6 rounded-md dark:bg-gray-900 bg-white shadow-md">
                <InfoCard name="Temperature" n={kelvinToCelsius(data.main.temp)} ic="uil:temperature-three-quarter" />
                <InfoCard name="Rain probability" n={`${estimateRainProbability(data.clouds.all, data.main.humidity, data.wind.speed)}%`} ic="material-symbols-light:weather-mix-outline-rounded" />
                <InfoCard name="Wind speed" n={(data.wind.speed * 3.6)?.toFixed(2) + "km/h"} ic="fluent:weather-squalls-24-regular" />
                <InfoCard name="Air Humidity" n={`${data.main.humidity}%`} ic="lets-icons:humidity-light" />
                <InfoCard name="Visibility" n={`${data.visibility}m`} ic="ic:outline-visibility" />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
