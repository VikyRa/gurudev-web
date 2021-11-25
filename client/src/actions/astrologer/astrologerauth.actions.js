import axiosIntance from '../../helpers/axios';
import { authContants } from '../constant/auth';

export const sigupastrolger = (form) =>{
    return async (dispatch) => {
        dispatch({ type: authContants.REGISTER_USER_REQUEST });
        await axiosIntance.post(`/astrologer/register`,form).then((res) => {
            const { token, user } = res.data;
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("role", user.role);
            dispatch({
                type: authContants.REGISTER_USER_SUCCESS,
                payload: {
                    token:token,
                    user:user,
                    role:user.role
                 }
            });
        }).catch((err) => {
         
            dispatch({
                type: authContants.REGISTER_USER_FAIL,
                payload: { error: "something went worng" }
            });
        });
}
}

// login user
export const astrologerlogin = (user) => {
    return async (dispatch) => {
      dispatch({ type: authContants.LOGIN_REQUEST });
      const res = await axiosIntance.post(`/astrologer/login`, {
        ...user,
      }).then((res) => {
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("role", user.role);
        dispatch({
            type: authContants.LOGIN_SUCCESS,
            payload: {
                token:token,
                user:user,
                role:user.role
             }
        });
    }).catch((err) => {
        // console.log(err.response.data.message);
        dispatch({
            type: authContants.LOGIN_FAIL,
            payload: { error: 'Some thing went worng !' }
        });
    });
    };
  };
  




// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: authContants.CLEAR_ERRORS });
  };
  


  // Logout User
export const AstrologerSignout = () => async (dispatch) => {

    await axiosIntance.get(`/astrologer/logout`).then((res) => {
      localStorage.clear();
      dispatch({
          type: authContants.LOGOUT_SUCCESS,
      });
  }).catch((err) => {
    dispatch({ type: authContants.LOGOUT_FAIL, payload: 'Some thing went worng !' });
  });
};