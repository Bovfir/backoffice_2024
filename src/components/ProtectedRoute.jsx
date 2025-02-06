import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { testToken } from "../data/index.js";

const isAuth = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            return false;
        }

        const resToken = await testToken(token);

        if (!resToken) {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
        }
        return resToken;
    } catch (error) {
        return false;
    }
};

const ProtectedRoute = ({ children, redirectTo }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const result = await isAuth();
                setIsAuthenticated(result);
            } catch (error) {
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    if (isAuthenticated) {
        return children;
    }

    return <Navigate to={redirectTo} replace />;
};

export default ProtectedRoute;