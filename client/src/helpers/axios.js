import axios from 'axios';
import { api } from '../urlConfig';
import store from '../store';

const token = window.localStorage.getItem('token');
const axiosIntance = axios.create({
    baseURL:api,
    headers:{
        'Authorization':token ? `Beare ${token}` : '',
    }
});

// axiosIntance.interceptors.request.use((req)=>{

//     const { auth } = store.getState();
//     if(auth.token){
//         req.headers.Authorization = `Beare ${auth.token}`;
//     }
//     return req;
// });


// axiosIntance.interceptors.response.use((res)=>{
//     return res;
// },(error)=>{
//     // const { status } = error.response;
//     const status = error.response ? error.response.status : 500;
//     if(status && status === 500){
//         localStorage.clear();
//         store.dispatch({type: authConstants.LOGOUT_SUCCESS});

//     }
//     return Promise.reject(error);
// })

export default axiosIntance;