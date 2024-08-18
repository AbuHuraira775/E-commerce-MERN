// import {BrowserRouter as Router,Routes , Navigate,redirect, Route,Outlet} from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from 'react';

const PublicRoute=()=>{
    var token = localStorage.getItem("session_id");
      var id = localStorage.getItem("uid");
    return token && id ? <Navigate to="/profile" /> : <Outlet />
}

const useAuth = () => { 
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      var token = localStorage.getItem("session_id");
      var id = localStorage.getItem("uid");
      var url = "http://localhost:5000/api/customer/verify-user";

      if(!token || !id) setIsAuth(false);
      else{
      try { 
        const res = await axios.post(url, {token,id,apiType:"route"})
        console.log(res);    
        setIsAuth(false);

        if(res.status == 200) {
          console.log("noice");
          setIsAuth(true);
        }else{
        setIsAuth(false)
        localStorage.clear();     
      }
      }
      catch(e) {
        console.log(e);
        setIsAuth(false);
        localStorage.clear();  
      }
    };          
}
   
   fetchData();
 }, []);      

  return isAuth;
};


const ProtectedRoutes = () => {
  const isAuth = useAuth();
    console.log("isAuth",isAuth)
  if (isAuth === null) // waiting..
    return null;

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};


export {ProtectedRoutes,PublicRoute};