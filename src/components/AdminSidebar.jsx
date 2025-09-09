import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminSidebar() {
    return (
        <>
            <div className="list-group">
                <Link to="/admin" className="list-group-item list-group-item-action active rounded-0 mb-1" aria-current="true"><i className='fa fa-home'></i> <span className='float-end'>Home</span></Link>
                <Link to="/admin/maincategory" className="list-group-item list-group-item-action active rounded-0 mb-1" aria-current="true"><i className='fa fa-list'></i> <span className='float-end'>Maincategory</span></Link>
                <Link to="/admin/subcategory" className="list-group-item list-group-item-action active rounded-0 mb-1" aria-current="true"><i className='fa fa-list'></i> <span className='float-end'>Subcategory</span></Link>
                <Link to="/admin/brand" className="list-group-item list-group-item-action active rounded-0 mb-1" aria-current="true"><i className='fa fa-list'></i> <span className='float-end'>Brand</span></Link>
                <Link to="/admin/product" className="list-group-item list-group-item-action active rounded-0 mb-1" aria-current="true"><i className='fa fa-list'></i> <span className='float-end'>Product</span></Link>
                <Link to="/admin/testimonial" className="list-group-item list-group-item-action active rounded-0 mb-1" aria-current="true"><i className='fa fa-star'></i> <span className='float-end'>Testimonial</span></Link>
                <Link to="/admin/feature" className="list-group-item list-group-item-action active rounded-0 mb-1" aria-current="true"><i className='fa fa-rocket'></i> <span className='float-end'>Features</span></Link>
                <Link to="/admin/faq" className="list-group-item list-group-item-action active rounded-0 mb-1" aria-current="true"><i className='fa fa-question'></i> <span className='float-end'>Faqs</span></Link>
                <Link to="/admin/newsletter" className="list-group-item list-group-item-action active rounded-0 mb-1" aria-current="true"><i className='fa fa-envelope'></i> <span className='float-end'>Newsletter</span></Link>
                <Link to="/admin/contactus" className="list-group-item list-group-item-action active rounded-0 mb-1" aria-current="true"><i className='fa fa-phone'></i> <span className='float-end'>ContactUs</span></Link>
                <Link to="/admin/checkout" className="list-group-item list-group-item-action active rounded-0 mb-1" aria-current="true"><i className='fa fa-shopping-bag'></i> <span className='float-end'>Checkout</span></Link>
                <Link to="/admin/user" className="list-group-item list-group-item-action active rounded-0 mb-1" aria-current="true"><i className='fa fa-users'></i> <span className='float-end'>User</span></Link>
                <Link to="/admin/settings" className="list-group-item list-group-item-action active rounded-0 mb-1" aria-current="true"><i className='fa fa-gear'></i> <span className='float-end'>Settings</span></Link>
            </div>
        </>
    )
}
