import { FaCalendarDays, FaGear, FaScrewdriverWrench  } from "react-icons/fa6";
import { FaList, FaUsersCog } from "react-icons/fa";

export const SitebarData = [
    {
        title: "Lịch làm việc",
        icon: <FaCalendarDays/>,
        link: "/schedule"
    },
    {
        title: "Quản lý sinh viên",
        icon: <FaUsersCog/>,
        link: "/student"
    },
    {
        title: "Danh sách môn dạy",
        icon: <FaList/>,
        link: "/subject"
    },    {
        title: "Thiết lập điểm danh",
        icon: <FaScrewdriverWrench />,
        link: "/setup"
    },    {
        title: "Cài đặt",
        icon: <FaGear/>,
        link: "/setting"
    },
]