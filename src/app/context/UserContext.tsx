"use client"; // Marks this component as a client component  

import { createContext, useContext, useState, useEffect } from 'react';  

interface User {  
    id: string;  
    name: string;  
    email: string;  
}  

interface UserContextType {  
    user: User | null;  
    setUser: (user: User | null) => void;  
    logout: () => void;  
}  

const UserContext = createContext<UserContextType | undefined>(undefined);  

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {  
    const [user, setUser] = useState<User | null>(null);  

    // Load user session data from localStorage on mount  
    useEffect(() => {  
        const storedUser = localStorage.getItem('user');  
        if (storedUser) {  
            setUser(JSON.parse(storedUser));  
        }  
    }, []);  

    // Save user data to localStorage  
    useEffect(() => {  
        if (user) {  
            localStorage.setItem('user', JSON.stringify(user));  
        } else {  
            localStorage.removeItem('user');  
        }  
    }, [user]);  

    const logout = () => {  
        setUser(null);  
    };  

    return (  
        <UserContext.Provider value={{ user, setUser, logout }}>  
            {children}  
        </UserContext.Provider>  
    );  
};  

export const useUser = () => {  
    const context = useContext(UserContext);  
    if (!context) {  
        throw new Error("useUser must be used within a UserProvider");  
    }  
    return context;  
};