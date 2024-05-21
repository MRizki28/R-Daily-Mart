import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:3002",
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        console.log('original',originalRequest)
        if (
            error.response &&
            error.response.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;
            try {
                const refreshedToken = await refreshToken();
                localStorage.setItem("access_token", refreshedToken);
                axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${refreshedToken}`;
                originalRequest.headers["Authorization"] = `Bearer ${refreshedToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.log("error", refreshError)
            }
        }
        return Promise.reject(error);
    }
);

const refreshToken = async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) {
        console.log("tidak ada refresh token")
    }
    const response = await axios.post("http://localhost:3002/auth/refreshtoken", {
        refreshToken: refreshToken,
    });

    return response.data.data.access_token;
};