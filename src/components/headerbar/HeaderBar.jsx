import './HeaderBar.css';
import {useState, useEffect} from "react";
import { FaBell } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { Link } from 'react-router-dom';

function HeaderBar(){
    const [date, setDate] = useState(new Date());



    useEffect(() => {
        setInterval(() => {
            // set a new instance of date every second
            setDate(new Date()); 
        }, 1000);
        // TODO: still need to cleanup the side effect
    }, []);
    return(
        <div className="headerBar justify-content-between d-flex">
            <div className='headerBar_search'>
                <form>
                    <input placeholder='Tìm tài liệu, sinh viên...' type='search' id='headerBar_search'/>
                </form>
            </div>
            <div className='headerBar_clock'>
                <span id='headerBar_clock'>{date.toLocaleTimeString()}</span>
                <span id="headerBar_fa_clock">
                    <FaBell className='icon_bell'/>
                </span>
            </div>
            <div className='headerBar_user d-flex'>
                <span className='headerBar_user_avt'>

                </span>
                <span className='headerBar_user_name'>
                    Vũ Văn Hoàng
                </span>
                <Link to={"/auth"} className='headerBar_user_icon'>
                    <LuLogOut title='Đăng suất'/>   
                </Link>
            </div>
        </div>
    )
}
export default HeaderBar;