"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const key = process.env.NEXT_PUBLIC_API_KEY;

const Page = () => {
  const [city, setcity] = useState("New Delhi");
  const [humidity, sethumidity] = useState('');
  const [wspeed, setwspeed] = useState('');
  const [img, setimg] = useState('https://img.icons8.com/ios/50/search--v1.png');
  const [temp, settemp] = useState(4);
  const [cityOutput, setcityOutput] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const getWeather = async () => {
    if (city === "") {
      alert("Empty City Try Again");
    } else {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=1&aqi=no&alerts=no`
        );
        sethumidity(response.data.current.humidity);
        setwspeed(response.data.current.wind_kph);
        setimg(response.data.current.condition.icon);
        settemp(response.data.current.temp_c);
        setcityOutput(city);
      } catch (error) {
        console.error("Unable to fetch weather data", error);
      }
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <>
      <form onSubmit={submitHandler} className="mx-[35%] my-[10%] bg-gradient-to-br from-[#2b2d42] to-[#4b4c74] rounded-2xl">
        <div className="flex pt-10 pl-[80px] pb-10 items-center">
          <input
            type="text"
            className="rounded-2xl text-black pl-3 pt-1 pb-1"
            placeholder="Enter City Name"
            value={city}
            onChange={(e) => setcity(e.target.value)}
          />
          <button
            type="button"
            className="flex border-2 rounded-[100%] h-6 w-6 bg-white ml-6 items-center justify-center"
            onClick={getWeather}
          >
            <img
              src="https://img.icons8.com/ios/50/search--v1.png"
              className="h-3 w-3"
            />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center mb-10">
          <img src={img} />
          <div>{temp}&deg;C</div>
          <div>{cityOutput}</div>
        </div>
        <div className="flex justify-between px-[55px] pb-10">
          <div className="flex items-center">
            <img src="https://img.icons8.com/?size=100&id=9454&format=png&color=FFFFFF" className="h-10 mr-2" />
            <div>
              <div>{humidity}%</div>
              <div>Humidity</div>
            </div>
          </div>
          <div className="flex items-center">
            <img src="https://img.icons8.com/?size=100&id=31842&format=png&color=FFFFFF" className="h-10 mr-2" />
            <div>
              <div>{wspeed} km/h</div>
              <div>Wind Speed</div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Page;
