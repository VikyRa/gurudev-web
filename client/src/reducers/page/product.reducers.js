import {  productContant, reviewContants ,CLEAR_ERRORS} from "../../actions/constant/homeconstant";

const initState = {
    products:[],
    product:{},
    productCount:0,
    loading: false,
    message: '',
    error: false,
    success: false,
    isUpdated:false,
    reviewError:false
}

 
// for getalllist service code start

export const productlistReducer = (state = initState, action) => {

    switch (action.type) {
        case productContant.ALL_PRODUCT_REQUEST:
            state = {
                ...state,
                loading: true,
            }
        break;
        case productContant.ALL_PRODUCT_SUCCESS:
            state = {
                ...state,
                loading: false,
                success:true,
                products: action.payload.product.products,
                productsCount: action.payload.product.productsCount,
                resultPerPage: action.payload.product.resultPerPage,
                filteredProductsCount: action.payload.product.filteredProductsCount,
            }
        break;
        case productContant.ALL_PRODUCT_FAIL:
            state = {
                ...state,
                loading: true,
                success:false,
                error:true,
                message:action.payload.error

            }
        break;
    }
    return state;
}



// get single data 
export const getProductReducer = (state = initState, action) => {
    
    switch (action.type) {
        case productContant.GET_SINGLE_PRODUCT_REQUEST:
            state = {
                ...state,
                loading: true,
            }
        break;
        case productContant.GET_SINGLE_PRODUCT_SUCCESS:
            state = {
                ...state,
                loading: false,
                success:true,
                product:action.payload.product
            }
        break;
        case productContant.GET_SINGLE_PRODUCT_FAILURE:
            state = {
                ...state,
                loading: true,
                success:false,
                error:true,
                message:action.payload.error

            }
        break;
    }
    return state;
}



// for add service code start
export const addProductReducer = (state = initState, action) => {
    switch (action.type) {
        case productContant.CREATE_PRODUCT_REQUEST:
            state = {
                ...state,
                loading: true,
            }
        break;
        case productContant.CREATE_PRODUCT_SUCCESS:
            state = {
                ...state,
                loading: false,
                success:true,
                error:false,
                message:action.payload.message
            }
        break;
        case productContant.CREATE_PRODUCT_FAIL:
            state = {
                ...state,
                loading: true,
                success:false,
                error:true,
                message:action.payload.error

            }
        break;
    }
    return state;
}


// for delete service code start
export const deleteProductReducer = (state = initState, action) => {
    switch (action.type) {
        case productContant.DELETE_PRODUCT_REQUEST:
            state = {
                ...state,
                loading: true,
            }
        break;
        case productContant.DELETE_PRODUCT_SUCCESS:
            state = {
                ...state,
                loading: false,
                success:true,
                error:false,
                message:action.payload.message
            }
        break;
        case productContant.DELETE_PRODUCT_FAILURE:
            state = {
                ...state,
                loading: true,
                success:false,
                error:true,
                message:action.payload.error

            }
        break;
    }
    return state;
}















export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {
      case reviewContants.CREATE_REVIEW_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case reviewContants.CREATE_REVIEW_SUCCESS:
        return {
          loading: false,
          success: true,
          message:action.payload
        };
      case reviewContants.CREATE_REVIEW_FAILURE:
        return {
          ...state,
          loading: false,
          error: true,
          success:false,
          message:action.payload
        };
      default:
        return state;
    }
  };
  
  export const productReviewsReducer = (state = { reviews: [] }, action) => {
    switch (action.type) {
      case reviewContants.ALL_REVIEW_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case reviewContants.ALL_REVIEW_SUCCESS:
        return {
          loading: false,
          reviews: action.payload,
        };
      case reviewContants.ALL_REVIEW_FAIL:
        return {
          ...state,
          loading: false,
          error: true,
          success:false,
          reviewError:true,
          message:action.payload
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export const reviewReducer = (state = {}, action) => {
    switch (action.type) {
      case reviewContants.DELETE_REVIEW_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case reviewContants.DELETE_REVIEW_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
      case reviewContants.DELETE_REVIEW_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case reviewContants.DELETE_REVIEW_RESET:
        return {
          ...state,
          isDeleted: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };