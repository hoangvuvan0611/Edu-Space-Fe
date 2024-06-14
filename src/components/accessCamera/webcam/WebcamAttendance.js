import React, { useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import imageFaceTemplate from "../../../data/image/OIP.jpg";
import api from '../../../api/axiosConfig';
import * as faceapi from 'face-api.js';

// const WebcamComponent = () => <Webcam />

const WebcamAttendance = ({latitude, longitude}) => {

  const [ sizeWindow, setSizeWindow ] = useState(600);
  const [ faceRecognize, setFaceRecognize] = useState(null);
  const [ sttCamera, setSttCamera ] = useState(false);
  const [ distance, setDistance ] = useState(null);

  const webcamRef = React.useRef(null);

  const videoConstraints = {
    width: sizeWindow,
    height: sizeWindow,
    facingMode: 'user',
  };

  const ws = new WebSocket("ws://localhost:8080/data");

  ws.onopen = (event) => {
    console.log(event)
  };

  ws.onclose = (event) => {
    console.log(event)
  };
  
  const submitData = async() => {
    try {
      const response = await api.post("/api/v1/qr/distance", {latitude: latitude, longitude: longitude});
      console.log("response" + response.data);
      setDistance(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const startCamera = () =>{
    submitData();
    setSttCamera(true);
    capture();
  }

  const capture = (() => {
    const faceInterval = setInterval(() => {
      const pictureSrc = webcamRef.current.getScreenshot();
      
      if(pictureSrc == null)
        return;

      var decodeAsString = atob(pictureSrc.split(',')[1]);
      var charArray =[];
      for(var i=0; i<decodeAsString.length;i++){
        charArray.push(decodeAsString.charCodeAt(i));
      }

      let count = 0;
    
      while(count < 1){
        ws.send(new Blob([new Uint8Array(charArray)],{
          type:'image/jpeg'
        }));
        count ++;
      }
      ws.onmessage = async (message) => {
        const dataFace = await new Response(message.data).text();
        if(dataFace != null){
          setFaceRecognize(dataFace);
          clearInterval(faceInterval);
          ws.close();
        }
      }
    },0);

    submitData();
  });

  useEffect(() => {
    if(window.innerWidth > 768)
        setSizeWindow(400);
    else
        setSizeWindow(window.innerWidth);
  }, []);

  return (
    <div className=''>
      <p>{latitude} </p>
      <p>{longitude} </p>
      {distance}
        { !faceRecognize ? (
          <div className='box_cam_img'>
          { sttCamera ? (
              <div className='box_cam'>
                  <Webcam
                    audio={false}
                    height={sizeWindow}
                    width={sizeWindow}
                    ref={webcamRef}
                    mirrored={true}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                    screenshotQuality={1}
                  />
                  {/* <div className='container_circles'>
                      <div className='outer_circle'>
                          <div className='inner_circle'                     
                            onClick={(e) => {
                            e.preventDefault()
                            capture()
                            }}
                          >
                          </div>
                      </div>
                  </div> */}
                  <div className='box_focus_face' style={{height: sizeWindow*0.6, width: sizeWindow * 0.6}}>
                      <div id='box_focus_face_top_left'></div>
                      <div id='box_focus_face_top_right'></div>
                      <div id='box_focus_face_bottom_left'></div>
                      <div id='box_focus_face_bottom_right'></div>
                  </div>
              </div>
          ) : (
            <div className='box_show_info' style={{height: sizeWindow}}>
              <h4>Điểm danh sinh viên, xác thực khuôn mặt</h4>
              <img src={imageFaceTemplate}/>
              <p>Đặt khuôn mặt vào bên trong khung như hình</p>
              <div className='btn_control'>
                <button onClick={
                  (e) => {
                    e.preventDefault()
                    startCamera()}}
                  className="btn btn-outline-success"
                >Điểm danh</button>
              </div>
            </div>
          )}
          </div>
        ):(
          <div className='box_show_info' style={{height: sizeWindow}}>
            <h4>Thông tin sinh viên đã điểm danh</h4>
            <p>Tên: {faceRecognize}</p>
            <p>Mã sinh viên: {faceRecognize}</p>
            <p>Lớp: {faceRecognize}</p>
            <p>Khoảng cách: {distance}</p>
          </div>
        )

        }

        {/* <div className='btn_control'>
            <button onClick={() => reCapture()}
              className="btn btn-outline-warning"
            >Chụp lại</button>
            <button onClick={() => submitPicture()}
              className="btn btn-outline-success"
            >Điểm danh</button>
        </div> */}

    </div>
  )
}
export default WebcamAttendance;