import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import { FaRegFolderOpen } from "react-icons/fa";
import { GrDocumentDownload } from "react-icons/gr";
import { PiFolderOpenLight } from "react-icons/pi";
import { FiBarChart } from "react-icons/fi";
import { LuUsers } from "react-icons/lu";
import { CiCalendar } from "react-icons/ci";



export const Icons = {
    paginationNext: <FaChevronRight />,
    paginationPrevious: <FaChevronLeft />,
    add: <IoIosAddCircleOutline size={25}/>,
    close: <IoIosClose size={35}/>,
    delete: <AiOutlineDelete size={17}/>,
    edit: <FiEdit3 size={17}/>,
    logOut: <MdLogout size={30}/>,
    folder: <FaRegFolderOpen size={30} />,
    download: <GrDocumentDownload size={23}/>,
    folderCard: <PiFolderOpenLight size={25} />,
    chart: <FiBarChart size={25}/>,
    users: <LuUsers size={25}/>,
    calendar: <CiCalendar size={25}/>
}