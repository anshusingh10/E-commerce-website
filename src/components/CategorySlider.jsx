import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import { getMaincategory } from "../Redux/ActionCreators/MaincategoryActionCreators"
import { getSubcategory } from "../Redux/ActionCreators/SubcategoryActionCreators"
import { getBrand } from "../Redux/ActionCreators/BrandActionCreators"
import { Link } from 'react-router-dom';
// Removed the import of Maincategorys to avoid naming conflict



export default function CategorySlider({ title }) {
    let [data, setData] = useState([])
    let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
    let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
    let BrandStateData = useSelector(state => state.BrandStateData)
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
        spaceBetween: 20,
        breakpoints: {
            0: {
                slidesPerView: title === "Brand" ? 2 : 1,

            },
            768: {
                slidesPerView: title === "Brand" ? 4 : 2,

            },
            1200: {
                slidesPerView: title === "Brand" ? 6 : 3,

            },
        },
        modules: [Autoplay, FreeMode, Pagination]
    }
    useEffect(() => {
        dispatch(getMaincategory())
        if (MaincategoryStateData.length && title === "Maincategory") {
            setData(MaincategoryStateData.filter(x => x.active))
        }
    }, [MaincategoryStateData.length])

    useEffect(() => {
        dispatch(getSubcategory())
        if (SubcategoryStateData.length && title === "Subcategory") {
            setData(SubcategoryStateData.filter(x => x.active))
        }
    }, [SubcategoryStateData.length])

    useEffect(() => {
        dispatch(getBrand())
        if (BrandStateData.length && title === "Brand") {
            setData(BrandStateData.filter(x => x.active))
        }
    }, [BrandStateData.length])

    return (


        <div className="container-fluid Maincategory pb-5">
            <div className="container pt-5">

                <div className=" testimonial-carousel wow fadeInUp" data-wow-delay="0.2s">
                    <Swiper {...sliderOptions} className="mySwiper">
                        {
                            data.map(item => {
                                return <SwiperSlide key={item.id}>

                                    <Link to={`/shop?${title==="Maincategory"?"mc":title==="subcategory"?"sc":"br"}=${item.name}`}>
                                        <img src={`${import.meta.env.VITE_SITE_BACKEND_SERVER}${item.pic}`} style={{ height: title === "Brand" ? 100 : 200, margin: "auto" }} className="w-100" />
                                        <h5 className='text-center p-2'>{item.name}</h5>
                                    </Link>

                                </SwiperSlide>

                            })
                        }
                    </Swiper>
                </div>
            </div>
        </div>
    )
}
