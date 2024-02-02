import React, {useEffect, useRef, useState} from "react";
import "./CameraRealTime.css"

const CameraRealTime = ({}) => {


    const img = document.querySelector('img');
    
    const url = "ws:localhost:8080/data";
	const video = document.querySelector('video');
    const canvas = document.querySelector('canvas');

    const socket = new WebSocket(url);

    socket.onopen = (event) => {
        // console.log(event)
    }
    
    socket.onclose = (event) => {
        console.log(event)
    }

    var constraints={
        video:true,
        audio:false,
        width: 300,
        height: 250
    };

    navigator.mediaDevices.getUserMedia(constraints).then(function(stream){
        video.srcObject=stream;
		video.play();
    }).catch(function(err){
        console.log(err)
    });


    useEffect(() => {

        if(video){
            const context = canvas.getContext("2d");
            setInterval(() => {
                context.drawImage(video,0,0,canvas.width, canvas.height);
                var canvasData = canvas.toDataURL('image/jpeg',1);
                var decodeAstring = atob(canvasData.split(',')[1]);
                
                var charArray =[];
                
                for(var i=0; i<decodeAstring.length;i++){
                    
                    charArray.push(decodeAstring.charCodeAt(i));
                }
                
               socket.send( new Blob([new Uint8Array(charArray)],{
                   type:'image/jpeg'
               }));		
            
                socket.addEventListener('message',function(event){
                    img.src=window.URL.createObjectURL(event.data);
                });

            } ,50);


        }


    }, [])

    return(
        <div>
            <div>
                <h1>Video from webcam</h1>
                <video autoPlay={true} ></video>
            </div>
            <div>
                <h1>Video in canvas</h1>
                <canvas height={200}  id="myCanvas"></canvas>
            </div>
            <div>
                <h1>Video from server</h1>
                <img alt={"video server"}/>
            </div>
        </div>
    )
}

export default CameraRealTime;