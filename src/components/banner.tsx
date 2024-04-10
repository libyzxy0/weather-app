import { Icon } from '@iconify/react';

type BannerProps = {
  city: string;
  feelsLike: number;
  temperature: number;
  maxTemp: number;
  minTemp: number;
  description: string;
}


export function Banner({ feelsLike, temperature, maxTemp, minTemp, description, city }: BannerProps) {
  
  const kelvinToCelsius = (temp: number) => Math.round(temp - 273.15) + "°C";
  
  return (
    <div className="md:w-[20rem] w-full flex justify-center items-center pt-5 md:ml-5">
        <div className="w-full rounded-lg mx-5 bg-gradient-to-r dark:from-sky-500 dark:to-blue-500 from-sky-400 to-blue-500 flex flex-col">
          <div className="flex flex-row justify-between">
            <div className="mx-4 mt-4 flex flex-col">
              <h1 className="text-xl font-bold text-white">{ city ? city : "No city"}</h1>
              <p></p>
            </div>
            <div className="mx-4 mt-4">
              <h1 className="text-4xl font-bold text-gray-200">{ kelvinToCelsius(temperature) }</h1>
            </div>
          </div>
          <div className="flex flex-row">
          <div className="w-full h-auto flex items-center pb-6 text-white flex-col">
            <div className="w-full flex flex-row justify-evenly items-center">
               <div className="flex flex-col items-center justify-center h-full px-5 text-center">
                <p className="text-white text-lg font-bold">{kelvinToCelsius(temperature)}<br/>Max</p>
               </div>
               <Icon className="h-40 w-40 animate-float" icon="fluent:weather-partly-cloudy-day-24-filled" />
               <div className="flex flex-col items-center justify-center h-full px-5 text-center">
                 <p className="text-white text-lg font-bold">{kelvinToCelsius(temperature)}<br/>Min</p>
               </div>
            </div>
            <h1 className="text-white text-xl font-medium capitalize">{description} <b className="text-white">|</b> Feels like {kelvinToCelsius(temperature)}</h1>
          </div>
          </div>
        </div>
      </div>
  )
}