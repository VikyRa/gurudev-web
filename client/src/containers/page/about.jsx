import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bannerlist, getabout, servicelist } from '../../actions';
import Layout from '../../components/Layout';
import Banner from '../../components/UI/Banner';
import { gernateImages } from '../../urlConfig';
import { Carousel } from '../../components/UI/Carousel';
import { mallLlist, homebloglist, getwebinfo, getvision, getmision } from '../../actions';
import reviewlist from '../../actions/page/homeactions';
import { Link } from 'react-router-dom';
import './style.css';
import CommonBanner from '../../components/UI/Banner/cbanner';
import { Commonpage } from '../../components/UI/commonpage';

/**
* @author
* @function About
**/

export const About = (props) => {
    const dispatch = useDispatch();
    const { banner, loading, error, success } = useSelector((state) => state.banner);
    const { service } = useSelector((state) => state.homeservice);
    const { allmall } = useSelector((state) => state.homemall);
    const { review } = useSelector((state) => state.review);
    const { blog } = useSelector((state) => state.hblog);
    const { about } = useSelector((state) => state.about);
    const { vision } = useSelector((state) => state.vision);
    const { mision } = useSelector((state) => state.mision);

    useEffect(() => {
        dispatch(bannerlist());
        dispatch(mallLlist());
        dispatch(reviewlist());
        dispatch(servicelist('free'));
        dispatch(homebloglist());
        dispatch(getabout(1));
        dispatch(getvision(2));
        dispatch(getmision(3));
        // dispatch(getwebinfo(3));
    }, [dispatch]);
    return (
        <Layout title={`About Us`}>
            <CommonBanner value={`About Us`} />
            <div className="content pt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <img src={gernateImages(about.image)} className="img-fluid" alt="" title="" />
                        </div>
                        <div className="col-md-6">
                            <h2 className="pt-2 pb-2">About</h2>
                            <h2 className="pt-2 pb-2"><strong>{about.title}</strong></h2>
                            <p className="pt-2" dangerouslySetInnerHTML={{ __html: about.content }}></p>
                            {/* <p className="pb-2">
                                <ul>
                                    <li><i className="fa fa-chevron-right" aria-hidden="true"></i> Change in the volume of expected sales</li>
                                    <li><i className="fa fa-chevron-right" aria-hidden="true"></i> Change in the volume of expected sales</li>
                                    <li><i className="fa fa-chevron-right" aria-hidden="true"></i> Change in the volume of expected sales</li>
                                </ul>
                            </p> */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="vision pt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {
                                vision ? <>
                                    <h2>{vision.title}</h2>
                                    <p dangerouslySetInnerHTML={{ __html: vision.content }}></p></> : null
                            }

                        </div>
                    </div>
                </div>
            </div>

            <div className="mision pt-5 pb-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2>{mision ? mision.title : null}</h2>
                            {mision ? <p dangerouslySetInnerHTML={{ __html: mision.content }}></p> : null}
                        </div>
                    </div>
                </div>
            </div>

            <Commonpage review={review} blog={blog} />
        </Layout>
    )

}

