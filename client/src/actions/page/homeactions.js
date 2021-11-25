import axiosIntance from '../../helpers/axios';
import { alomallContants,reviewContants,blogContants,settingContant } from '../constant/homeconstant';


// ALOMALL LIST CODE START
export const mallLlist = () => {
    return async (dispatch) => {
            dispatch({ type: alomallContants.ALOMALL_REQUEST });
            await axiosIntance.get(`/allmall`).then((res) => {
                dispatch({
                    type: alomallContants.ALOMALL_SUCCESS,
                    payload: {
                        mall:res.data.mall
                     }
                });
            }).catch((err) => {
                dispatch({
                    type: alomallContants.ALOMALL_FAILURE,
                    payload: { error: 'Some thing went worng !' }
                });
            });
    }
}


export const createreview = (product) => {
    return async (dispatch) => {
            dispatch({ type: reviewContants.CREATE_REVIEW_REQUEST });
            await axiosIntance.post(`/review/add`, product).then((res) => {
                dispatch({
                    type: reviewContants.CREATE_REVIEW_SUCCESS,
                    payload: { message: res.data.message }
                });
            }).catch((err) => {
                dispatch({
                    type: reviewContants.CREATE_REVIEW_FAILURE,
                    payload: { error: 'Some thing went worng !' }
                });
            });
    }

}

 const reviewlist = (product) => {
    return async (dispatch) => {
            dispatch({ type: reviewContants.REVIEW_REQUEST });
            await axiosIntance.get(`/review`, product).then((res) => {
                dispatch({
                    type: reviewContants.REVIEW_SUCCESS,
                    payload: { review: res.data.review }
                });
            }).catch((err) => {
                dispatch({
                    type: reviewContants.REVIEW_FAILURE,
                    payload: { error: 'Some thing went worng !' }
                });
            });
    }

}
export default reviewlist;


export const homebloglist = () => {
    return async (dispatch) => {
            dispatch({ type: blogContants.BLOG_REQUEST });
            await axiosIntance.get(`/homeblog`).then((res) => {
                dispatch({
                    type: blogContants.BLOG_SUCCESS,
                    payload: { blog: res.data.blog }
                });
            }).catch((err) => {
                
                dispatch({
                    type: blogContants.BLOG_FAILURE,
                    payload: { error: 'Some thing went worng' }
                });
            });
    }

}


export const getwebinfo = (id) => {
    return async (dispatch) => {
            dispatch({ type: settingContant.GET_SINGLE_SETTING_REQUEST });
            await axiosIntance.get(`/setting/${id}`).then((res) => {
                dispatch({
                    type: settingContant.GET_SINGLE_SETTING_SUCCESS,
                    payload: { websettings: res.data.websettings }
                });
            }).catch((err) => {
                dispatch({
                    type: settingContant.GET_SINGLE_SETTING_FAILURE,
                    payload: { error: 'Some thing went worng !' }
                });
            });
    }

}