import './PreviewQRCode.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faDownload } from "@fortawesome/free-solid-svg-icons";



const PreviewQRCode = ({qRCode, downloadQRCode, controlBoxQR}) => {

    return(
        <div className='qrcode_show'>
            <div className='img_qr_code'>
                <FontAwesomeIcon className='icon_qr_exit' onClick={() => controlBoxQR(false)} title='Thoát' icon={faXmark}></FontAwesomeIcon>
                <img id='qrCodeImage' src={qRCode}/>
                <div className='box_information_qr_show'>
                    <div className='information_qr_show'><span>Giảng viên: </span> Nguyễn Văn A</div>
                    <div className='information_qr_show'><span>Mã giảng viên: </span> 0012312</div>
                    <div className='information_qr_show'><span>Môn học: </span>Lập trình Java</div>
                    <div className='information_qr_show'><span>Thời gian tạo:</span> 06/11/2003</div>    
                </div>
                <FontAwesomeIcon className='icon_qr_download' onClick={downloadQRCode} title='Tải xuống' icon={faDownload}></FontAwesomeIcon>
            </div>
        </div>
    )
}

export default PreviewQRCode;