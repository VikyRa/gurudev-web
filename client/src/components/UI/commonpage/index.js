import React from 'react';
import { Route, NavLink, Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel2';
import { gernateImages } from '../../../urlConfig';
import { Carousel } from '../Carousel';


/**
* @author
* @function Carousel
**/

export const Commonpage = (props) => {
    const options = {
        loop: true,
        margin: 10,
        autoplay: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 4
            }
        }
    };

    return (
        <>
            <div className="team pt-5 pb-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h2>Our <strong>Astrologers</strong></h2>
                            <p>500+ best astrologers from india for online consultation</p>
                        </div>
                        <div className="col-md-3 member text-center">
                            <div className="box">
                                <img src="assets/images/di.jpg" className="img-fluid" alt="" title="" />
                                <p>Akash</p>
                                <div className="main-bg">
                                    <p className="phone"><i className="fa fa-phone"></i></p>
                                    <p className="message"><i className="fa fa-envelope"></i></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 member text-center">
                            <div className="box">
                                <img src="assets/images/di.jpg" className="img-fluid" alt="" title="" />
                                <p>Akash</p>
                                <p className="phone"><i className="fa fa-phone"></i></p>
                                <p className="message"><i className="fa fa-envelope"></i></p>
                            </div>
                        </div>
                        <div className="col-md-3 member text-center">
                            <div className="box">
                                <img src="assets/images/di.jpg" className="img-fluid" alt="" title="" />
                                <p>Akash</p>
                                <p className="phone"><i className="fa fa-phone"></i></p>
                                <p className="message"><i className="fa fa-envelope"></i></p>
                            </div>
                        </div>
                        <div className="col-md-3 member text-center">
                            <div className="box">
                                <img src="assets/images/di.jpg" className="img-fluid" alt="" title="" />
                                <p>Akash</p>
                                <p className="phone"><i className="fa fa-phone"></i></p>
                                <p className="message"><i className="fa fa-envelope"></i></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* client reviw code start */}

            <div className="client pt-5 pb-5 bg-light">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h2>Hear from <strong>our clients</strong></h2>
                            <p>Top Astrologers. 24*7 Customer Support. happy to help</p>
                        </div>
                        <div className="col-12">
                            <Carousel>
                                {
                                    props.review ? props.review.map((reviews) => (
                                        <div className="item" key={reviews._id}>
                                            <div className="bg-main">
                                                <p className="comment">{reviews.description}</p>
                                                <p className="name">{reviews.name}</p>
                                                <p className="date">12 Nov 2020</p>
                                            </div>
                                        </div>
                                    )) : null
                                }

                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
            {/* client review code stop */}



            {/* BLOG SECTION START */}
            <div className="blog pt-5 pb-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h2>Latest <strong>From Blog</strong></h2>
                            <p>Top Astrologers. 24*7 Customer Support. happy to help</p>
                        </div>
                        {
                            props.blog && props.blog.map((blogs) => (
                                <div className="col-md-4 mb-2">
                                    <div className="box cardblog">
                                        <img src={gernateImages(blogs.thumbnail)} alt={blogs.title} title={blogs.title} className="img-fluid blogimg" />
                                        <div className="p-3 text-center">
                                            <p className="desc">{blogs.short_content.slice(0, 200)}</p>
                                            <p className="link mb-1"><Link to={`blog/${blogs.slug}`}>Read More</Link></p>
                                            <p className="name">{blogs.title}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                </div>
            </div>

            {/* BLOG SECTION STOP */}
           

        </>
    )

}