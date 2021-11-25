import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactStars from "react-rating-stars-component";
import Layout from '../../components/Layout';
import { gernateImages } from '../../urlConfig';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import CommonBanner from '../../components/UI/Banner/cbanner';
import { listCategory, listproduct, clearErrors } from '../../actions';
import { countlenght } from '../../helpers/commenfunction';
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import './product.css';

/**
* @author
* @function Product
**/
const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    value: 2.5,
    size: window.innerWidth < 600 ? 20 : 25,
    isHalf: true
}

export const Product = (props) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 2500000000]);
    const [categorys, setCategory] = useState("");

    const [ratings, setRatings] = useState(0);

    const {
        products,
        loading,
        error,
        productsCount,
        resultPerPage,
        message,
        filteredProductsCount, } = useSelector((state) => state.product);
    const { category } = useSelector((state) => state.category);



    const keyword = props.match.params.keyword;

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    };

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    };
    let count = filteredProductsCount;

    useEffect(() => {
        if (error) {
            alert.error(message);
            dispatch(clearErrors());
        }
        dispatch(listCategory());
        dispatch(listproduct(keyword, currentPage, price, categorys, ratings));
    }, [dispatch, keyword, currentPage, price, categorys, ratings, alert, error]);

 

    return (
        <Layout title={`Alo Mall`}>
            <CommonBanner value={`Alo Mall`} />
            <div className="mallitem pt-5 pb-5">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-2">
                            <Typography>Price</Typography>
                            <Slider
                                value={price}
                                onChange={priceHandler}
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                                min={0}
                                max={2500000000}
                            />

                            <Typography>Categories</Typography>
                            <ul className="categoryBox">
                                {category.map((categorys, indexs) => (
                                    <li
                                        className="category-link"
                                        key={indexs}
                                        onClick={() => setCategory(categorys._id)}
                                    >
                                        {categorys.name}
                                    </li>
                                ))}
                            </ul>
                            <fieldset>
                                <Typography component="legend">Ratings Above</Typography>
                                <Slider
                                    value={ratings}
                                    onChange={(e, newRating) => {
                                        setRatings(newRating);
                                    }}
                                    aria-labelledby="continuous-slider"
                                    valueLabelDisplay="auto"
                                    min={0}
                                    max={5}
                                />
                            </fieldset>
                        </div>


                        <div className="col-sm-10">

                            {
                                products && products.map((item, index) => (
                                    <div className="col-md-4" key={index}>

                                        <div className="shadow">
                                            {/* <p><img src={gernateImages(item.productPictures)} className="img-fluid heart" /></p> */}
                                            <img src={gernateImages(item.productPictures)} className="img-fluid" />
                                            <div className="mb-0 pb-2">
                                                <ReactStars {...options} />
                                            </div>
                                            <p className="add"><Link to={`/product/${item._id}`}>Add to Cart</Link></p>
                                            <p className="buy"><Link to={`/product/${item._id}`}>Buy Now</Link></p>
                                            <div className="p-2 item">
                                                <Link to={`/product/${item._id}`}>
                                                    <p><strong>{item.name}</strong></p>
                                                    <p className="price text-primary"><strong>Rs {item.price ? item.price : null} </strong><span><del>Rs {item.oldprice ? item.oldprice : null}</del></span></p>
                                                    <p className="mb-1">Free Scheduled Delivery</p>
                                                    <p>{countlenght(item.description, 100)}</p>
                                                </Link>
                                            </div>
                                        </div>

                                    </div>
                                ))
                            }
                        </div>
                        <div className="col-12 pt-3 pb-3 text-center">
                            {resultPerPage < count && (
                                <div className="paginationBox">
                                    <Pagination
                                        activePage={currentPage}
                                        itemsCountPerPage={resultPerPage}
                                        totalItemsCount={productsCount}
                                        onChange={setCurrentPageNo}
                                        nextPageText="Next"
                                        prevPageText="Prev"
                                        firstPageText="1st"
                                        lastPageText="Last"
                                        itemClass="page-item"
                                        linkClass="page-link"
                                        activeClass="pageItemActive"
                                        activeLinkClass="pageLinkActive"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    )
}
