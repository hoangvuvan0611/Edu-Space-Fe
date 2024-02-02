import { SitebarData } from "./SitebarData";

import './Sitebar.css'
import { Link, useNavigate } from "react-router-dom";
import { FaListAlt } from "react-icons/fa";

function SiteBar(){

    const navigate = useNavigate();

    return(
        <div className="SiteBar">
            <div className="SiteBar-top">
                <h4>
                    <FaListAlt id='icon_list_box' title='Thu nhỏ thanh công cụ'/>
                    <Link to={"/home"} style={{textDecoration: 'none'}}>
                        <span style={{color: 'white'}}>W24 </span>
                        <span style={{color: 'red'}}>SPACE</span>
                    </Link>
                </h4>
            </div>
            <div className="SiteBar-center">
                <ul className="SiteBar_list">
                    {SitebarData.map((val, key) => {
                        return(
                            <Link style={{textDecoration: 'none'}} to={val.link} onClick={() => {navigate.pathname = val.link}}>
                                <li 
                                    key={key} 
                                    id={window.location.pathname == val.link ? "active" : ""}
                                     
                                    className="SiteBar-center_row task_calendar_box">
                                        <div  id="icon">
                                            {val.icon}
                                        </div>
                                        <div id="title">
                                            {val.title}
                                        </div>
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