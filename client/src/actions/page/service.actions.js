import axiosIntance from '../../helpers/axios';
import { serviceContants } from '../constant/homeconstant';


// SERVICE LIST CODE START
export const servicelist = (service) => {
    return async (dispatch) => {
            dispatch({ type: serviceContants.SERVICE_REQUEST });
            await axiosIntance.get(`/service/${service}`).then((res) => {
                dispatch({
                    type: serviceContants.SERVICE_SUCCESS,
                    payload: {
                        service:res.data.service
                     }
                });
            }).catch((err) => {
                dispatch({
                    type: serviceContants.SERVICE_FAILURE,
                    payload: { error: err.response }
                });
            });
    }
}
