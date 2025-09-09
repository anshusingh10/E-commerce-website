import { combineReducers } from "redux";

import MaincategoryReducer from "./MaincategoryReducer";
import SubcategoryReducer from "./SubcategoryReducer";
import BrandReducer from "./BrandReducer";
import TestimonialReducer from "./TestimonialReducer";
import ProductReducer from "./ProductReducer";
import FeatureReducer from "./FeatureReducer";
import FaqReducer from "./FaqReducer";
import SettingsReducer from "./SettingsReducer";

import UserReducer from './UserReducer';
import CartReducer from './CartReducer';
import WishlistReducer from "./WishlistReducer";
import CheckoutReducer from "./CheckoutReducer";
import NewsletterReducer from './NewsletterReducer';
import ContactUsReducer from './ContactUsReducer';



export default combineReducers({

    MaincategoryStateData: MaincategoryReducer,
    SubcategoryStateData: SubcategoryReducer,
    BrandStateData: BrandReducer,
    TestimonialStateData: TestimonialReducer,
    ProductStateData: ProductReducer,
    FeatureStateData: FeatureReducer,
    FaqStateData: FaqReducer,
    SettingsStateData: SettingsReducer,
    CartStateData: CartReducer,
    WishlistStateData: WishlistReducer,
    CheckoutStateData: CheckoutReducer,
    NewsletterStateData: NewsletterReducer,
    ContactUsStateData: ContactUsReducer,
    UserStateData: UserReducer,

})
