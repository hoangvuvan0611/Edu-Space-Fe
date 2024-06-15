import { SitebarData } from "./SitebarData";

import './Sitebar.css'
import { Link, useNavigate } from "react-router-dom";
import { FaListAlt } from "react-icons/fa";

function SiteBar(){

    const navigate = useNavigate();

    return(
        <div className="SiteBar">
            <div className="SiteBar-top">
                <FaListAlt id='icon_list_box' title='Thu nhỏ thanh công cụ'/>
                <Link className="title" to={"/home"} style={{textDecoration: 'none'}}>
                    <p style={{color: 'white'}}>W24 </p>
                    <p style={{color: 'red'}}>SPACE</p>
                </Link>
            </div>
            <div className="SiteBar-center">
                <ul className="SiteBar_list">
                    {SitebarData.map((val, key) => {
                        return(
                            <Link key={key} style={{textDecoration: 'none'}} to={val.link} onClick={() => {navigate.pathname = val.link}}>
                                <li 
                                    key={key} 
                                    id={window.location.pathname == val.link ? "active" : ""}
                                     
                                    className="SiteBar-center_row task_calendar_box">
                                    <div className="Site_bar_icon">
                                        {val.icon}
                                    </div>
                                    <p className="Site_bar_title_sub">
                                        {val.title}
                                    </p>
                                </li>
                            </Link> 
                        )
                    })}
                </ul>
            </div>
            <div className="SiteBar-bottom">

            </div>
        </div>
    )
}
export default SiteBar;