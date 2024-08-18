import axios from 'axios';

const url = 'http://localhost:5000/api/customer/login'

const fetchLoginData = (email, pass) => {
    return (dispatch) => {
        const headers = { "Content-Type": "application/json" }
        // axios({ method: "POST", url: ${url}, data: (email, pass), header: headers })
        axios({method:"post",url:url,data:{email,password:pass},header:headers})
        .then((success) => {
                console.log('success : ', success);
                // dispatch({ type: ActionTypes.loginSuccessfull, data: success })
                // localStorage.setItem("token", success?.data?.token);
                // history.push("mainDashboard")
            })
            .catch((err) => {
                console.log('Error : ', err)
            })
            .finally(() => {
                // dispatch({ type: ActionTypes.loadingAuth, status: false });
            })
    }
}

export default fetchLoginData

