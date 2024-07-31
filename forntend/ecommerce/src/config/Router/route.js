import {BrowserRouter as Router,Routes , Navigate, Route} from "react-router-dom"
import CHome from "../../screens/customer/CHome"
import CProfile from "../../screens/customer/CProfile"
import CContact from "../../screens/customer/CContact"
import { PrivateRoute, PublicRoute } from "./customer/customRoutes"
// import About from "../../screens/About"
// import Contact from "../../screens/Contact"
// import { PrivateRoute, PublicRoute } from "./customRoutes"
// import Login from "../../screens/Login"


// const CustomerRouting=()=>{

//     return <Routes>
//                     <Route index element={<CHome/>}/>
//                     <Route path="profile" element={<CProfile/>}/>
//                 </Routes>
// }

const MainRouting=()=>{

    return <Router>
                <Routes>
                    {/* <Route exact path="/" element={<CHome/>}/> */}
                    <Route exact path='/' element={<CHome/>}/>
                    <Route  path='/profile' element={<PrivateRoute/>}>
                        <Route exact path='/profile' element={<CProfile/>}/>
                    </Route>
                        {/* <PrivateRoute path="/contact" component={CContact}/>
                        <PublicRoute path="/home" component={CHome}/> */}
                    {/* </Route> */}
                    {/* <Route  path='/contact' element={<CContact/>}/> */}
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