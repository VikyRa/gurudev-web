import { alomallContants,reviewContants,blogContants,settingContant } from "../../actions/constant/homeconstant";

const initState = {
    vision:{},
    about:{},
    mision:{},
    loading: false,
    message: '',
    error: false,
    success: false
}






export const getabouteducer = (state = initState, action) => {
    switch (action.type) {
        case settingContant.ABOUT_SINGLE_SETTING_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case settingContant.ABOUT_SINGLE_SETTING_SUCCESS:
            state = {
                ...state,
                loading: false,
                success:true,
                about:action.payload.websettings,
            }
            break;
        case settingContant.ABOUT_SINGLE_SETTING_FAILURE:
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


// GET WEB SETTING DATA 
export const getvisionReducer = (state = initState, action) => {
    switch (action.type) {
        case settingContant.VISION_SINGLE_SETTING_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case settingContant.VISION_SINGLE_SETTING_SUCCESS:
            state = {
                ...state,
                loading: false,
                success:true,
                vision:action.payload.websettings,
            }
            break;
        case settingContant.VISION_SINGLE_SETTING_FAILURE:
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

export const getmisionReducer = (state = initState, action) => {
    switch (action.type) {
        case settingContant.MISION_SINGLE_SETTING_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case settingContant.MISION_SINGLE_SETTING_SUCCESS:
            state = {
                ...state,
                loading: false,
                success:true,
                mision:action.payload.websettings,
            }
            break;
        case settingContant.MISION_SINGLE_SETTING_FAILURE:
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