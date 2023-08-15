import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get("/api/refresh", {
            withCredentials: true,
        });
        setAuth((prev) => {
            return { ACCESS_TOKEN: response.data.ACCESS_TOKEN ,userId:response.data.userId,authenticated:true };
        });
        return response.data.ACCESS_TOKEN;
    };
    return refresh;
};

export default useRefreshToken;
