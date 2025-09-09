import React from 'react'
import Breadcrum from '../components/Breadcrum'
import Cart from '../components/Cart'
import Profile from '../components/Profile'

export default function CheckoutPage() {
  return (
    <>
      <Breadcrum title="Checkout:-Place Your  Order" />

      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-6 mb-3">
            <Profile title="Checkout" />
          </div>
          <div className="col-md-6 mb-3">
            <Cart title="Checkout" />
          </div>
        </div>
      </div>
    </>
  )
}
