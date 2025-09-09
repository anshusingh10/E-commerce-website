import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { deleteCart, getCart, updateCart } from "../Redux/ActionCreators/CartActionCreators"
import { createCheckout } from "../Redux/ActionCreators/CheckoutActionCreators"
import { getProduct, updateProduct } from "../Redux/ActionCreators/ProductActionCreators"


export default function Cart({ title, data }) {
  let [mode, setMode] = useState("COD")
  let [cart, setCart] = useState(data ?? [])
  let [total, setTotal] = useState(0)
  let [subtotal, setSubtotal] = useState(0)
  let [shipping, setShipping] = useState(0)

  let CartStateData = useSelector(state => state.CartStateData)
  let ProductStateData = useSelector(state => state.ProductStateData)
  let dispatch = useDispatch()
  let navigate = useNavigate()

  function placeOrder() {
    let item = {
      user: localStorage.getItem("userid"),
      orderStatus: "Order is Placed",
      paymentMode: mode,
      paymentStatus: "Pending",
      subtotal: subtotal,
      shipping: shipping,
      total: total,
      date: new Date(),
      products: cart

    }
    dispatch(createCheckout(item))
    cart.forEach(x => {
      let product = ProductStateData.find(p => p.id === x.product)
      product.stockQuantity = product.stockQuantity - x.qty
      product.stock = product.stockQuantity === 0 ? false : true
      dispatch(updateProduct({ ...product }))
      dispatch(deleteCart({ id: x.id }))
    })
    navigate("/confirmation")




  }

  function deleteItem(id) {
    if (confirm("Are You Sure to Remove that Item from Cart")) {

      dispatch(deleteCart({ id: id }))
      getAPIData()
    }
  }
  function updateItem(id, option) {
    let item = cart.find(x => x.id === id)
    let index = cart.findIndex(x => x.id === id)
    if (option === "dec" && item.qty === 1)
      return
    else if (option === "dec") {

      item['qty'] = item['qty'] - 1
      item['total'] = item['total'] - item['price']
    }
    else if (option === "inc" && item.qty < item.stockQuantity) {

      item['qty'] = item['qty'] + 1
      item['total'] = item['total'] + item['price']
    }
    dispatch(updateCart({ ...item }))
    cart[index].qty = item.qty
    cart[index].total = item.total
    calculation(cart)

  }
  function calculation(cart) {
    let subtotal = 0
    cart.forEach(item => subtotal += item.total)
    if (subtotal > 0 && subtotal < 1000) {
      setTotal(subtotal + 150)
      setShipping(150)
    }
    else {
      setTotal(subtotal)
      setShipping(0)

    }
    setSubtotal(subtotal)

  }

  function getAPIData() {
    dispatch(getCart())
    if (data)
      return
    if (CartStateData.length) {
      let cart = CartStateData.filter(x => x.user === localStorage.getItem("userid"))
      setCart(cart)
      calculation(cart)
    }
    else
      setCart([])
    calculation([])
  }
  useEffect(() => {
    getAPIData()
  }, [CartStateData.length])

  useEffect(() => {
    (() => {
      dispatch(getProduct())
    })()
  }, [ProductStateData.length])

  return (
    <>
      {
        cart.length ?
          <>
            <h5 className='bg-primary text-center p-2 text-light'>Products in Cart</h5>
            <div className="table-responsive">
              <table className='table table-bordered table-striped table-hover'>
                <thead>
                  <tr>
                    {title === "Checkout" ? null : <th></th>}
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Color</th>
                    <th>Size</th>

                    {title === "Checkout" || title === "Order" ? null : <th>Stock</th>}
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    {title === "Checkout" || title === "Order" ? null : <th></th>}
                  </tr>
                </thead>
                <tbody>
                  {
                    cart.map(item => (
                      <tr key={item.id}>
                        {title === "Checkout" ? null :
                          <td>
                            <Link to={`${import.meta.env.VITE_SITE_BACKEND_SERVER}${item.pic}`} target='_blank' rel='noreferrer'>
                              <img src={`${import.meta.env.VITE_SITE_BACKEND_SERVER}${item.pic}`} height={80} width={100} />
                            </Link>
                          </td>}

                        <td>{item.name}</td>
                        <td>{item.brand}</td>
                        <td>{item.color}</td>
                        <td>{item.size}</td>
                        {title === "Checkout" || title === "Order" ? null : <td>{`${item.stockQuantity ? item.stockQuantity + ' Left in stock' : 'out of stock'}`}</td>}
                        <td>&#8377;{item.price}</td>
                        <td>
                          {
                            title === "Checkout" || title === "Order" ?
                              <h5>{item.qty}</h5> :
                              <div className='btn-group ' style={{ width: 140 }}>
                                <button className='btn btn-primary' onClick={() => updateItem(item.id, 'dec')}><i className='fa fa-minus'></i></button>
                                <h5 className='w-25 text-center'>{item.qty}</h5>
                                <button className='btn btn-primary' onClick={() => updateItem(item.id, 'inc')}><i className='fa fa-plus'></i></button>


                              </div>
                          }
                        </td>
                        <td>
                          <div style={{ width: 100 }}>
                            &#8377;{item.total}
                          </div>
                        </td>
                        {
                          title === "Checkout" || title === "Order" ? null : <td><button className='btn btn-danger' onClick={() => deleteItem(item.id)}><i className='fa fa-trash'></i></button></td>

                        }
                      </tr>
                    ))
                  }

                </tbody>
              </table>
            </div>
            {
              title === "Order" ? null :
                <div className="row">
                  <div className="col-md-6 mb-3"></div>
                  <div className={`${title === "Checkout" ? 'col-12' : 'col-md-6 '}mb-3`}>
                    <div className="table-responsive">
                      <table className='table table-bordered'>
                        <tbody>
                          <tr>
                            <th>Subtotal</th>
                            <td>&#8377;{subtotal}</td>
                          </tr>
                          <tr>
                            <th>Shipping</th>
                            <td>&#8377;{shipping}</td>
                          </tr>
                          <tr>
                            <th>Total</th>
                            <td>&#8377;{total}</td>
                          </tr>
                          {
                            title === "Checkout" ?
                              <tr>
                                <th>Payment Mode</th>
                                <td>
                                  <select name="mode" className='form-select border-3 border-primary' onChange={(e) => setMode(e.target.value)}>
                                    <option value="COD">COD</option>
                                    <option value="Net Banking" disabled>Net Banking/UPI/Card</option>
                                  </select>
                                </td>
                              </tr> : null
                          }
                          <tr>
                            <th colSpan={2}>
                              {
                                title === "Cart" ?
                                  <Link to="/checkout" className='btn btn-primary w-100'>Proceed To Checkout</Link> :
                                  <button className='btn btn-primary w-100' onClick={placeOrder}>Place Order</button>

                              }
                            </th>

                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

            }

          </> :
          <div className='text-center my-2'>
            <h3> No Items in Cart</h3>
            <Link to="/shop" className='btn btn-primary'>Shop Now</Link>

          </div>
      }
    </>
  )
}
