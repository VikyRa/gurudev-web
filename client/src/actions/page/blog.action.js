import axios from "axios";
import axiosIntance from "../../helpers/axios";
import { api } from "../../urlConfig";
import { blogContants,categoryContant} from "../constant/homeconstant";


export const listblogs = (keyword = "", currentPage=1,category) => {
    return async (dispatch) => {
        dispatch({ type: blogContants.BLOG_REQUEST });
        let link = `${api}blogslist?page=${currentPage}`;

        if (category) {
          link = `${api}blogslist?category=${category}&page=${currentPage}`;
        }
        await axios.get(link)
            .then((res) => {
                dispatch({
                    type: blogContants.BLOG_SUCCESS,
                    payload: {
                        blog:res.data
                    }
                });
            }).catch((err) => {
                dispatch({
                    type: blogContants.BLOG_FAILURE,
                    payload: {
                        error: 'Some thing went worng !'
                    }
                });
            });
    };
}


// // GET SINGLE RECORDS
export const getSingleblog = (slug) => {
    return async (dispatch) => {
            dispatch({ type: blogContants.GET_SINGLE_BLOG_REQUEST });
            await axiosIntance.get(`/blog/${slug}`)
            .then((res) => {
                dispatch({
                    type: blogContants.GET_SINGLE_BLOG_SUCCESS,
                    payload: {
                        blog:res.data.blog
                    }
                });
            }).catch((err) => {
                dispatch({
                    type: blogContants.GET_SINGLE_BLOG_FAILURE,
                    payload: {
                        error: "Some thing went worng"
                    }
                });
            });
    };
}


export const bloglistCategory = () => {
    return async (dispatch) => {
        dispatch({ type: categoryContant.ALL_CATEGORY_REQUEST });
        await axiosIntance.get('blog-category').then((res) => {

            dispatch({
                type: categoryContant.ALL_CATEGORY_SUCCESS,
                payload: {
                    category:res.data.category
                }
            });
        }).catch((err) => {
            dispatch({
                type: categoryContant.ALL_CATEGORY_FAIL,
                payload: {
                    error: err.response
                }
            });
        });

    };
}