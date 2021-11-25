import axios from "axios";
import axiosIntance from "../../helpers/axios";
import { api } from "../../urlConfig";
import { cartItemContant, CLEAR_ERRORS, productContant } from "../constant/homeconstant";

export const addItemsToCart = (id, quantity) => {
    return async (dispatch,getState) => {
        const { data } = await axiosIntance.get(`/product/${id}`);
        dispatch({
            type: cartItemContant.ADD_TO_CART,
            payload: {
                product: data.product._id,
                name: data.product.name,
                price: data.product.price,
                image: data.product.productPictures, 
                stock: data.product.Stock,
                quantity,
            },
        });
        // console.log(getState().newCart);
        localStorage.setItem("cartItems", JSON.stringify(getState().newCart.cartItems));
    };
}



// REMOVE FROM CART
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
    dispatch({
      type: cartItemContant.REMOVE_CART_ITEM,
      payload: id,
    });
  
    localStorage.setItem("cartItems", JSON.stringify(getState().newCart.cartItems));
  };
  
  // SAVE SHIPPING INFO
  export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
      type: cartItemContant.SAVE_SHIPPING_INFO,
      payload: data,
    });
  
    localStorage.setItem("shippingInfo", JSON.stringify(data));
  };