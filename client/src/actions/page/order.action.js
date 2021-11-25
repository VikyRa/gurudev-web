import axiosIntance from "../../helpers/axios";
import { OrderContants } from "../constant/ordercontant";

// Create Order
export const createOrder = (order) => async (dispatch) => {
    try {
      dispatch({ type: OrderContants.CREATE_ORDER_REQUEST });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosIntance.post("/api/v1/order/new", order, config);
  
      dispatch({ type: OrderContants.CREATE_ORDER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: OrderContants.CREATE_ORDER_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // My Orders
  export const myOrders = () => async (dispatch) => {
    try {
      dispatch({ type: OrderContants.MY_ORDERS_REQUEST });
  
      const { data } = await axiosIntance.get("/api/v1/orders/me");
  
      dispatch({ type: OrderContants.MY_ORDERS_SUCCESS, payload: data.orders });
    } catch (error) {
      dispatch({
        type: OrderContants.MY_ORDERS_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Get All Orders (admin)
  export const getAllOrders = () => async (dispatch) => {
    try {
      dispatch({ type: OrderContants.ALL_ORDERS_REQUEST });
  
      const { data } = await axiosIntance.get("/api/v1/admin/orders");
  
      dispatch({ type: OrderContants.ALL_ORDERS_SUCCESS, payload: data.orders });
    } catch (error) {
      dispatch({
        type: OrderContants.ALL_ORDERS_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Update Order
  export const updateOrder = (id, order) => async (dispatch) => {
    try {
      dispatch({ type: OrderContants.UPDATE_ORDER_REQUEST });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosIntance.put(
        `/api/v1/admin/order/${id}`,
        order,
        config
      );
  
      dispatch({ type: OrderContants.UPDATE_ORDER_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: OrderContants.UPDATE_ORDER_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Delete Order
  export const deleteOrder = (id) => async (dispatch) => {
    try {
      dispatch({ type: OrderContants.DELETE_ORDER_REQUEST });
  
      const { data } = await axiosIntance.delete(`/api/v1/admin/order/${id}`);
  
      dispatch({ type: OrderContants.DELETE_ORDER_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: OrderContants.DELETE_ORDER_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Get Order Details
  export const getOrderDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: OrderContants.ORDER_DETAILS_REQUEST });
  
      const { data } = await axiosIntance.get(`/api/v1/order/${id}`);
  
      dispatch({ type: OrderContants.ORDER_DETAILS_SUCCESS, payload: data.order });
    } catch (error) {
      dispatch({
        type: OrderContants.ORDER_DETAILS_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Clearing Errors
  export const clearErrors = () => async (dispatch) => {
    dispatch({ type: OrderContants.CLEAR_ERRORS });
  };
  