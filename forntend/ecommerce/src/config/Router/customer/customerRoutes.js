// import {BrowserRouter as Router,Routes , Navigate,redirect, Route,Outlet} from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from 'react';



// const PrivateRoute=()=>{
//     const isLogin = localStorage.getItem("userLogin");
//     return !isLogin ? <Navigate to="/login" /> : <Outlet />
// }

const PublicRoute=()=>{
    const isLogin = localStorage.getItem("userLogin");
    return isLogin ? <Navigate to="/profile" /> : <Outlet />
}

// export {PrivateRoute,PublicRoute}



//now useAuth is not a function anymore is a hook (leaves in the component lifecycle).
const useAuth = () => { 
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      var token = localStorage.getItem("session_id");
      var id = localStorage.getItem("uid");
      var url = "http://localhost:5000/api/customer/verify-user";

      if(!token || !id) setIsAuth(false);

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
      }
    };          

   
   fetchData();
 }, []);      

  return isAuth;
};


const ProtectedRoutes = () => {
  const isAuth = useAuth();

  if (isAuth === null) // waiting..
    return null;

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};


export {ProtectedRoutes,PublicRoute};