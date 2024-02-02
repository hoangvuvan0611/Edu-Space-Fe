import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import 'react-html5-camera-photo/build/css/index.css';

import api from '../../api/axiosConfig'
import './AttendanceCam.css'
import WebcamAttendance from './webcam/WebcamAttendance';


const AttendanceCam = () => {

    const [ dataUri, setDataUri] = useState('');
    const [ latitude, setLatitude ] = useState(null);
    const [ longitude, setLongitude ] = useState(null);

    let params = useParams();
    const [ id, setId] = useState(params.id);
    const [ token, setToken ] = useState(params.token);
    const [ dataLesson, setDataLesson ] = useState();

    const geolocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setLatitude(position.coords.latitude);
              setLongitude(position.coords.longitude);
            },
            (error) => {
              console.error(error);
            }
          );
        } else {
          console.error('Geolocation is not supported by this browser.');
        }
    }

    const submitData = async() => {
      try {
        const response = await api.post("/api/v1/qr/distance", {latitude: latitude, longitude: longitude});
      } catch (error) {
        console.log(error);
      }
    }
    
    const getData = async () => {
        try {
            let response = await api.post("/api/v1/lesson/data_attendance", {id: id, token: token, img: ""})
            setDataLesson(response.data)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
      geolocation();
      getData();
    }, [])

    return(
        <div className='attendance_cam'>
            <WebcamAttendance longitude={longitude} latitude={latitude}/>
            <div className='show_data_qr container'>
                <div className='data_left'>
                    <div>Mã môn học: {dataLesson?.subjectCode}</div>
                    <div>Tên môn học: {dataLesson?.subjectName}</div>
                    <div>Mã nhóm: {dataLesson?.groupCode}</div>
                    <div>Học kỳ: {dataLesson?.semester}</div>
                    <div>Ngày: {dataLesson?.semester}</div>
                    <div>Khoảng cách: {dataLesson?.distance}</div>
                </div>
                <div className='data_right'>Hoàng</div>
            </div>
        </div>
    )
}
export default AttendanceCam;