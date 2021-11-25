import axiosIntance from '../../helpers/axios';
import { authContants } from '../constant/auth';
import axios from "axios";
import { api } from "../../urlConfig";

export const sigupuser = (form) => {
  return async (dispatch) => {
    dispatch({ type: authContants.REGISTER_USER_REQUEST });
    await axiosIntance.post(`/register`, form).then((res) => {
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", user.role);
      dispatch({
        type: authContants.REGISTER_USER_SUCCESS,
        payload: {
          token: token,
          user: user,
          role: user.role
        }
      });
    }).catch((err) => {
      dispatch({
        type: authContants.REGISTER_USER_FAIL,
        payload: { error: 'Some thing went worng !' }
      });
    });
  }
}

// login user
export const userlogin = (user) => {
  return async (dispatch) => {
    dispatch({ type: authContants.LOGIN_REQUEST });
    const res = await axiosIntance.post(`/login`, {
      ...user,
    }).then((res) => {
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", user.role);
      dispatch({
        type: authContants.LOGIN_SUCCESS,
        payload: {
          token: token,
          user: user,
          role: user.role
        }
      });
    }).catch((err) => {
      // console.log('Some thing went worng !');
      dispatch({
        type: authContants.LOGIN_FAIL,
        payload: { error: 'Some thing went worng !' }
      });
    });
  };
};



export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    // console.log(token);
    if (token) {

      const user = JSON.parse(localStorage.getItem("user"));
      const role = localStorage.getItem("role");

      dispatch({
        type: authContants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
          role
        },
      });
    } else {
      dispatch({
        type: authContants.LOGIN_FAIL,
        payload: { error: "Failed to login" },
      });
    }
  };
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: authContants.CLEAR_ERRORS });
};



// Logout User
export const userSignout = () => async (dispatch) => {

  await axiosIntance.get(`/logout`).then((res) => {
    localStorage.clear();
    dispatch({
      type: authContants.LOGOUT_SUCCESS,
    });
  }).catch((err) => {
    dispatch({ type: authContants.LOGOUT_FAIL, payload: 'Some thing went worng !' });
  });
};




export const getOrder = () => {
  return axiosIntance.get(`/createorder`)
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const grabStatus = (paymentId) => {
  return axiosIntance.get(`/payments/${paymentId}`)
    .then((response) => response.json())
    .catch((err) => console.log(err));
};




export const listusers = (keyword = "", currentPage = 1, price = [0, 25000], ratings = 0) => {
  return async (dispatch) => {
      dispatch({ type: authContants.ALL_USERS_REQUEST });
      // let link = `${api}astrologer/list?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
      let link = `${api}users/list?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;

      // if (category) {
      //   link = `${api}astrologer/list?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
      // }
      await axios.get(link)
          .then((res) => {
              dispatch({
                  type: authContants.ALL_USERS_SUCCESS,
                  payload: {
                      user:res.data
                  }
              });
          }).catch((err) => {
              
              dispatch({
                  type: authContants.ALL_USERS_FAILURE,
                  payload: {
                      error: 'Some thing went worng !'
                  }
              });
          });
  };
}