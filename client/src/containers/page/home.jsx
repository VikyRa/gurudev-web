import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bannerlist, servicelist } from '../../actions';
import Layout from '../../components/Layout';
import Banner from '../../components/UI/Banner';
import { gernateImages } from '../../urlConfig';
import { Carousel } from '../../components/UI/Carousel';
import { mallLlist, homebloglist } from '../../actions';
import reviewlist from '../../actions/page/homeactions';
import { Link } from 'react-router-dom';
import './style.css';
import { Commonpage } from '../../components/UI/commonpage';

/**
* @author
* @function Home
**/

export const Home = (props) => {
    const dispatch = useDispatch();
    const { banner, loading, error, success } = useSelector((state) => state.banner);
    const { service } = useSelector((state) => state.homeservice);
    const { allmall } = useSelector((state) => state.homemall);
    const { review } = useSelector((state) => state.review);
    const { blog } = useSelector((state) => state.hblog);

    useEffect(() => {
        dispatch(bannerlist());
        dispatch(mallLlist());
        dispatch(reviewlist());
        dispatch(servicelist('free'));
        dispatch(homebloglist());
    }, [dispatch]);
    return (
        <Layout title={`Alo`}>
            <Banner banner={banner} />

            <div className="feature pt-5 pb-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-sm-6 col-6">
                            <div className="shadow text-center">
                                <img src="assets/images/2.png" />
                                <h4><a href="talk-to-astrologer.html">Talk to Astrologer</a></h4>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6 col-6">
                            <div className="shadow text-center">
                                <img src="assets/images/3.png" />
                                <h4><a href="#">Live on Astro TV</a></h4>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6 col-12">
                            <div className="shadow text-center">
                                <img src="assets/images/4.png" />
                                <h4><a href="#">Shop at ALO Mall</a></h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="course pb-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h2>Free Service</h2>
                            <h3>Complimentary Services</h3>
                        </div>
                        <div className="col-12">

                            <Carousel>
                                {
                                    service.map((item) => (
                                        <div className="item" key={item._id}>
                                            <div className="shadow bg-white text-center">
                                                <img src={gernateImages(item.service_image)} className="img-fluid" alt={item.service_name.toUpperCase()} title="" />
                                                <h5>{item.service_name.toUpperCase()}</h5>
                                                <p>{item.short_description} </p>
                                            </div>
                                        </div>

                                    ))
                                }
                            </Carousel>

                        </div>
                        <div className="col-12 course-bottom">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="shadow text-center">
                                        <h4>About Us</h4>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                                        <p className="mb-0"><a href="#">Read More</a></p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="shadow text-center active">
                                        <h4>Value For Money</h4>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                                        <p className="mb-0"><a href="#">Read More</a></p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="shadow text-center">
                                        <h4>Since 2003</h4>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                                        <p className="mb-0"><a href="#">Read More</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* MESSAGE FOR THE CEO CODE START */}
            <div className="learn">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h2>Message <strong>from the Ceo</strong></h2>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                            <p className="mb-0"><strong>Naveen Verma</strong></p>
                        </div>
                    </div>
                </div>
            </div>
            {/* MESSAGE FOR THE CODE CODE STOP */}


            {/* ALO MALL CODE START */}
            <div className="explore pt-5 pb-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h2>Explore <strong>ALO Mall</strong></h2>
                            <p>Have Your Astro Store</p>
                        </div>
                        {
                            allmall && allmall.map((pro) => (
                                <div className="col-md-3 col-sm-6 col-6 mt-4 text-center" key={pro._id}>
                                    <div className="box">
                                        <img src={gernateImages(pro.productPictures)} className="img-fluid" alt="" title="" />
                                        <p>{pro.name}</p>
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                </div>
            </div>
            {/* ALO MALL CODE STOP */}




            <div className="news pb-5">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 main text-center">
                            <h2>Astrotalk <strong>in news</strong></h2>
                            <p>our success stories in media headlines and lots of encouragement</p>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-12 pt-3">
                            <Carousel>
                                <div className="item">
                                    <img src="assets/images/l.png" className="img-fluid" alt="" title="" />
                                </div>
                                <div className="item">
                                    <img src="assets/images/l-1.png" className="img-fluid" alt="" title="" />
                                </div>
                                <div className="item">
                                    <img src="assets/images/l-2.png" className="img-fluid" alt="" title="" />
                                </div>
                                <div className="item">
                                    <img src="assets/images/l-3.png" className="img-fluid" alt="" title="" />
                                </div>
                                <div className="item">
                                    <img src="assets/images/l-4.png" className="img-fluid" alt="" title="" />
                                </div>
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>


            <Commonpage review={review} blog={blog} />
        </Layout>
    )

}

