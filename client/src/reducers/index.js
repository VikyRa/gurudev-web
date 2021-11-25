
import { combineReducers } from 'redux';
import { updateAstrologerReducer,singleAstrologerReducer, listAstrolorReducer } from './astrologer/astrologerReducer';
import { getabouteducer, getmisionReducer, getvisionReducer } from './page/aboutreducers';
import bannerreducers from './page/bannerreducers';
import { bloglistCategoryReducer, blogslistReducer, getsingleblogReducer } from './page/blog.reducers';
import { cartReducer } from './page/cartReducer';
import { listCategoryReducer } from './page/category.reducers';
import { createContactReducer } from './page/contactreducer';
import { createReviewReducer, getBlogReducer, getMallReducer, getReviewReducer,getwebsettingReducer } from './page/homereducers';
import { getProductReducer, newReviewReducer, productlistReducer } from './page/product.reducers';
import servicereducers from './page/servicereducers';
import { authuserReducer, listusersReducer } from './user/authReducer';



//importing reducers


const rootReducer = combineReducers({
//    HOME CODE START
    banner:bannerreducers,
    homeservice:servicereducers,
    homemall:getMallReducer,
    creview:createReviewReducer,
    review:getReviewReducer,
    hblog:getBlogReducer,
    setting:getwebsettingReducer,
    vision:getvisionReducer,
    mision:getmisionReducer,
    about:getabouteducer,
    ccontact:createContactReducer,
    product:productlistReducer,
    category:listCategoryReducer,
    signleproduct:getProductReducer,
    newCart:cartReducer,
    newReview:newReviewReducer,
    auth:authuserReducer,
    updateastrologer:updateAstrologerReducer,
    sastrologer:singleAstrologerReducer,
    // astrologer:listusersReducer,
    astrologer:listAstrolorReducer,
    blog:blogslistReducer,
    bcat:bloglistCategoryReducer,
    sblog:getsingleblogReducer,
    




    // dummy data

// HOME CODE STOP
});

export default rootReducer;