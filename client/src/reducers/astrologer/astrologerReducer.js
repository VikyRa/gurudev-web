import { astroloerContant } from "../../actions/constant/astrologercontant";

const initState = {
    userdata: {},
    loading: false,
    users:{},
    message: '',
    error: false,
    success: false,
    isUpdated:false
}



const initStates = {
    astrologers:[],
    astrologerCount:0,
    loading: false,
    resultPerPage:0,
    filteredAstrologerCount:0,
    message: '',
    error: false,
    success: false,
    isUpdated:false,
    reviewError:false
}

 
// for getalllist service code start

export const listAstrolorReducer = (state = initStates, action) => {

    switch (action.type) {
        case astroloerContant.ALL_ASTROLOGER_REQUEST:
            state = {
                ...state,
                loading: true,
            }
        break;
        case astroloerContant.ALL_ASTROLOGER_SUCCESS:
            
            state = {
                ...state,
                loading: false,
                success:true,
                astrologers: action.payload.astrologer.astrologers,
                astrologerCount: action.payload.astrologer.astrologerCount,
                resultPerPage: action.payload.astrologer.resultPerPage,
                filteredAstrologerCount: action.payload.astrologer.filteredAstrologerCount,
            }
        break;
        case astroloerContant.ALL_ASTROLOGER_FAILURE:
            state = {
                ...state,
                loading: true,
                success:false,
                error:true,
                message:action.payload.error

            }
        break;
    }
    return state;
}

export const updateAstrologerReducer = (state = initState, action) => {
    switch (action.type) {
        // UPDATE RECORD CASE START
        case astroloerContant.UPDATE_ASTROLOGER_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case astroloerContant.UPDATE_ASTROLOGER_SUCCESS:
            state = {
                ...state,
                loading: false,
                isUpdated:true,
                message: action.payload.message,
                userdata: action.payload.user
            }
            break;

        case astroloerContant.UPDATE_ASTROLOGER_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload,
            }
            break;

        case astroloerContant.UPDATE_ASTROLOGER_RESET:
            return {
                ...state,
                isUpdated: false,
            };
        break;

    }
    return state;

}



// GET SINGLE RECORDS
export const singleAstrologerReducer = (state = initState, action) => {
    switch (action.type) {

        case astroloerContant.GET_SINGLE_ASTROLOGER_REQUEST:
            state = {
                ...state
            }
            break;
        case  astroloerContant.GET_SINGLE_ASTROLOGER_SUCCESS:
            state = {
                ...state,
                user: action.payload.user,
            }
            break;
        case astroloerContant.GET_SINGLE_ASTROLOGER_FAILURE:
            state = {
                ...state,
                message: action.payload.error,
            }
            break;
    }
    return state;
}