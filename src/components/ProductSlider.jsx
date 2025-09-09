
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import { Link } from 'react-router-dom';




export default function ProductSlider({ data, maincategory }) {
    let sliderOptions = {

        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,

        },
        Pagination: {
            clickable: true,
        },
        spaceBetween: 30,
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
    return (
        <>


            < div className="container-fluid blog pb-3" >
                <div className="container pb-3">
                    <div className="text-center mx-auto pb-3 wow fadeInUp" data-wow-delay="0.2s" style={{ maxWidth: "800px" }}>
                        <h4 className="text-primary">{maincategory === "Related Products" ? "Related Products" : `Our Latest Products of${maincategory}`}</h4>
                        <h1 className="display-5 mb-4">Articles For Pro Traders</h1>
                        <p className="mb-0">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur adipisci facilis cupiditate recusandae aperiam temporibus corporis itaque quis facere, numquam, ad culpa deserunt sint dolorem autem obcaecati, ipsam mollitia hic.
                        </p>
                    </div>
                    <div className=" blog-carousel wow fadeInUp" data-wow-delay="0.2s">
                        <Swiper {...sliderOptions} className="mySwiper">
                            {
                                data.map(item => {
                                    return <SwiperSlide key={item.id}>
                                        <div className="service-item">
                                            <div className="service-img">
                                                <img src={`${import.meta.env.VITE_SITE_BACKEND_SERVER}${item.pic[0]}`} height={250} className="rounded-top w-100" alt="Image" />
                                            </div>
                                            <div className='btn-group w-100'>
                                                <h6 className='bg-primary text-center w-50 p-2 text-light'> {item.brand}</h6>
                                                <h6 className='bg-primary text-center w-50 p-2 text-light'> {item.stockQuantity} Left In Stock</h6>
                                            </div>
                                            <div className="rounded-bottom p-4">
                                                <Link to={`/Product/${item.id}`} className="h4 d-inline-block mb-4 text-center">{item.name}</Link>
                                                <p className="mb-4"><del className='text-danger'>&#8377;{item.basePrice}</del><span className='fs-5'>&#8377;{item.finalPrice}</span><sup className='fs-5'>{item.discount}%Off</sup></p>
                                                <Link className="btn btn-primary rounded-pill py-2 px-4 w-100" to={`/Product/${item.id}`}>Add to Cart</Link>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                })
                            }
                        </Swiper>
                    </div>
                </div>
            </div >


        </>
    )
}
