import { alomallContants,reviewContants,blogContants,contactContants } from "../../actions/constant/homeconstant";

const initState = {

    loading: false,
    message: '',
    error: false,
    success: false
}

export const createContactReducer = (state = initState, action) => {
    switch (action.type) {
        case contactContants.CONTACT_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case contactContants.CONTACT_SUCCESS:
            state = {
                ...state,
                loading: false,
                success:true,
                message:action.payload.message,
            }
            break;
        case contactContants.CONTACT_FAILURE:
            state = {
                ...state,
                error: true,
                success:false,
                message: action.payload.error,
            }
            break;

    }
    return state;
}