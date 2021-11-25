import axios from "axios";
import axiosIntance from "../../helpers/axios";
import { api } from "../../urlConfig";
import { CLEAR_ERRORS, productContant, reviewContants } from "../constant/homeconstant";

// NEW REVIEW
export const newReview = (reviewData) => async (dispatch) => {
    dispatch({ type: reviewContants.CREATE_REVIEW_REQUEST });
    await axiosIntance.put(`/review`, reviewData).then((res) => {
        dispatch({
            type: reviewContants.CREATE_REVIEW_SUCCESS,
            payload: res.data.success,
        });
    }).catch((error) => {
        dispatch({
            type: reviewContants.CREATE_REVIEW_FAILURE,
            payload: error.response.data.message,
        });
    });
};

// Get All Reviews of a Product
export const getAllReviews = (id) => async (dispatch) => {

    dispatch({ type: reviewContants.ALL_REVIEW_REQUEST });

    await axiosIntance.get(`/reviews?id=${id}`).then((res) => {
        dispatch({
            type: reviewContants.ALL_REVIEW_SUCCESS,
            payload: res.data.reviews,
        });
    }).catch((error) => {
        dispatch({
            type: reviewContants.ALL_REVIEW_FAIL,
            payload: error.response.data.message,
        });
    })

};

// Delete Review of a Product
export const deleteReviews = (reviewId, productId) => async (dispatch) => {

    dispatch({ type: reviewContants.DELETE_REVIEW_REQUEST });
    await axiosIntance.delete(`/reviews?id=${reviewId}&productId=${productId}`
    ).then((res) => {
        dispatch({
            type: reviewContants.DELETE_REVIEW_SUCCESS,
            payload: res.data.success,
        });
    }).catch((error) => {
        dispatch({
            type: reviewContants.DELETE_REVIEW_FAIL,
            payload: error.response.data.message,
        });
    });

};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};