import { blogContants, reviewContants, CLEAR_ERRORS, categoryContant } from "../../actions/constant/homeconstant";

const initState = {
  blogs: [],
  blog: {},
  blogCount: 0,
  loading: false,
  message: '',
  error: false,
  success: false,
  isUpdated: false,
  reviewError: false,
  category: []
}


// for getalllist service code start

export const blogslistReducer = (state = initState, action) => {

  switch (action.type) {
    case blogContants.BLOG_REQUEST:
      state = {
        ...state,
        loading: true,
      }
      break;
    case blogContants.BLOG_SUCCESS:
      state = {
        ...state,
        loading: false,
        success: true,
        blogs: action.payload.blog.blogs,
        blogsCount: action.payload.blog.blogsCount,
        resultPerPage: action.payload.blog.resultPerPage,
        filteredblogsCount: action.payload.blog.filteredblogsCount,
      }
      break;
    case blogContants.BLOG_FAILURE:
      state = {
        ...state,
        loading: true,
        success: false,
        error: true,
        message: action.payload.error

      }
      break;
  }
  return state;
}



// get single data 
export const getsingleblogReducer = (state = initState, action) => {
  switch (action.type) {
    case blogContants.GET_SINGLE_BLOG_REQUEST:
      state = {
        ...state,
        loading: true,
      }
      break;
    case blogContants.GET_SINGLE_BLOG_SUCCESS:
      state = {
        ...state,
        loading: false,
        success: true,
        blog: action.payload.blog
      }
      break;
    case blogContants.GET_SINGLE_BLOG_FAILURE:
      state = {
        ...state,
        loading: true,
        success: false,
        error: true,
        message: action.payload.error

      }
      break;
  }
  return state;
}



// for add service code start
// export const addProductReducer = (state = initState, action) => {
//     switch (action.type) {
//         case blogContants.CREATE_PRODUCT_REQUEST:
//             state = {
//                 ...state,
//                 loading: true,
//             }
//         break;
//         case blogContants.CREATE_PRODUCT_SUCCESS:
//             state = {
//                 ...state,
//                 loading: false,
//                 success:true,
//                 error:false,
//                 message:action.payload.message
//             }
//         break;
//         case blogContants.CREATE_PRODUCT_FAIL:
//             state = {
//                 ...state,
//                 loading: true,
//                 success:false,
//                 error:true,
//                 message:action.payload.error

//             }
//         break;
//     }
//     return state;
// }


// for delete service code start
// export const deleteProductReducer = (state = initState, action) => {
//     switch (action.type) {
//         case blogContants.DELETE_PRODUCT_REQUEST:
//             state = {
//                 ...state,
//                 loading: true,
//             }
//         break;
//         case blogContants.DELETE_PRODUCT_SUCCESS:
//             state = {
//                 ...state,
//                 loading: false,
//                 success:true,
//                 error:false,
//                 message:action.payload.message
//             }
//         break;
//         case blogContants.DELETE_PRODUCT_FAILURE:
//             state = {
//                 ...state,
//                 loading: true,
//                 success:false,
//                 error:true,
//                 message:action.payload.error

//             }
//         break;
//     }
//     return state;
// }















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
        message: action.payload
      };
    case reviewContants.CREATE_REVIEW_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        success: false,
        message: action.payload
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
        success: false,
        reviewError: true,
        message: action.payload
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






// for getalllist service code start

export const bloglistCategoryReducer = (state = initState, action) => {
  switch (action.type) {
    case categoryContant.ALL_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
      }
      break;
    case categoryContant.ALL_CATEGORY_SUCCESS:
      state = {
        ...state,
        loading: false,
        success: true,
        category: action.payload.category
      }
      break;
    case categoryContant.ALL_CATEGORY_FAIL:
      state = {
        ...state,
        loading: true,
        success: false,
        error: false,

      }
      break;
  }
  return state;
}
