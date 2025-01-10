import React, { useEffect, useState, useRef } from 'react'
import "./Weather.css"

const Weather = () => {

    const inputRef = useRef()

    const [weatherData, setWeatherData] = useState(false)

    const allIcons = {
        "01d": "/src/assets/clear.png",
        "01n": "/src/assets/clear.png",
        "02d": "/src/assets/cloud.png",
        "02n": "/src/assets/cloud.png",
        "03d": "/src/assets/cloud.png",
        "03n": "/src/assets/cloud.png",
        "04d": "/src/assets/drizzle.png",
        "04n": "/src/assets/drizzle.png",
        "09d": "/src/assets/rain.png",
        "09n": "/src/assets/rain.png",
        "10d": "/src/assets/rain.png",
        "10n": "/src/assets/rain.png",
        "13d": "/src/assets/snow.png",
        "13n": "/src/assets/snow.png",
    }

    const searchFunc = async (city) => {
        if (city == "") {
            alert("Pleace inter city name!")
            return
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
            const response = await fetch(url)
            const data = await response.json()

            if (!response.ok) {
                alert(data.message);
                return;
            }

            // console.log(data);
            const icon = allIcons[data.weather[0].icon] || "/src/assets/clear.png"
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })
        } catch (error) { 
            setWeatherData(false)
            console.log("Error in fetching weather data");
        }
    }

    useEffect(()=> {
        searchFunc("Dushanbe")
    }, [])

  return (<>
    <div className='weather place-self-center p-[40px] rounded-[10px] flex flex-col items-center'>
        <div className="search-bar flex items-center gap-[12px]">
            <input ref={inputRef} type="text" placeholder='Search' className='h-[50px] border-none outline-none rounded-[40px] 
                pl-[25px] text-[#626262] bg-[#ebfffc] text-[18px]' />
            <img src="/src/assets/search.png" alt="" className='w-[50px] p-[15px] rounded-[50%] bg-[#ebfffc]
                cursor-pointer' onClick={()=> searchFunc(inputRef.current.value)} />
        </div>

        {weatherData?<>
            <img src={weatherData.icon} alt="weather-icon" className='w-[150px] m-[30px]' />
            <p className='text-[#fff] text-[80px] leading-[1.1]'>{weatherData.temperature}°c</p>
            <p className='text-[#fff] text-[40px]'>{weatherData.location}</p>
            <div className='w-[100%] mt-[40px] text-[#fff] flex justify-between'>
                <div className='flex items-start gap-[12px] text-[22px]'>
                    <img src="/src/assets/humidity.png" alt="" className='w-[26px] mt-[10px]' />
                    <div>
                        <p>{weatherData.humidity} %</p>
                        <span className='block text-[16px]'>Влажность</span>
                    </div>
                </div>
                <div className='flex items-start gap-[12px] text-[22px]'>
                    <img src="/src/assets/wind.png" alt="" className='w-[26px] mt-[10px]' />
                    <div>
                        <p>{weatherData.windSpeed} Km/h soat</p>
                        <span className='block text-[16px]'>Скорость ветра</span>
                    </div>
                </div>
            </div>
        </>:<></>}

    </div>
  </>)
}

export default Weather