import axiosIntance from '../../helpers/axios';
import { bannerContants } from '../constant/homeconstant';


// BANNER LIST CODE START
export const bannerlist = () => {
    return async (dispatch) => {
            dispatch({ type: bannerContants.BANNER_REQUEST });
            await axiosIntance.get(`/banner`).then((res) => {
                dispatch({
                    type: bannerContants.BANNER_SUCCESS,
                    payload: {
                        banner:res.data.banner
                     }
                });
            }).catch((err) => {
                dispatch({
                    type: bannerContants.BANNER_FAILURE,
                    payload: { error: err.response }
                });
            });
    }
}
