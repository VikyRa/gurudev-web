import React from 'react';
import OwlCarousel from 'react-owl-carousel2';
import { gernateImages } from '../../../urlConfig';

/**
* @author
* @function Carousel
**/

export const Carousel = (props) => {
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
        <OwlCarousel options={options}  >
            {props.children}
        </OwlCarousel>

    )

}