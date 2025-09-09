import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import { getTestimonial } from "../Redux/ActionCreators/TestimonialActionCreators"
// Removed the import of Testimonials to avoid naming conflict



export default function Testimonial() {
    let TestimonialStateData = useSelector(state => state.TestimonialStateData)
    let dispatch = useDispatch()

    let sliderOptions = {

        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,

        },
        pagination: {
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1,

            },
            768: {
                slidesPerView: 2,

            },
            1200: {
                slidesPerView: 3,

            },
        },
        modules: [Autoplay, FreeMode, Pagination]
    }
    useEffect(() => {
        dispatch(getTestimonial())
    }, [TestimonialStateData.length])

    return (


        <div className="container-fluid testimonial pb-5">
            <div className="container pb-5">
                <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style={{ maxWidth: "800px" }}>
                    <h4 className="text-primary">Testimonial</h4>
                    <h1 className="display-5 mb-4">Our Clients Riviews</h1>
                    <p className="mb-0">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur adipisci facilis cupiditate recusandae aperiam temporibus corporis itaque quis facere, numquam, ad culpa deserunt sint dolorem autem obcaecati, ipsam mollitia hic.
                    </p>
                </div>
                <div className=" testimonial-carousel wow fadeInUp" data-wow-delay="0.2s">
                    <Swiper {...sliderOptions} className="mySwiper">
                        {
                            TestimonialStateData.map(item => {
                                return <SwiperSlide key={item.id}>
                                    <div className="testimonial-item">
                                        <div className="testimonial-quote-left">
                                            <i className="fas fa-quote-left fa-2x"></i>
                                        </div>
                                        <div className="testimonial-img">
                                            <img src={`${import.meta.env.VITE_SITE_BACKEND_SERVER}${item.pic}`} className="img-fluid" alt="Image" />
                                        </div>
                                        <div className="testimonial-text">
                                            <p className="mb-0 testimonial-message2">{item.message}
                                            </p>
                                        </div>
                                        <h4 className="mb-0 ">{item.name}</h4>
                                        <div className="testimonial-title">
                                            <div>
                                                <h4 className="mb-0">{item.name}</h4>

                                            </div>
                                            <div className="d-flex text-primary">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                            </div>
                                        </div>
                                        <div className="testimonial-quote-right">
                                            <i className="fas fa-quote-right fa-2x"></i>
                                        </div>
                                    </div>
                                </SwiperSlide>

                            })
                        }
                    </Swiper>
                </div>
            </div>
        </div>
    )
}
