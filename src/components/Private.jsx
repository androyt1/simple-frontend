import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const Private = () => {
    const userToken = Cookies.get("jwt");
    if (!userToken) {
        toast.error("No Token Provided ... Access denied");
    }

    return userToken ? <Outlet /> : <Navigate to='/' replace />;
};
export default Private;
