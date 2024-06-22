import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";

const useAxiosPrivate = () => {

    const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");
    const REFRESH_TOKEN = localStorage.getItem("REFRESH_TOKEN");

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                if (!config.headers["authorization"]) {
                    config.headers[
                        "authorization"
                    ] = `Bearer ${ACCESS_TOKEN}`;
                }

                if (!config.headers["refresh-token"]) {
                    config.headers[
                        "refresh-token"
                    ] = `${REFRESH_TOKEN}`;
                }
                
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => {
                const authorization = response?.headers?.authorization || "";
                const newAccessToken = authorization.split(" ")[1] || "";

                if(newAccessToken !== "")
                    localStorage.setItem("ACCESS_TOKEN", newAccessToken);
                
                return response;
            },
            async (error) => {
                console.log(error);
                if (error?.response?.status === 401) {
                    localStorage.clear();
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        };
    }, []);

    return axiosPrivate;
};

export default useAxiosPrivate;
