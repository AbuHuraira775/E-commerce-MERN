import {BrowserRouter as Router,Routes , Navigate, Route} from "react-router-dom"
import CHome from "../../screens/customer/CHome"
import CProfile from "../../screens/customer/CProfile"
import CContact from "../../screens/customer/CContact"
import { ProtectedRoutes, PublicRoute } from "./customer/customerRoutes"
import CLogin from "../../screens/customer/CLogin"
// import About from "../../screens/About"
// import Contact from "../../screens/Contact"
// import { PrivateRoute, PublicRoute } from "./customRoutes"
// import Login from "../../screens/Login"


const CustomerRouting=({path,firstRoute:FirstRoute,secRoute:SecRoute})=>{
    return <Route  path={path} element={<FirstRoute/>}>
             <Route exact path={path} element={<SecRoute/>}/>
           </Route>
}

const MainRouting=()=>{

    return <Router>
                <Routes>
                    {/* <Route exact path="/" element={<CHome/>}/> */}
                    <Route exact path='/' element={<CHome/>}/>
                    <Route  path='/profile' element={<ProtectedRoutes/>}>
                        <Route exact path='/profile' element={<CProfile/>}/>
                    </Route>
                    <Route  path='/login' element={<PublicRoute/>}>
                        <Route path='/login' element={<CLogin/>}/>
                    </Route>
                    {/* <CustomerRouting path="/profile" firstRoute={PrivateRoute} secRoute={CProfile}/> */}
                        {/* <PrivateRoute path="/contact" component={CContact}/>
                        <PublicRoute path="/home" component={CHome}/> */}
                    {/* </Route> */}
{/* 
                    </Route> */}
                  {/*   <Route path="/about/:userName" element={<About />}/>
                        <Route  path='/contact' element={<Contact/>}/>
                    </Route>
                    <Route  path='/login' element={<PublicRoute/>}>
                        <Route  path='/login' element={<Login/>}/>
                    </Route> */}
                </Routes>
    </Router>
}


export default MainRouting;