import { all } from "redux-saga/effects"
import maincategorySaga from "./MaincategorySagas"
import subcategorySaga from "./SubcategorySagas"
import brandSaga from "./BrandSagas"
import testimonialSaga from "./TestimonialSagas"
import productSaga from "./ProductSagas"
import featureSaga from "./FeatureSagas"
import faqSaga from "./FaqSagas"
import settingsSaga from "./SettingsSagas"
import cartSaga from "./CartSagas"
import wishlistSaga from "./WishlistSagas"
import checkoutSaga from "./CheckoutSagas"
import newsletterSaga from "./NewsletterSagas"
import contactUsSaga from "./ContactUsSagas"
import userSaga from "./UserSagas"


export default function* RootSaga() {
    yield all([
        maincategorySaga(),
        subcategorySaga(),
        brandSaga(),
        testimonialSaga(),
        productSaga(),
        featureSaga(),
        faqSaga(),
        settingsSaga(),
        cartSaga(),
        wishlistSaga(),
        checkoutSaga(),
        newsletterSaga(),
        contactUsSaga(),
        userSaga(),
    ])
}
