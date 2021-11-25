import { serviceContants } from "../../actions/constant/homeconstant";

const initState ={
    service :[],
    loading:false,
    success:true,
    error:false,
}


export default (state = initState,action)=>{
    
    switch(action.type){
        case serviceContants.SERVICE_REQUEST:
            state = {
                ...state,
                loading:true
            }
            break;
        case serviceContants.SERVICE_SUCCESS:
            state={
                ...state,
                success:true,
                loading:false,
                service:action.payload.service,
                
            }
            break;
        case serviceContants.SERVICE_FAILURE:
                state={
                    ...state,
                    error:true,
                    success:false,
                    loading:true
                }
                break;

            }
    return state;

}