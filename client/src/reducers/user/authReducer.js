import { authContants } from "../../actions/constant/auth";
const initState ={
    user :{},
    loading:false,
    success:true,
    error:false,
    isAuthenticated:false,
    role:'',
    token: null,
    message:''
}

export const authuserReducer = (state = initState, action) => {
    switch (action.type) {
      case authContants.LOGIN_REQUEST:
      case authContants.REGISTER_USER_REQUEST:
      case authContants.LOAD_USER_REQUEST:
        return {
          loading: true,
          isAuthenticated: false,
        };
      case authContants.LOGIN_SUCCESS:
      case authContants.REGISTER_USER_SUCCESS:
      case authContants.LOAD_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          isAuthenticated: true,
          user: action.payload.user,
          role:action.payload.role,
          token:action.payload.token
        };
  
      case authContants.LOGOUT_SUCCESS:
        return {
          loading: false,
          user: null,
          isAuthenticated: false,
        };
      case authContants.LOGIN_FAIL:
      case authContants.REGISTER_USER_FAIL:
        return {
          ...state,
          loading: false,
          isAuthenticated: false,
          user: null,
          message: action.payload.error,
        };
  
      case authContants.LOAD_USER_FAIL:
        return {
          loading: false,
          isAuthenticated: false,
          user: null,
          error: action.payload,
        };
  
      case authContants.LOGOUT_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload.error,
        };
  
      case authContants.CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };


  // for getalllist service code start
  const initStatess = {
    users:[],
    userCount:0,
    loading: false,
    resultPerPage:0,
    filteredUserCount:0,
    message: '',
    error: false,
    success: false,
    isUpdated:false,
    reviewError:false
}

export const listusersReducer = (state = initStatess, action) => {

  switch (action.type) {
      case authContants.ALL_USERS_REQUEST:
          state = {
              ...state,
              loading: true,
          }
      break;
      case authContants.ALL_USERS_SUCCESS:
          
          state = {
              ...state,
              loading: false,
              success:true,
              users: action.payload.user.users,
              userCount: action.payload.user.userCount,
              resultPerPage: action.payload.user.resultPerPage,
              filteredUserCount: action.payload.user.filtereduserCount,
          }
      break;
      case authContants.ALL_USERS_FAILURE:
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
