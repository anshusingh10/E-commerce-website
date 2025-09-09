
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Breadcrum from '../components/Breadcrum'
import Profile from '../components/Profile'

import { Link } from 'react-router-dom'
import Cart from '../components/Cart'
import { getWishlist, deleteWishlist } from "../Redux/ActionCreators/WishlistActionCreators"
import { getCheckout } from "../Redux/ActionCreators/CheckoutActionCreators"

export default function ProfilePage() {
  let [wishlist, setWishlist] = useState([])
  let [orders, setOrders] = useState([])

  let WishlistStateData = useSelector(state => state.WishlistStateData)
  let CheckoutStateData = useSelector(state => state.CheckoutStateData)
  let dispatch = useDispatch()

  function deleteItem(id) {
    if (confirm("Are You Sure to Remove that Item from Wishlist")) {

      dispatch(deleteWishlist({ id: id }))
      getWishlistAPIData()
    }
  }

  function getWishlistAPIData() {
    dispatch(getWishlist())
    if (WishlistStateData.length)
      setWishlist(WishlistStateData.filter(x => x.user === localStorage.getItem("userid")))
    else
      setWishlist([])

  }
  useEffect(() => {
    getWishlistAPIData()
  }, [WishlistStateData])

  useEffect(() => {
    (() => {
      dispatch(getCheckout())
      if (CheckoutStateData.length) {
        setOrders(CheckoutStateData.filter(x => x.user === localStorage.getItem("userid")))
      }
    })()
  }, [CheckoutStateData.length])

  return (
    <>
      <Breadcrum title="Your Profile" />

      <div className="container my-3">
        <Profile title="Buyer" />
        <h5 className='bg-primary text-center p-2 text-light'>Wishlist Section</h5>
        {
          wishlist.length ?
            <>
              <div className="table-responsive">
                <table className='table table-bordered table-striped table-hover'>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Name</th>
                      <th>Brand</th>
                      <th>Color</th>
                      <th>Size</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      wishlist.map(item => (
                        <tr key={item.id}>
                          <td>
                            <Link to={`${import.meta.env.VITE_SITE_BACKEND_SERVER}${item.pic}`} target='_blank' rel='noreferrer'></Link>
                            <img src={`${import.meta.env.VITE_SITE_BACKEND_SERVER}${item.pic}`} height={80} width={100} />
                          </td>import AdminCheckoutPage from './Admin/Checkout/AdminCheckoutPage';
                          import Cart from './../components/Cart';

                          <td>{item.name}</td>
                          <td>{item.brand}</td>
                          <td>{item.color}</td>
                          <td>{item.size}</td>
                          <td>&#8377;{item.price}</td>
                          <td>{`${item.stockQuantity ? item.stockQuantity + ' Left in stock' : 'out of stock'}`}</td>
                          <td><Link to={`/product/${item.product}`} className='btn btn-primary'><i className='fa fa-shopping-cart'></i></Link></td>
                          <td><button className='btn btn-danger' onClick={() => deleteItem(item.id)}><i className='fa fa-trash'></i></button></td>
                        </tr>
                      ))
                    }

                  </tbody>
                </table>
              </div>
            </> :
            <div className='text-center my-2'>
              <h3> No Items in Wishlist</h3>
              <Link to="/shop" className='btn btn-primary'>Shop Now</Link>

            </div>
        }

        <h5 className='bg-primary text-center p-2 text-light'>Order History Section</h5>
        {
          orders.length ?
            orders.map((item) => {
              return <div className='row mb-3' key={item.id}>
                <div className="col-md-4">
                  <div className="table-responsive">
                    <table className='table table-bordered'>
                      <tbody>
                        <tr>
                          <th>Order Id</th>
                          <td>{item.id}</td>
                        </tr>
                        <tr>
                          <th>Order Status</th>
                          <td>{item.orderStatus}</td>
                        </tr>
                        <tr>
                          <th>Payment Mode</th>
                          <td>{item.paymentMode}</td>
                        </tr>
                        <tr>
                          <th>Payment Status</th>
                          <td>{item.paymentStatus}</td>
                        </tr>
                        <tr>
                          <th>Subtotal</th>
                          <td>&#8377;{item.subtotal}</td>
                        </tr>
                        <tr>
                          <th>Shipping</th>
                          <td>&#8377;{item.shipping}</td>
                        </tr>
                        <tr>
                          <th>Total</th>
                          <td>&#8377;{item.total}</td>
                        </tr>
                        <tr>
                          <th>Date</th>
                          <td>{new Date(item.date).toLocaleString()}</td>
                        </tr>

                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="col-md-8">
                  <Cart title="Order"  data={item.products}/>
                </div>
              </div>
            }) :
            <div className='text-center my-2'>
              <h3> No Order History Found</h3>
              <Link to="/shop" className='btn btn-primary'>Shop Now</Link>

            </div>
        }
      </div >
    </>
  )
}
