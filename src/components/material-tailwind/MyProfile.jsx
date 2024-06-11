import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { logout } from "../../slices/authSlice";
import { ToastContainer, toast } from "react-toastify";
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
import user from "../../api/User";

export default function MyProfile({username= "Username", role="Role"}) {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        console.log("Logging out...");
        dispatch(logout());
        setLoading(true);
        try {
            await user.logoutUser().then((res) => {
                if (res.data?.statusCode === 200) {
                    console.log("Logout successful, navigating to login page...");
                    navigate("/login", { replace: true });
                    setLoading(false);
                }
            }).catch((error) => {
                if (error?.response?.status === 401) toast.error("No user logged in");
                else {
                    console.error("Error: ", error);
                    toast.error("Ran into problem");
                }
                setLoading(false);
            });
        } catch (error) {
            console.error("Error: ", error);
            toast.error("Some error occurred");
            setLoading(false);
        } finally {
            setLoading(false);
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
