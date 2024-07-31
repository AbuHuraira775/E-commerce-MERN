import {BrowserRouter as Router,Routes , Navigate,redirect, Route,Outlet} from "react-router-dom";



const PrivateRoute=()=>{
    const isLogin = localStorage.getItem("userLogin");
    return !isLogin ? <Navigate to="/" /> : <Outlet />
}

const PublicRoute=()=>{
    const isLogin = localStorage.getItem("userLogin");
    return isLogin ? <Navigate to="/profile" /> : <Outlet />
}

export {PrivateRoute,PublicRoute}