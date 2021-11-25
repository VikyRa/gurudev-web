import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bannerlist, createContactAction, getabout, listastrologer, servicelist } from '../../actions';
import Layout from '../../components/Layout';
import Banner from '../../components/UI/Banner';
import { gernateImages } from '../../urlConfig';
import { Carousel } from '../../components/UI/Carousel';

import { mallLlist, homebloglist, getwebinfo, getvision, getmision } from '../../actions';
import reviewlist from '../../actions/page/homeactions';
import { Link } from 'react-router-dom';
import validator from 'validator';
import CommonBanner from '../../components/UI/Banner/cbanner';
import { Commonpage } from '../../components/UI/commonpage';
import { useAlert } from "react-alert";
import image from '../../image/di.jpg'
import { Redirect } from 'react-router';
import { useCreateChat } from '../../services/chatService';

/**
* @author
* @function AstrologerList
**/

export const AstrologerList = (props) => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const { user, token, role, isAuthenticated } = useSelector(state => state.auth);
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 2500000000]);
    const [categorys, setCategory] = useState("");

    const [ratings, setRatings] = useState(0);
    const {
        astrologers,
        loading,
        error,
        astrologerCount,
        resultPerPage,
        message,
        filteredAstrologerCount } = useSelector((state) => state.astrologer);
    const createChat = useCreateChat();

    const handleClick = (user) => {
        createChat(user).then((results) => {
            // setConversation(results);
            // setSelectedTab(0);
            // setSelected(results._id);
            console.log('jell');
            return props.history.push('/chats');
        });
        // console.log('5');
    };

    const keyword = props.match.params.keyword;

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    };

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    };
    let count = filteredAstrologerCount;

    useEffect(() => {
        dispatch(listastrologer(keyword, currentPage, price, ratings));
    }, [dispatch, keyword, currentPage, price, ratings, alert, error]);




    return (
        <Layout title={`Astrologer List`}>
            <div className="chat pt-5 pb-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12 mb-3">
                            <div className="row text-center">
                                <div className="col-md-4">
                                    <input type="text" placeholder="Chat with Astrologer" className="form-control" />
                                </div>
                                <div className="col-md-3">Available Balance: Rs 0</div>
                                <div className="col-md-1">Recharge</div>
                                <div className="col-md-1">Filter</div>
                                <div className="col-md-1">Sort By</div>
                                <div className="col-md-2">Search Name</div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="row">
                                {

                                    astrologers ? astrologers.map((item, index) => (
                                        <div className="col-md-4 text-center" key={item._id}>
                                            <div className="chat-box text-center">
                                                <img src={item.profilePicture ? gernateImages(item.profilePicture) : image} className="img-fluid" alt="" title="" />
                                                <p className="mb-2"><i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i></p>
                                                <p className="mb-2"><strong>{`${item.first_name} ${item.last_name}`} (Exp: {item.experience ? item.experience : `0`} years)</strong></p>
                                                <p className="mb-2">{item.primary_skills}</p>
                                                <p className="mb-2">{item.language}</p>
                                                <p className="mb-2"><strong>&#8377; {item.price ? item.price : 0}/min</strong></p>
                                                {
                                                    isAuthenticated ? <>
                                                        <button type="button" onClick={() => handleClick(item)} className="btn btn-md btn-outline-primary">Chat</button>
                                                        <button type="submit" className="btn btn-md btn-outline-primary">Call</button>
                                                    </> : <p>
                                                        <Link to={`/user/login`} className="btn btn-md btn-outline-primary">Chat</Link>
                                                        <Link to={`/user/login`} className="btn btn-md btn-outline-primary">Call</Link>
                                                    </p>
                                                }

                                            </div>
                                        </div>
                                    )) : <div className="col-md-12 text-center">
                                        <h3 className="text-center">No Records Founds</h3>
                                    </div>
                                }
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </Layout>
    )
}
