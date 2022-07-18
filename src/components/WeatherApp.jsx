import React, { useState } from 'react'

function WeatherApp() {
    const api = {
        key: process.env.REACT_APP_API_KEY,
        base: "https://api.openweathermap.org/data/2.5/"
    }

    const [query, setQuery] = useState('')
    const [weather, setWeather] = useState({})

    const handleClick = async () => {
        const response = await fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`,)
        const json = await response.json()
        setWeather(json);
        setQuery('');
    }

    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

        let day = days[d.getDay()]
        let date = d.getDate()
        let month = months[d.getMonth()];
        let year = d.getFullYear()

        return `${day} ${date} ${month} ${year}`
    }

    return (
        // Weather Section
        <section className="flex-style flex-col">
            <h1 className='title text-center text-4xl text-[#fff] px-[15px] py-[10px] mb-3'>WEATHER APP</h1>
            {/* Container */}
            <div className={((typeof (weather.main) === "undefined")) ? ('weather-box flex-style p-5 flex-col mt-10 min-w-[30%] max-w-[90%]') : ('weather-box flex justify-around p-5 flex-col mt-10 min-w-[30%] max-w-[90%]')}>
                <div className='flex-style flex-col py-5 my-4'>
                    <input type="text" className='py-2 px-5 mx-2 mb-5 placeholder-black text-center rounded-2xl w-[80%] max-w-[90%] text-2xl' placeholder='Search for a place' onChange={(e) => { setQuery(e.target.value) }} value={query} />
                    <button className='py-2 px-10 bg-[crimson] rounded-md text-white md:text-2xl mt-3' onClick={handleClick}>Fetch</button>
                </div>
                {((typeof (weather.main) != "undefined")) ? (
                    <div className='flex justify-around items-center flex-col my-4'>
                        {/* location-box */}
                        <div className='text-center'>
                            {/* location */}
                            < h2 className='text-[#fff] text-5xl font-medium'>{weather.name}, {weather.sys.country}</h2>
                            {/* date */}
                            <h3 className='text-[#fff] text-3xl italic my-2'>{dateBuilder(new Date())}</h3>
                        </div>
                        {/* weather-box */}
                        <div className='w-full flex justify-around items-center my-4'>
                            {/* temp */}
                            <h2 className='temp rounded-2xl px-[15px] py-[25px] text-[#fff] font-bold text-center my-3 text-5xl'>{Math.round(weather.main.temp)}°C</h2>
                            {/* weather */}
                            <h3 className='rounded-2xl px-[15px] py-[25px] text-[#fff] font-bold text-center text-3xl'>{weather.weather[0].main}</h3>
                            {/* <h3 className='rounded-2xl px-[15px] py-[25px] text-[#fff] text-4xl font-bold text-center sm:text-2xl md:text-3xl'>{weather.wind.speed}</h3> */}
                        </div>
                    </div>
                ) : ("")}
            </div>
        </section >
    )
}

export default WeatherApp