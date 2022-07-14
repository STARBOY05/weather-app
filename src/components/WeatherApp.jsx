import React, { useState } from 'react'

function WeatherApp() {
    const api = {
        key: "9c5c683211843126682f3b1ec11d60ae",
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

    const handleClick = async () => {
        const response = await fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`,)
        const json = await response.json()
        setWeather(json);
        setQuery('');
        console.log(json)
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
        <section className='flex justify-center items-center'>
            {/* Container */}
            <div className={((typeof (weather.main) === "undefined")) ? ('weather-box max-w-[75%] min-h-[75vh] flex justify-start items-center p-5 flex-col') : ('weather-box max-w-[75%] min-h-[75vh] flex justify-around items-center p-5 flex-col')}>
                {/* {((typeof (weather.main) != "undefined")) ? } */}
                <div className='w-full flex justify-center items-start'>
                    <input type="text" className='py-2 px-5 min-w-[30%] mx-2' placeholder='Search for a place' onChange={(e) => { setQuery(e.target.value) }} value={query} />
                    <button className='py-2 px-10 bg-[crimson] min-w-[30%] rounded-md' onClick={handleClick}>Fetch</button>
                </div>
                {((typeof (weather.main) != "undefined")) ? (
                    <div className='flex justify-around items-center flex-col py-5 text-center'>
                        {/* location-box */}
                        <div>
                            {/* location */}
                            < h2 className='text-[#fff] text-5xl font-medium my-2'>{weather.name}, {weather.sys.country}</h2>
                            {/* date */}
                            <h3 className='text-[#fff] text-3xl italic my-2'>{dateBuilder(new Date())}</h3>
                        </div>
                        {/* weather-box */}
                        <div className='w-full flex justify-around items-center'>
                            {/* temp */}
                            <h2 className='temp rounded-2xl px-[15px] py-[25px] text-[#fff] text-7xl font-bold text-center my-3'>{Math.round(weather.main.temp)}°C</h2>
                            {/* weather */}
                            <h3 className='rounded-2xl px-[15px] py-[25px] text-[#fff] text-3xl font-bold text-center'>Sunny</h3>
                        </div>
                    </div>
                ) : ("")}
            </div >
        </section >
    )
}

export default WeatherApp