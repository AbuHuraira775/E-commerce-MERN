// const reduxState = 0;
// // const reduxState = {
//     // userName:"",
//     // address:""
// // };


// const reducer=(state = reduxState, action)=>{
//     console.log("action",action);

//     if(action.type == "increment"){
//         return state + action.data 
//     }else if(action.type == "decrement"){
//         return state - action.data
//     }
//     return state;
// }

// export default reducer; 


// const reduxState = 0;
const reduxState = [];

// {
//     postName:,
//     postId:'',
//     postImg:"",
//     postDetail:""
// }


const reducer=(state = reduxState, action)=>{
    console.log("action",action);

    if(action.type == "addPost"){
        // return [...state,{postName:action.data.postName,postId:action.data.postId,
        //     postImg:action.data.postImg,postDetail:action.data.postDetail}]
        return [...state,{...action.data}]
    }else if(action.type == "decrement"){
        return state - action.data
    }
    return state;
}

export default reducer; 