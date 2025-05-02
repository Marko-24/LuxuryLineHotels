import React, { createContext, useState, useContext, useEffect } from "react";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext({
    user: null,
    login: () => {},
    logout: () => {}
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedUser = jwt_decode(token);
            setUser(decodedUser);
        }
    }, []);

    const login = (token) => {
        const decodedUser = jwt_decode(token);
        localStorage.setItem("userId", decodedUser.sub);
        localStorage.setItem("userRole", decodedUser.roles);
        localStorage.setItem("token", token);
        setUser(decodedUser);
    };

    const logout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("userRole");
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};