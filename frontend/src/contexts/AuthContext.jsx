import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Correctly import useNavigate
import httpStatus from "http-status";  // Ensure httpStatus is imported
import server from "../environment"

// Create the AuthContext
export const AuthContext = createContext({});

// const client = axios.create({
//     baseURL: "http://localhost:8000/api/v1/users" // Add protocol to baseURL
// });

const client = axios.create({
    baseURL: `${server}/api/v1/users` // Add protocol to baseURL
});

export const AuthProvider = ({ children }) => {//children ko kya kya provide kar rahe ho
    // Define state for user data
    const [userData, setUserData] = useState(null);

    // Initialize useNavigate inside the component
    const navigate = useNavigate();

    // Register function
    const handleRegister = async (name, username, password) => {
        try {
            let request = await client.post("/register", {
                name: name,
                username: username,
                password: password
            });
            if (request.status === httpStatus.CREATED) {
                return request.data.message;  // Return success message
            }
        } catch (err) {
            throw err;
        }
    };

    // Login function
    const handleLogin = async (username, password) => {
        try {
            let request = await client.post("/login", {
                username: username,
                password: password
            });
            console.log(request.data);
            if (request.status === httpStatus.OK) {
                localStorage.setItem("token", request.data.token);  // Save token in local storage
                navigate("/home");  // Navigate to a protected route after login
            }
        } catch (err) {
            throw err;
        }
    };

    const getHistoryOfUser = async () => {
        try {
            let request = await client.get("/get_all_activity", {
                params: {
                    token: localStorage.getItem("token")
                }
            });
            return request.data
        } catch
         (err) {
            throw err;
        }
    }

    const addToUserHistory = async (meetingCode) => {
        try {
            let request = await client.post("/add_to_activity", {
                token: localStorage.getItem("token"),
                meeting_code: meetingCode
            });
            return request
        } catch (e) {
            throw e;
        }
    }

    // Provide the state and handler functions
    const data = {
        userData,
        setUserData,
        handleRegister,
        handleLogin,
        addToUserHistory, 
        getHistoryOfUser,
    };

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};









// import axios from "axios";
// import httpStatus from "http-status";
// import { createContext, useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import server from "../environment";


// export const AuthContext = createContext({});

// const client = axios.create({
//     baseURL: `${server}/api/v1/users`
// })


// export const AuthProvider = ({ children }) => {

//     const authContext = useContext(AuthContext);


//     const [userData, setUserData] = useState(authContext);


//     const router = useNavigate();

//     const handleRegister = async (name, username, password) => {
//         try {
//             let request = await client.post("/register", {
//                 name: name,
//                 username: username,
//                 password: password
//             })


//             if (request.status === httpStatus.CREATED) {
//                 return request.data.message;
//             }
//         } catch (err) {
//             throw err;
//         }
//     }

//     const handleLogin = async (username, password) => {
//         try {
//             let request = await client.post("/login", {
//                 username: username,
//                 password: password
//             });

//             console.log(username, password)
//             console.log(request.data)

//             if (request.status === httpStatus.OK) {
//                 localStorage.setItem("token", request.data.token);
//                 router("/home")
//             }
//         } catch (err) {
//             throw err;
//         }
//     }

//     const getHistoryOfUser = async () => {
//         try {
//             let request = await client.get("/get_all_activity", {
//                 params: {
//                     token: localStorage.getItem("token")
//                 }
//             });
//             return request.data
//         } catch
//          (err) {
//             throw err;
//         }
//     }

//     const addToUserHistory = async (meetingCode) => {
//         try {
//             let request = await client.post("/add_to_activity", {
//                 token: localStorage.getItem("token"),
//                 meeting_code: meetingCode
//             });
//             return request
//         } catch (e) {
//             throw e;
//         }
//     }


//     const data = {
//         userData, setUserData, addToUserHistory, getHistoryOfUser, handleRegister, handleLogin
//     }

//     return (
//         <AuthContext.Provider value={data}>
//             {children}
//         </AuthContext.Provider>
//     )

// }
