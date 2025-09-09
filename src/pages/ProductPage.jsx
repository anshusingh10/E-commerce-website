import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Breadcrum from '../components/Breadcrum'
import { getProduct } from '../Redux/ActionCreators/ProductActionCreators'
import { getCart, createCart } from '../Redux/ActionCreators/CartActionCreators'

import { getWishlist, createWishlist } from '../Redux/ActionCreators/WishlistActionCreators'

import ProductSlider from '../components/ProductSlider'

export default function ProductPage() {
    let { id } = useParams()
    let [qty, setQty] = useState(1)
    let [product, setProduct] = useState({})
    let [relatedProducts, setRelatedProducts] = useState([])

    let ProductStateData = useSelector(state => state.ProductStateData)
    let CartStateData = useSelector(state => state.CartStateData)
    let WishlistStateData = useSelector(state => state.WishlistStateData)

    let dispatch = useDispatch()
    let navigate = useNavigate()
    function addToCart() {

        let item = CartStateData.find(x => x.product === product.id && x.user === localStorage.getItem("userid"))
        if (!item) {
            let item = {
                user: localStorage.getItem("userid"),
                product: product.id,
                name: product.name,                     //remove in case of real backend
                brand: product.brand,                   //remove in case of real backend
                color: product.color,                   //remove in case of real backend
                size: product.size,                     //remove in case of real backend
                stockQuantity: product.stockQuantity,   //remove in case of real backend
                price: product.finalPrice,              //remove in case of real backend
                pic: product.pic[0],                    //remove in case of real backend
                qty: qty,
                total: qty * product.finalPrice

            }
            dispatch(createCart(item))
        }
        navigate("/cart")



    }
function addToWishlist(){
    let item = WishlistStateData.find(x => x.product === product.id && x.user === localStorage.getItem("userid"))
    if (!item) {
        let item = {
            user: localStorage.getItem("userid"),
            product: product.id,
            name: product.name,                             //remove in case of real backend
            brand: product.brand,                           //remove in case of real backend
            color: product.color,                           //remove in case of real backend
            size: product.size,                             //remove in case of real backend
            stockQuantity: product.stockQuantity,            //remove in case of real backend
            price: product.finalPrice,                      //remove in case of real backend
            pic: product.pic[0],                            //remove in case of real backend


        }
        dispatch(createWishlist(item))
    }
    navigate("/profile")

}




useEffect(() => {
    (() => {
        dispatch(getProduct())
        if (ProductStateData.length) {
            let item = ProductStateData.find(x => x.id === id)
            if (item) {
                setProduct(item)
                setRelatedProducts(ProductStateData.filter(x => x.maincategory === item.maincategory))
            } else {
                navigate("/shop")
            }
        }
    })()
}, [ProductStateData.length, id])

useEffect(() => {
    (() => dispatch(getCart()))()

}, [CartStateData.length])

useEffect(() => {
    (() => dispatch(getWishlist()))()

}, [WishlistStateData.length])


return (
    <>
        <Breadcrum title={product.name ?? ""} />
        <div className="container-fluid my-3">
            <div className="row">
                <div className="col-md-6 mb-3">
                    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-indicators">
                            {
                                product.pic?.map((x, index) => {
                                    return <button key={index} type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} className={`${index === 0 ? "active" : ""}`} aria-current="true" aria-label={`Slide ${index + 1}`}></button>
                                })
                            }
                        </div>
                        <div className="carousel-inner">
                            {
                                product.pic?.map((x, index) => {
                                    return <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                                        <img src={`${import.meta.env.VITE_SITE_BACKEND_SERVER}${x}`} style={{ height: 500 }} className="d-block w-100" alt="..." />
                                    </div>
                                })
                            }
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                    <div className='d-flex'>
                        {
                            product.pic?.map((x, index) => {
                                return (
                                    <img
                                        src={`${import.meta.env.VITE_SITE_BACKEND_SERVER}${x}`}
                                        style={{ height: 100, width: 100 }}
                                        data-bs-target="#carouselExampleIndicators"
                                        data-bs-slide-to={index}
                                        key={index}
                                        aria-current="true"
                                        aria-label={`Slide ${index + 1}`}
                                        className={`d-block w-100 m-1 ${index === 0 ? 'active' : ''}`}
                                        alt="..."
                                    />
                                )
                            })
                        }

                    </div>
                </div>

                <div className="col-md-6 mb-3">
                    <table className='table table-bordered'>
                        <tbody>
                            <tr>
                                <th className='bg-primary text-center p-2 text-light' colSpan={2}>{product.name}</th>
                            </tr>
                            <tr>
                                <th>Maincategory</th>
                                <td>{product.maincategory}</td>
                            </tr>
                            <tr>
                                <th>Subcategory</th>
                                <td>{product.subcategory}</td>
                            </tr>
                            <tr>
                                <th>Brand</th>
                                <td>{product.brand}</td>
                            </tr>
                            <tr>
                                <th>Color/Size</th>
                                <td>{product.color}/{product.size}</td>
                            </tr>
                            <tr>
                                <th>Stock</th>
                                <td>{product.stock ? `${product.stockQuantity} left in stock` : "out of stock"}</td>
                            </tr>
                            <tr>
                                <th>Price</th>
                                <td>
                                    <del className='text-danger'>&#8377;{product.basePrice}</del>
                                    <span className='fs-4'>&#8377;{product.finalPrice}</span>
                                    <sup className='fs-5'>{product.discount}%Off</sup>
                                </td>
                            </tr>
                            <tr>
                                <th colSpan={2}>
                                    {
                                        product.stock ?
                                            <div className="row">
                                                <div className="col-md-6 mb-3">
                                                    <div className="btn-group w-100">
                                                        <button className='btn btn-primary' onClick={() => qty > 1 ? setQty(qty - 1) : null}><i className="fa fa-minus"></i></button>
                                                        <h5 className='w-25 text-center'>{qty}</h5>
                                                        <button className='btn btn-primary' onClick={() => qty < product.stockQuantity ? setQty(qty + 1) : null}><i className="fa fa-plus"></i></button>

                                                    </div>
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <div className="btn-group w-100">
                                                        <button className="btn btn-primary" onClick={addToCart}><i className='fa fa-shopping-cart'>Add to Cart</i></button>
                                                        <button className="btn btn-success" onClick={addToWishlist}><i className='fa fa-heart'>Add to Wishlist</i></button>
                                                    </div>
                                                </div>
                                            </div> :
                                            <button className="btn btn-success w-100" onClick={addToWishlist}><i className='fa fa-heart'>Add to Wishlist</i></button>

                                    }
                                </th>
                            </tr>
                            <tr>
                                <th>Description</th>
                                <td><div dangerouslySetInnerHTML={{ __html: product.description }}></div></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <ProductSlider maincategory={"Related Products"} data={relatedProducts} />
        </div>
    </>
)
}
