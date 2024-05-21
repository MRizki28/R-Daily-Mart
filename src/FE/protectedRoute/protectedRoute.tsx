import React, { ReactElement } from "react";
import { useLocation, Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    element: ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
    const isAuthenticated = () => {
        return localStorage.getItem('access_token') !== null;
    };

    const location = useLocation();

    return isAuthenticated() ? (
        element
    ) : (
        <Navigate to="/cms/login" state={{ from: location }} replace />
    );
};

export default ProtectedRoute;
