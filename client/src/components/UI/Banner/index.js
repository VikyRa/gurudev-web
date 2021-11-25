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

const Banner = (props) => {
    const banners = props.banner;
    return (
        <>
            <div className="banner">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 p-0">
                            <OwlCarousel options={options} className="owl-carousel owl-theme">
                                
                            {/* <div className="item" style={{ backgroundImage: `url(${'/assets/images/banner-1.jpg'})` }}></div> */}
                                {
                                    banners.map((items) => (
                                        <div key={items._id} className="item" style={{ backgroundImage: `url(${gernateImages(items.banner_image)})` }}></div>
                                    ))
                                }
                                
                                {/* </div> */}
                            </OwlCarousel>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )

}

export default Banner