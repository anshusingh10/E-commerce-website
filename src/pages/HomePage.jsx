import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
import "swiper/css";
import About from '../components/About';
import Products from '../components/Products';
import Features from '../components/Features';
import ProductSlider from '../components/ProductSlider';
import Faqs from '../components/Faqs';
import Testimonials from '../components/Testimonial';
import { Link } from 'react-router-dom';

import { getSettings } from "../Redux/ActionCreators/SettingsActionCreators";

import { getProduct } from "../Redux/ActionCreators/ProductActionCreators";
import { getMaincategory } from "../Redux/ActionCreators/MainCategoryActionCreators";
import CategorySlider from '../components/CategorySlider';

export default function HomePage() {
    let [siteName, setSiteName] = useState(import.meta.env.VITE_SITE_NAME)



    let SettingsStateData = useSelector(state => state.SettingsStateData)
    let ProductStateData = useSelector(state => state.ProductStateData)
    let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
    let dispatch = useDispatch()
    let sliderOptions = {
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        modules: [Autoplay]
    }

    useEffect(() => {
        dispatch(getSettings())
        if (SettingsStateData.length) {
            setSiteName(SettingsStateData[0].siteName)
        }
    }, [SettingsStateData.length])
    useEffect(() => {
        dispatch(getProduct())

    }, [ProductStateData.length])

    useEffect(() => {
        dispatch(getMaincategory())

    }, [MaincategoryStateData.length])
    return (
        <>
            <div className="header-carousel">
                <Swiper className="mySwiper" {...sliderOptions}>
                    <SwiperSlide>
                        <div className="header-carousel-item">
                            <img src="/banner/banner-male.jpg" className="img-fluid w-100" alt="Image" />
                            <div className="carousel-caption">
                                <div className="container">
                                    <div className="row gy-0 gx-5">
                                        <div className="col-lg-0 col-xl-5"></div>
                                        <div className="col-xl-7 animated fadeInLeft">
                                            <div className="text-sm-center text-md-end">
                                                <h4 className="text-primary text-uppercase fw-bold mb-4">Welcome To {siteName}</h4>
                                                <h1 className="display-4 text-uppercase text-white mb-4">Style That Speaks for Him</h1>
                                                <p className="mb-5 fs-5">Discover premium men’s wear from Adidas, Mufti, and more—perfect for work, weekends, and everything in between.</p>
                                                <div className="d-flex justify-content-center justify-content-md-end flex-shrink-0 mb-4">
                                                    <Link className="btn btn-primary rounded-pill py-3 px-4 px-md-5 ms-2" to="/shop?mc=Male">Shop Now</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="header-carousel-item">
                            <img src="/banner/banner-female.jpg" className="img-fluid w-100" alt="Image" />
                            <div className="carousel-caption">
                                <div className="container">
                                    <div className="row gy-0 gx-5">
                                        <div className="col-lg-0 col-xl-5"></div>
                                        <div className="col-xl-7 animated fadeInLeft">
                                            <div className="text-sm-center text-md-end">
                                                <h4 className="text-primary text-uppercase fw-bold mb-4">Welcome To {siteName}</h4>
                                                <h1 className="display-4 text-uppercase text-white mb-4">Elegance, Comfort, Everyday Chic</h1>
                                                <p className="mb-5 fs-5">Explore trending outfits from top brands made for the modern woman—bold, beautiful, and effortlessly stylish.</p>
                                                <div className="d-flex justify-content-center justify-content-md-end flex-shrink-0 mb-4">
                                                    <Link className="btn btn-primary rounded-pill py-3 px-4 px-md-5 ms-2" to="/shop?mc=Female">Shop Now</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="header-carousel-item">
                            <img src="/banner/banner-kids.jpg" className="img-fluid w-100" alt="Image" />
                            <div className="carousel-caption">
                                <div className="container">
                                    <div className="row gy-0 gx-5">
                                        <div className="col-lg-0 col-xl-5"></div>
                                        <div className="col-xl-7 animated fadeInLeft">
                                            <div className="text-sm-center text-md-end">
                                                <h4 className="text-primary text-uppercase fw-bold mb-4">Welcome To {siteName}</h4>
                                                <h1 className="display-4 text-uppercase text-white mb-4">Little Looks, Big Style</h1>
                                                <p className="mb-5 fs-5">Dress your kids in comfy and colorful outfits from trusted brands—perfect for playtime, parties, and everything fun!</p>
                                                <div className="d-flex justify-content-center justify-content-md-end flex-shrink-0 mb-4">
                                                    <Link className="btn btn-primary rounded-pill py-3 px-4 px-md-5 ms-2" to="/shop?mc=Kids">Shop Now</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
            <CategorySlider title="Maincategory" />
            <Products data={ProductStateData?.filter(x => x.active).slice(0, 12) ?? []} />
            <About />
            <Features />
            {
                MaincategoryStateData?.filter(x => x.active).map(item => {
                    return <ProductSlider key={item.id} data={ProductStateData.filter(x => x.maincategory === item.name)} maincategory={item.name} />
                })

            }
            <CategorySlider title="Subcategory" />
            <Faqs />
            <Testimonials />
            <CategorySlider title="Brand" />
        </>
    )
}
