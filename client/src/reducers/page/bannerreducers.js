import { bannerContants } from "../../actions/constant/homeconstant";

const initState ={
    banner :[],
    loading:false,
    success:true,
    error:false,
}


export default (state = initState,action)=>{
    switch(action.type){
        case bannerContants.BANNER_REQUEST:
            state = {
                ...state,
                loading:true
            }
            break;
        case bannerContants.BANNER_SUCCESS:
            state={
                ...state,
                banner:action.payload.banner,
                success:true,
                loading:false
            }
            break;
        case bannerContants.BANNER_FAILURE:
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