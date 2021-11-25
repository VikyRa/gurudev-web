import React from 'react';
import '../../../App.css';
import OwlCarousel from 'react-owl-carousel2';
import { gernateImages } from '../../../urlConfig';
/**
* @author
* @function Banner
**/
const options = {
    loop: true,
    items: 1,
    autoplay: true,
    autoplayTimeout: 1000,
};

const CommonBanner = (props) => {
    return (
        <>
            <div className="about-inner">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 p-0">
                            <div className="inner-page">
                                <div className="item"  style={{ backgroundImage: `url(${'/assets/images/inner.jpg'})` }}>
                                    <h2 className="text-center">{props.value}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )

}

export default CommonBanner