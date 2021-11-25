import axiosIntance from '../../helpers/axios';
import { contactContants } from '../constant/homeconstant';


export const createContactAction = (form) => {
    return async (dispatch) => {
            dispatch({ type: contactContants.CONTACT_REQUEST });
            await axiosIntance.post(`/create-contact`,{
                ...form
            }).then((res) => {
                dispatch({
                    type: contactContants.CONTACT_SUCCESS,
                    payload: { message: res.data.message }
                });
            }).catch((err) => {
                dispatch({
                    type: contactContants.CONTACT_FAILURE,
                    payload: { error: err.response.data.error }
                });
            });
    }

}
