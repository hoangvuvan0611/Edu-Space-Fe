import api from '../../api/axiosConfig';
import { useState, useEffect } from 'react';
import {saveAs} from "file-saver";
import './QRCode.css'
import PreviewQRCode from './PreviewQRCode.js/PreviewQRCode';

const QRCodes = () => {

    const [ qRCode, setQRCode ] = useState(null);
    const [ latitude, setLatitude ] = useState(null);
    const [ longitude, setLongitude ] = useState(null);
    const [ sttBoxQR, setSttBoxQR ] = useState(false);
  
    const getQRCode = async() => {
      try {
        const response = await api.post("/api/v1/qr/get", {latitude: latitude, longitude: longitude});
        setQRCode(response.data);
        setSttBoxQR(true)
      } catch (error) {
        console.log(error);
      }
    }
  
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
  
    const downloadQRCode = () => {
      if(qRCode == null)
        return;
      saveAs(qRCode,"_QRCode.png");
    }
  
    const controlBoxQR = (status) => {
      setSttBoxQR(status);
    };

    useEffect(() => {
      geolocation();
    }, [])

    return(
        <div className='qrcode'>
            <button onClick={getQRCode} >Get QR</button>
            {
              sttBoxQR &&
              <PreviewQRCode qRCode={qRCode}
              downloadQRCode={downloadQRCode}
              controlBoxQR = {controlBoxQR}
              />
            }
            <button onClick={downloadQRCode}>downloadQRCode</button>
        </div>
    )
}

export default QRCodes;