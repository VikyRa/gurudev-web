import axiosIntance from '../../helpers/axios';
import { astroloerContant } from '../constant/astrologercontant';
import axios from "axios";
import { api } from "../../urlConfig";


// update function action start
export const updateastrologeraction = (_id,form) => {
    return async (dispatch) => {
        dispatch({ type: astroloerContant.UPDATE_ASTROLOGER_REQUEST });
        // call api here
        const res = await axiosIntance.put(`/atrologer/update/${_id}`, {
            ...form
        }).then((res) => {
                const { message , updateuser } = res.data;
                const { token, user } = res.data;
                localStorage.setItem("user", JSON.stringify(updateuser));
                dispatch({
                    type: astroloerContant.UPDATE_ASTROLOGER_SUCCESS,
                    payload: {
                        message:message,
                        user:updateuser
                    }
                })
        }).catch((err) => {
            console.log(err);
                dispatch({
                    type:astroloerContant.UPDATE_ASTROLOGER_FAILURE,
                    payload:{
                        error: 'Some thing went worng !'
                    }
                });
        });
    }
  }
  


  
// GET SINGLE RECORDS
export const getSingleAstrologer = (id)=>{
    
    return async (dispatch) => {
        try {
          dispatch({ type: astroloerContant.GET_SINGLE_ASTROLOGER_REQUEST });
          const res = await axiosIntance.get(`/atrologer/getdetail/${id}`);
          if (res.status === 200) {
            dispatch({
                type: astroloerContant.GET_SINGLE_ASTROLOGER_SUCCESS,
                payload: { 
                    user:res.data
                }
            });
          } else {
            dispatch({  type: astroloerContant.GET_SINGLE_ASTROLOGER_FAILURE,
                payload: {
                     error: 'Some thing went worng !'
                } });
          }
        } catch (error) {
          console.log(error);
        }
      };
  }
  


  export const listastrologer = (keyword = "", currentPage = 1, price = [0, 25000], ratings = 0) => {
    return async (dispatch) => {
        dispatch({ type: astroloerContant.ALL_ASTROLOGER_REQUEST });
        // let link = `${api}astrologer/list?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
        let link = `${api}astrologer/list?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;

        // if (category) {
        //   link = `${api}astrologer/list?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
        // }
        await axios.get(link)
            .then((res) => {
                dispatch({
                    type: astroloerContant.ALL_ASTROLOGER_SUCCESS,
                    payload: {
                        astrologer:res.data
                    }
                });
            }).catch((err) => {
                
                dispatch({
                    type: astroloerContant.ALL_ASTROLOGER_FAILURE,
                    payload: {
                        error: 'Some thing went worng !'
                    }
                });
            });
    };
}