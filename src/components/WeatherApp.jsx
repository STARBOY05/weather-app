import React, { useState } from 'react'

function WeatherApp() {
    const api = {
        key: process.env.REACT_APP_API_KEY,
        base: "https://api.openweathermap.org/data/2.5/"
    }

    const [query, setQuery] = useState('')
    const [weather, setWeather] = useState({})

    // const search = async () => {
    //     await fetch(`${api.base}weather?q=${query}&appid=${api.key}`)
    //         .then(response => response.json())
    //         .then(result => {
    //             setWeather({ result });
    //             setQuery('');
    //             console.log(result)
    //         })
    // }
    // const containerBig = () => {
    //     return ("transition-transform duration-300 ease-in h-50vh")
    // }

    const handleClick = async () => {
        const response = await fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`,)
        const json = await response.json()
        setWeather(json);
        setQuery('');
        // containerBig();
        // console.log(json)
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


    // Change background according to weather
    // const weatherChange = (e) => {
    //     if (typeof e.main != 'undefined') {
    //         console.log(e.main.temp);
    //         if (e.main.temp > 15) {
    //             return "flex-style flex-col warm";
    //         }
    //         else {
    //             return "flex-style flex-col"
    //         }
    //     }
    //     else {
    //         return "flex-style flex-col";
    //     }
    // }

    return (
        // Weather Section
        <section className="flex-style flex-col">
            <h1 className='title text-center text-4xl text-[#fff] px-[15px] py-[10px] mb-3'>WEATHER APP</h1>
            {/* Container */}
            <div className={((typeof (weather.main) === "undefined")) ? ('weather-box lg:min-w-[30%] flex-style p-5 flex-col md:min-w-[60%] mt-10') : ('weather-box lg:min-w-[30%] flex justify-around p-5 flex-col md:min-w-[60%] mt-10')}>
                <div className='flex-style flex-col py-5'>
                    <input type="text" className='py-2 px-5 mx-2 mb-5 placeholder-black text-center rounded-2xl lg:min-w-[50%] md:w-[80%] text-2xl' placeholder='Search for a place' onChange={(e) => { setQuery(e.target.value) }} value={query} />
                    <button className='py-2 px-10 bg-[crimson] rounded-md text-white md:text-2xl' onClick={handleClick}>Fetch</button>
                </div>
                {((typeof (weather.main) != "undefined")) ? (
                    <div className='flex justify-around items-center flex-col'>
                        {/* location-box */}
                        <div className='my-8 text-center'>
                            {/* location */}
                            < h2 className='text-[#fff] text-5xl font-medium my-2'>{weather.name}, {weather.sys.country}</h2>
                            {/* date */}
                            <h3 className='text-[#fff] text-3xl italic my-2'>{dateBuilder(new Date())}</h3>
                        </div>
                        {/* weather-box */}
                        <div className='w-full flex justify-around items-center'>
                            {/* temp */}
                            <h2 className='temp rounded-2xl px-[15px] py-[25px] text-[#fff] text-7xl font-bold text-center my-3 sm:text-4xl md:text-6xl'>{Math.round(weather.main.temp)}°C</h2>
                            {/* weather */}
                            <h3 className='rounded-2xl px-[15px] py-[25px] text-[#fff] text-4xl font-bold text-center sm:text-2xl md:text-3xl'>{weather.weather[0].main}</h3>
                            {/* <h3 className='rounded-2xl px-[15px] py-[25px] text-[#fff] text-4xl font-bold text-center sm:text-2xl md:text-3xl'>{weather.wind.speed}</h3> */}
                        </div>
                    </div>
                ) : ("")}
            </div>
        </section >
    )
}

export default WeatherApp