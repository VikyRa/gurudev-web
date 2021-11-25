import { alomallContants,reviewContants,blogContants,settingContant } from "../../actions/constant/homeconstant";

const initState = {
    allmall: [],
    review:[],
    blog:[],
    setting:{},
    loading: false,
    message: '',
    error: false,
    success: false
}


export const getMallReducer = (state = initState, action) => {

    switch (action.type) {
        case alomallContants.ALOMALL_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case alomallContants.ALOMALL_SUCCESS:
            state = {
                ...state,
                loading: false,
                allmall: action.payload.mall,
            }
            break;
        case alomallContants.ALOMALL_FAILURE:
            state = {
                ...state,
                error: true,
                message: action.payload.error,
            }
            break;

    }
    return state;
}
// GET ALL USER REDUCER CODE STOP


// CREATE REVIEW
export const createReviewReducer = (state = initState, action) => {
    switch (action.type) {
        case reviewContants.CREATE_REVIEW_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case reviewContants.CREATE_REVIEW_SUCCESS:
            state = {
                ...state,
                loading: false,
                success:true,
                message:action.payload.message,
            }
            break;
        case reviewContants.CREATE_REVIEW_FAILURE:
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


// GET REVIEW  
export const getReviewReducer = (state = initState, action) => {
    switch (action.type) {
        case reviewContants.REVIEW_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case reviewContants.REVIEW_SUCCESS:
            state = {
                ...state,
                loading: false,
                success:true,
                review:action.payload.review,
            }
            break;
        case reviewContants.REVIEW_FAILURE:
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



// GET HOME BLOG LIST
export const getBlogReducer = (state = initState, action) => {
    switch (action.type) {
        case blogContants.BLOG_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case blogContants.BLOG_SUCCESS:
            state = {
                ...state,
                loading: false,
                success:true,
                blog:action.payload.blog,
            }
            break;
        case blogContants.BLOG_FAILURE:
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
export const getwebsettingReducer = (state = initState, action) => {
    switch (action.type) {
        case settingContant.GET_SINGLE_SETTING_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case settingContant.GET_SINGLE_SETTING_SUCCESS:
            state = {
                ...state,
                loading: false,
                success:true,
                setting:action.payload.websettings,
            }
            break;
        case settingContant.GET_SINGLE_SETTING_FAILURE:
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