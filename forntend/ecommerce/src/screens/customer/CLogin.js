import React, { useEffect, useState } from 'react'
import InpComp from '../../component/Inpcom';
import BtnComp from '../../component/BtnComp';
import { useDispatch } from 'react-redux'
import fetchLoginData from '../../config/store/actions/fetchLogindata.js';
// import {useHistory} from 'react-router-dom'

const CLogin = () => {
    // const history = useHistory()
    const dispatch = useDispatch();
    const [email, setEmail] = useState();
    const [pass, setPass] = useState();
    const btnFuc = () => {
        console.log('email', email)
        console.log('pass', pass)
        alert("adasd")
        dispatch(fetchLoginData(email, pass))
    }

    return <div>
        <h2>Login Page</h2>
        <InpComp text="email" type="email" val={email} setInputVal={(e) => setEmail(e.target.value)} />
        <InpComp text="password" type="password" val={pass} setInputVal={(e) => setPass(e.target.value)} />
        <BtnComp btnText="Login" btnFuc={btnFuc} />
    </div>
}


export default CLogin;

//login comp