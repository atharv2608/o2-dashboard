import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { logout } from "../../slices/authSlice";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import {
    Popover,
    PopoverHandler,
    PopoverContent,
    Button,
    Typography,
    List,
  } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearData } from "../../slices/dataSlice";

export default function MyProfile({username= "Username", role="Role"}) {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const logoutHandler = async () => {
       try {
        Cookies.remove("accessToken")
        dispatch(logout())
        dispatch(clearData())
       } catch (error) {
            toast.error("Error while logging out")
            console.error("Logout :: ", error)
       }
    };

    return (
        <Popover placement="bottom-end">
            <ToastContainer />
            <PopoverHandler>
                <Button className="bg-red-500">My Profile</Button>
            </PopoverHandler>
            <PopoverContent className="w-72">
                <div className="mb-4 flex items-center gap-4 border-b border-blue-gray-50 pb-4">
                    <UserCircleIcon className="h-8 w-8 mr-2" color="#ef4444" />
                    <div>
                        <Typography variant="h6" color="blue-gray">
                            {username}
                        </Typography>
                        <Typography
                            variant="small"
                            color="gray"
                            className="font-medium text-blue-gray-500"
                        >
                            {role}
                        </Typography>
                    </div>
                </div>
                <List className="p-0">
                    <Button className="bg-[#f84434] text-white" onClick={logoutHandler} disabled={loading}>
                        {loading ? 'Logging out...' : 'Logout'}
                    </Button>
                </List>
            </PopoverContent>
        </Popover>
    );
}
