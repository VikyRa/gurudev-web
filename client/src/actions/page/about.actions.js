import axiosIntance from '../../helpers/axios';
import { alomallContants,reviewContants,blogContants,settingContant } from '../constant/homeconstant';

export const getabout = (id) => {
    return async (dispatch) => {
            dispatch({ type: settingContant.ABOUT_SINGLE_SETTING_REQUEST });
            await axiosIntance.get(`/setting/${id}`).then((res) => {
                dispatch({
                    type: settingContant.ABOUT_SINGLE_SETTING_SUCCESS,
                    payload: { websettings: res.data.websettings }
                });
            }).catch((err) => {
                dispatch({
                    type: settingContant.ABOUT_SINGLE_SETTING_FAILURE,
                    payload: { error: err.response }
                });
            });
    }

}

export const getvision = (id) => {
    return async (dispatch) => {
            dispatch({ type: settingContant.VISION_SINGLE_SETTING_REQUEST });
            await axiosIntance.get(`/setting/${id}`).then((res) => {
                dispatch({
                    type: settingContant.VISION_SINGLE_SETTING_SUCCESS,
                    payload: { websettings: res.data.websettings }
                });
            }).catch((err) => {
                dispatch({
                    type: settingContant.VISION_SINGLE_SETTING_FAILURE,
                    payload: { error: err.response }
                });
            });
    }

}


export const getmision = (id) => {
    return async (dispatch) => {
            dispatch({ type: settingContant.MISION_SINGLE_SETTING_REQUEST });
            await axiosIntance.get(`/setting/${id}`).then((res) => {
                dispatch({
                    type: settingContant.MISION_SINGLE_SETTING_SUCCESS,
                    payload: { websettings: res.data.websettings }
                });
            }).catch((err) => {
                dispatch({
                    type: settingContant.MISION_SINGLE_SETTING_FAILURE,
                    payload: { error: err.response }
                });
            });
    }

}