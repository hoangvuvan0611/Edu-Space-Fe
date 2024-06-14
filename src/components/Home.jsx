import Calendar from "./calendar/Calendar";
import Sitebar from "./sitebar/Sitebar";
import HeaderBar from "./headerbar/HeaderBar";

import './Home.css'
import dayTime from "../data/image/backgroundhome/4k-blue-minimalist-deer-5fc2dalaakntatt7.jpg";
import morning from "../data/image/backgroundhome/4k-minimalist-mountains-9oitratl6gd996za.jpg";
import eveningMountain from "../data/image/backgroundhome/evening-mountains-wallpaper-2048x1152_49.jpg";
import afternoon from "../data/image/backgroundhome/wallpapersden.com_blue-mountains-landscape_3840x2160.jpg";
import risingSunAtMountain from "../data/image/backgroundhome/wallpapersden.com_rising-sun-at-mountains-4k-background_3840x2160.jpg";
import finalNight from "../data/image/backgroundhome/wallpapersden.com_the-final-night-hd-illustrator_3840x2160.jpg";
import vaporwareForest from "../data/image/backgroundhome/wallpapersden.com_vaporwave-minimalism-forest_3840x2160.jpg";

import { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';

function Home(){

    const [styleBackground, setStyleBackground] = useState(() => {
        let date = new Date();
        if(date.getHours() < 5 || date.getHours() > 19)
            return finalNight;
        else if(date.getHours() >= 5 && date.getHours() <= 6)
            return morning;
        else if(date.getHours() >= 17)
            return afternoon;
        else
            return dayTime;
    });
    
    const setBackgroundImage = () => {
        let date = new Date();
        if(date.getHours() < 5 || date.getHours() > 19)
            setStyleBackground(finalNight);
        else if(date.getHours() >= 5 && date.getHours() <= 6)
            setStyleBackground(morning);
        else if(date.getHours() >= 17)
            setStyleBackground(afternoon);
        else
            setStyleBackground(dayTime);
    };
    
    useEffect(() => {
        setBackgroundImage();
        setInterval(() => {
            setBackgroundImage();
        }, 1800000);
    }, []);

    return(
        <div className="home d-flex container-fluid" style={{backgroundImage: `url(${styleBackground})`}}>
            <div className="home-left">
                <Sitebar/>
            </div>
            <div className="home-right">
                <HeaderBar/>
                <Routes>    
                    <Route path='/schedule' element={<Calendar/>}/>  
                </Routes>
            </div>
        </div>
    )
}
export default Home;