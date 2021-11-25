import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactStars from "react-rating-stars-component";
import Layout from '../../../components/Layout';
import { gernateImages } from '../../../urlConfig';
import { Link } from 'react-router-dom';
import validator from 'validator';
import CommonBanner from '../../../components/UI/Banner/cbanner';
import { addItemsToCart, getSingleproduct, newReview,clearErrors } from '../../../actions';
import './ProductDetails.css';
import { countlenght } from '../../../helpers/commenfunction';
import { Rating } from "@material-ui/lab";
import ReviewCard from "./ReviewCard.js";
import { useAlert } from "react-alert";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
  } from "@material-ui/core";
/**
* @author
* @function ProductDetails
**/

export const ProductDetails = (props) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { product,error } = useSelector((state) => state.signleproduct);

    const { success, reviewError,message } = useSelector(
        (state) => state.newReview
    );

    const productId = props.match.params.id




    const options = {
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    };

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");




    const increaseQuantity = () => {
        if (product.quantity <= quantity) return;

        const qty = quantity + 1;
        setQuantity(qty);
    };

    const decreaseQuantity = () => {
        if (1 >= quantity) return;

        const qty = quantity - 1;
        setQuantity(qty);
    };

    const addToCartHandler = () => {
        dispatch(addItemsToCart(props.match.params.id, quantity));
        // alert.success("Item Added To Cart");
    };

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    };

    const reviewSubmitHandler = () => {
        const myForm = new FormData();
    
        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", props.match.params.id);
    
        dispatch(newReview(myForm));
    
        setOpen(false);
      };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
          }
      
          if (reviewError) {
            alert.error(message);
            dispatch(clearErrors());
          }
      
          if (success) {
            alert.success("Review Submitted Successfully");
            // dispatch({ type: NEW_REVIEW_RESET });
          }
        dispatch(getSingleproduct(productId))
    }, [dispatch]);

    return (
        <Layout title={`${product.name}`}>
            <div className="ProductDetails">
                <div>
                    <img className="CarouselImage" src={gernateImages(product.productPictures)} alt={` Slide`} />
                </div>
                <div>
                    <div className="detailsBlock-1">
                        <h2>{product.name}</h2>
                        <p>Product # {product._id}</p>
                    </div>
                    <div className="detailsBlock-2">
                        <Rating {...options} />
                        <span className="detailsBlock-2-span">
                            {" "}
                            ({product.numOfReviews} Reviews)
                        </span>
                    </div>
                    <div className="detailsBlock-3">
                        <h1>{`₹${product.price}`}</h1>
                        <div className="detailsBlock-3-1">
                            <div className="detailsBlock-3-1-1">
                                <button onClick={decreaseQuantity}>-</button>
                                {/* <input readOnly type="number" value={quantity} /> */}
                                    <span>{quantity}</span>
                                <button onClick={increaseQuantity}>+</button>
                            </div>
                            <button
                                disabled={product.quantity < 1 ? true : false}
                                onClick={addToCartHandler}
                            >
                                Add to Cart
                            </button>
                        </div>

                        <p>
                            Status:
                            <b className={product.quantity < 1 ? "redColor" : "greenColor"}>
                                {product.quantity < 1 ? "OutOfStock" : "InStock"}
                            </b>
                        </p>
                    </div>

                    <div className="detailsBlock-4">
                        Description : <p>{product.description}</p>
                    </div>

                    <button onClick={submitReviewToggle} className="submitReview">
                        Submit Review
                    </button>
                </div>
            </div>


            <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>



            <h3 className="reviewsHeading">REVIEWS</h3>

            {product.reviews && product.reviews[0] ? (
                <div className="reviews">
                    {product.reviews &&
                        product.reviews.map((review) => (
                            <ReviewCard key={review._id} review={review} />
                        ))}
                </div>
            ) : (
                <p className="noReviews">No Reviews Yet</p>
            )}
        </Layout>
    )
}
