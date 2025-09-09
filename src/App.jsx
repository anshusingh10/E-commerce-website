import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ShopPage from './pages/ShopPage'
import FeaturesPage from './pages/FeaturesPage'
import FaqsPage from './pages/FaqsPage'
import TestimonialPage from './pages/TestimonialPage'
import ContactusPage from './pages/ContactusPage'
import ErrorPage from './pages/ErrorPage'
import AdminMaincategoryPage from './pages/Admin/Maincategory/AdminMaincategoryPage'
import AdminCreateMaincategoryPage from './pages/Admin/Maincategory/AdminCreateMaincategoryPage';
import AdminUpdateMaincategoryPage from './pages/Admin/Maincategory/AdminUpdateMaincategoryPage'
import AdminHomePage from './pages/Admin/AdminHomePage'
import AdminSubcategoryPage from './pages/Admin/Subcategory/AdminSubcategoryPage'
import AdminCreateSubcategoryPage from './pages/Admin/Subcategory/AdminCreateSubcategoryPage';
import AdminUpdateSubcategoryPage from './pages/Admin/Subcategory/AdminUpdateSubcategoryPage';
import AdminBrandPage from './pages/Admin/Brand/AdminBrandPage'
import AdminCreateBrandPage from './pages/Admin/Brand/AdminCreateBrandPage'
import AdminUpdateBrandPage from './pages/Admin/Brand/AdminUpdateBrandPage'
import AdminCreateTestimonialPage from './pages/Admin/Testimonial/AdminCreateTestimonialPage';
import AdminUpdateTestimonialPage from './pages/Admin/Testimonial/AdminUpdateTestimonialPage';
import AdminTestimonialPage from './pages/Admin/Testimonial/AdminTestimonialPage'
import AdminFeaturePage from './pages/Admin/Feature/AdminFeaturePage'
import AdminCreateFeaturePage from './pages/Admin/Feature/AdminCreateFeaturePage'
import AdminupdateFeaturePage from './pages/Admin/Feature/AdminUpdateFeaturePage'
import AdminFaqPage from './pages/Admin/Faq/AdminFaqPage'
import AdminCreateFaqPage from './pages/Admin/Faq/AdminCreateFaqPage'
import AdminupdateFaqPage from './pages/Admin/Faq/AdminUpdateFaqPage';
import AdminSettingsPage from './pages/Admin/Settings/AdminSettingsPage'
import AdminProductPage from './pages/Admin/Product/AdminProductPage'
import AdminCreateProductPage from './pages/Admin/Product/AdminCreateProductPage'
import AdminUpdateProductPage from './pages/Admin/Product/AdminUpdateProductPage'
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import ProductPage from './pages/ProductPage';
import UpdateProfilePage from './pages/UpdateProfilePage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import ConfirmationPage from './pages/ConfirmationPage'


import AdminNewsletterPage from './pages/Admin/Newsletter/AdminNewsletterPage'
import AdminContactUsShowPage from './pages/Admin/ContactUs/AdminContactUsShowPage'
import AdminContactUsPage from './pages/Admin/ContactUs/AdminContactUsPage'
import AdminCheckoutPage from './pages/Admin/Checkout/AdminCheckoutPage'
import AdminCheckoutShowPage from './pages/Admin/Checkout/AdminCheckoutShowPage'
import AdminUserPage from './pages/Admin/User/AdminUserPage';
import AdminCreateUserPage from './pages/Admin/User/AdminCreateUserPage'
import AdminupdateuserPage from './pages/Admin/User/AdminUpdateUserPage';














export default function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='' element={<HomePage />} />
                <Route path='/about' element={<AboutPage />} />
                <Route path='/shop' element={<ShopPage />} />
                <Route path='/features' element={<FeaturesPage />} />
                <Route path='/faqs' element={<FaqsPage />} />
                <Route path='/testimonials' element={<TestimonialPage />} />
                <Route path='/contactus' element={<ContactusPage />} />
                <Route path='/product/:id' element={<ProductPage />} />
                <Route path='/signup' element={<SignupPage />} />
                <Route path='/login' element={<LoginPage />} />

                {/*Buyer Routes*/}
                {
                    localStorage.getItem("login") ?
                        <>
                            <Route path='/profile' element={<ProfilePage />} />
                            <Route path='/update-Profile' element={<UpdateProfilePage />} />
                            <Route path='/cart' element={<CartPage />} />
                            <Route path='/checkout' element={<CheckoutPage />} />
                            <Route path='/confirmation' element={<ConfirmationPage />} />
                        </> : null
                }

                {/* Admin Routes */}
                {localStorage.getItem("login") && localStorage.getItem("role") !== "Buyer" ?
                    <>
                        <Route path='/admin' element={<AdminHomePage />} />

                        <Route path='/admin/maincategory' element={<AdminMaincategoryPage />} />
                        <Route path='/admin/maincategory/create' element={<AdminCreateMaincategoryPage />} />
                        <Route path='/admin/maincategory/Update/:id' element={<AdminUpdateMaincategoryPage />} />


                        <Route path='/admin/subcategory' element={<AdminSubcategoryPage />} />
                        <Route path='/admin/subcategory/create' element={<AdminCreateSubcategoryPage />} />
                        <Route path='/admin/subcategory/Update/:id' element={<AdminUpdateSubcategoryPage />} />

                        <Route path='/admin/brand' element={<AdminBrandPage />} />
                        <Route path='/admin/brand/create' element={<AdminCreateBrandPage />} />
                        <Route path='/admin/brand/Update/:id' element={<AdminUpdateBrandPage />} />

                        <Route path='/admin/testimonial' element={<AdminTestimonialPage />} />
                        <Route path='/admin/testimonial/create' element={<AdminCreateTestimonialPage />} />
                        <Route path='/admin/testimonial/Update/:id' element={<AdminUpdateTestimonialPage />} />

                        <Route path='/admin/feature' element={<AdminFeaturePage />} />
                        <Route path='/admin/feature/create' element={<AdminCreateFeaturePage />} />
                        <Route path='/admin/feature/Update/:id' element={<AdminupdateFeaturePage />} />

                        <Route path='/admin/faq' element={<AdminFaqPage />} />
                        <Route path='/admin/faq/create' element={<AdminCreateFaqPage />} />
                        <Route path='/admin/faq/Update/:id' element={<AdminupdateFaqPage />} />


                        <Route path='/admin/settings' element={<AdminSettingsPage />} />
                        <Route path='/admin/newsletter' element={<AdminNewsletterPage />} />


                        <Route path='/admin/contactus' element={<AdminContactUsPage />} />
                        <Route path='/admin/contactus/show/:id' element={<AdminContactUsShowPage />} />


                        <Route path='/admin/checkout' element={<AdminCheckoutPage />} />
                        <Route path='/admin/checkout/Show/:id' element={<AdminCheckoutShowPage />} />

                        <Route path='/admin/product' element={<AdminProductPage />} />
                        <Route path='/admin/product/create' element={<AdminCreateProductPage />} />
                        <Route path='/admin/product/Update/:id' element={<AdminUpdateProductPage />} />

                        <Route path='/admin/user' element={<AdminUserPage />} />
                        <Route path='/admin/user/create' element={<AdminCreateUserPage />} />
                        <Route path='/admin/user/Update/:id' element={<AdminupdateuserPage />} />


                    </> : null
                }
                <Route path='/*' element={<ErrorPage />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}
