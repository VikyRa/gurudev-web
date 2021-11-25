import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactStars from "react-rating-stars-component";
import Layout from '../../../components/Layout';
import { api, gernateImages } from '../../../urlConfig';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import CommonBanner from '../../../components/UI/Banner/cbanner';
import { listCategory, listblogs, clearErrors, bloglistCategory, getSingleblog } from '../../../actions';
import { countlenght } from '../../../helpers/commenfunction';
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import './blog.css';
import dateFormat, { masks } from "dateformat";


/**
* @author
* @function BlogDetail
**/
const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    value: 2.5,
    size: window.innerWidth < 600 ? 20 : 25,
    isHalf: true
}
export const BlogDetail = (props) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const [currentPage, setCurrentPage] = useState(1);
    const [categorys, setCategory] = useState("");

    // const [ratings, setRatings] = useState(0);

    const {
        blogs,
        loading,
        error,
        blogsCount,
        resultPerPage,
        message,
        filteredblogsCount, } = useSelector((state) => state.blog);
    const { category } = useSelector((state) => state.bcat);
    const { blog } = useSelector((state) => state.sblog);



    const keyword = props.match.params.keyword;
    const slug = props.match.params.slug;

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    };

    const priceHandler = (event, newPrice) => {
        // setPrice(newPrice);
    };
    let count = filteredblogsCount;

    useEffect(() => {
        if (error) {
            alert.error(message);
            dispatch(clearErrors());
        }
        dispatch(bloglistCategory());
        dispatch(getSingleblog(slug))
        dispatch(listblogs(keyword, currentPage, categorys));
    }, [dispatch, keyword, currentPage, categorys, alert, error,blog]);
    const handleClike = (slug)=>{
        props.history.push(`/blog/${slug}`)
    }


    return (
        <Layout title={`Alo Mall`}>
            <CommonBanner value={`Blog`} />
            <div className="blog-cat pt-5 pb-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            {
                                    <div className="card mb-3">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="card-body">
                                                    <h4 className="card-header">
                                                    <img src={gernateImages(blog.thumbnail)} className="img-fluid" />
                                                    </h4>
                                                    <h4 className="card-text">
                                                        <br />
                                                        {blog.title}
                                                    </h4>
                                                    <p className="card-text text-justify">{blog.description}</p>
                                                    <p className="card-text">
                                                        <small className="text-muted">{dateFormat(blog.createdAt, "mmmm dS, yyyy")}</small>
                                                        {/* <small className="text-secondary ml-3">8 min read</small> */}
                                                        <small className="text-secondary ml-3">
                                                            
                                                        </small> <small className="ml-3"><i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i></small></p>
                                                </div>
                                            </div>
                                           
                                        </div>
                                    </div>
                             
                            }
                        </div>
                        <div className="col-md-4">
                            <h4 className="text-center">See All Categories</h4>
                            {
                                blogs && blogs.map((item, index) => (
                                    <div className="card mb-3" key={index}>
                                        <div className="row">
                                            <div className="col-md-8">
                                                <div className="card-body">
                                                    <h6 className="card-title" onClick={()=>handleClike(item.slug)}>
                                                        {/* <Link to={`${item.slug}`}> */}
                                                            {item.title}
                                                        {/* </Link> */}
                                                    </h6>
                                                    <p className="card-text">
                                                        <small className="text-muted">{dateFormat(item.createdAt, "mmmm dS, yyyy")}</small>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-md-4 my-auto">
                                                <img src={gernateImages(item.thumbnail)} className="img-fluid" />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    )
  }
