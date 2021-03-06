import axios from "axios";
import axiosIntance from "../../helpers/axios";
import { api } from "../../urlConfig";
import { CLEAR_ERRORS, productContant } from "../constant/homeconstant";


export const listproduct = (keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0) => {
    return async (dispatch) => {
        dispatch({ type: productContant.ALL_PRODUCT_REQUEST });
        let link = `${api}products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

        if (category) {
          link = `${api}products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
        }
        await axios.get(link)
            .then((res) => {
                dispatch({
                    type: productContant.ALL_PRODUCT_SUCCESS,
                    payload: {
                        product:res.data
                    }
                });
            }).catch((err) => {
                dispatch({
                    type: productContant.ALL_PRODUCT_FAIL,
                    payload: {
                        error:'Some thing went worng !'
                    }
                });
            });
    };
}

export const createproduct = (product) => {
    return async (dispatch) => {

            dispatch({ type: productContant.CREATE_PRODUCT_REQUEST });
            await axiosIntance.post(`/admin/product/create`, product).then((res) => {
                dispatch({
                    type: productContant.CREATE_PRODUCT_SUCCESS,
                    payload: { message: 'Product added successfully' }
                });
            }).catch((err) => {
                dispatch({
                    type: productContant.CREATE_PRODUCT_FAIL,
                    payload: { error: 'Some thing went worng !' }
                });
            });
    }

}

// delete service

//   // new action
export const deleteproductById = (id) => {
    return async (dispatch) => {
            dispatch({ type: productContant.DELETE_PRODUCT_REQUEST });
             await axiosIntance.delete(`/admin/product/delete/${id}`)
            .then((res) => {
                dispatch({
                    type: productContant.DELETE_PRODUCT_SUCCESS,
                    payload: {
                        message: 'Product deleted successfully',
                    },
                });
            }).catch((err) => {
                dispatch({
                    type: productContant.DELETE_PRODUCT_FAILURE,
                    payload: {
                        error: 'Some thing went worng !'
                    },
                });
            });
    };
};







// // GET SINGLE RECORDS
export const getSingleproduct = (id) => {
    return async (dispatch) => {
            dispatch({ type: productContant.GET_SINGLE_PRODUCT_REQUEST });

            await axiosIntance.get(`/product/${id}`).then((res) => {
                
                dispatch({
                    type: productContant.GET_SINGLE_PRODUCT_SUCCESS,
                    payload: {
                        product:res.data.product
                    }
                });
            }).catch((err) => {
                dispatch({
                    type: productContant.GET_SINGLE_PRODUCT_FAILURE,
                    payload: {
                        error: 'Some thing went worng !'
                    }
                });
            });
    };
}



// // update function action start
export const updateproductaction = (_id, form) => {
    return async (dispatch) => {
        dispatch({ type: productContant.UPDATE_PRODUCT_REQUEST });
        // call api here
        await axiosIntance.put(`/admin/product/update/${_id}`, form)
        .then((res) => {
            // check status
            const { product } = res.data;
            
            dispatch({
                type: productContant.UPDATE_PRODUCT_SUCCESS,
                payload: {
                    product
                }
            })
        }).catch((err) => {
            dispatch({
                type: productContant.UPDATE_PRODUCT_FAILURE,
                payload: {
                    error: 'Some thing went worng !'
                }
            });
        });
    }
}

