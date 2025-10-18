import React, { useState } from 'react'
import './Weather.css';
import { FaSearch } from "react-icons/fa"; 
import axios from 'axios'

const Weather = () => {

  const [ data, setData ] = useState({})
  const [ location, setLocation ] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=YOUR_API_KEY_HERE`

  const searchLocation = (event) => {
     if(event.key === 'Enter') {
       axios.get(url).then((response) => {
         setData(response.data)
       })
       setLocation('')
     }
  }

  return (
    <div className='app'>

        <div className="title">
            <h2>Live Weather at a Glance</h2>
            <p>From sun to storm, track live conditions the moment they change.</p>
        </div>
      
        <div className="search-box">
           <input type="text" value={location} placeholder='Enter Location' onKeyDown={searchLocation} onChange={event => setLocation(event.target.value)}/>
           <FaSearch className="search-icon" size={20}/>
        </div>

        <div className="container">
            
           <div className="top">
               
              <div className="location">
                <p>{data.name}</p>
              </div>

              <div className="temp">
                 {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
              </div>

              {data.weather && data.weather.length > 0 && (
               <div className="description">
                  <img 
                     src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} 
                     alt={data.weather[0].main} 
                     className="weather-icon"
                  />
                  <p>{data.weather[0].main}</p>
               </div>
              )}

           </div>

           {data.name !== undefined && 
             <div className="bottom">
                
                <div className="feels">
                   {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
                   <p>Feels Like</p>
                </div>

                <div className="humidity">
                   {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
                   <p>Humidity</p>
                </div>

                <div className="wind-sp">
                    {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
                    <p>Wind Speed</p>
                </div>

             </div>
           }

        </div>

    </div>
  )
}

export default Weather
