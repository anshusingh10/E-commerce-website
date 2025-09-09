
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { getSettings } from "../Redux/ActionCreators/SettingsActionCreators"
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function Navbar() {
    let SettingsStateData = useSelector(state => state.SettingsStateData)
    let dispatch = useDispatch()
    let navigate = useNavigate()

    let [data, setData] = useState({
        googleMap: "",
        address: "",
        phone: "",
        whatsapp: "",
        email: "",
        siteName: ""
    })
    function logout() {
        localStorage.removeItem("login")
        localStorage.removeItem("name")
        localStorage.removeItem("role")
        localStorage.removeItem("userid")
        navigate("/login")
    }
    useEffect(() => {
        if (SettingsStateData.length) {
            setData({
                googleMap: SettingsStateData[0].googleMap || import.meta.env.VITE_SITE_MAP,
                address: SettingsStateData[0].address || import.meta.env.VITE_SITE_ADDRESS,
                phone: SettingsStateData[0].phone || import.meta.env.VITE_SITE_PHONE,
                whatsapp: SettingsStateData[0].whatsapp || import.meta.env.VITE_SITE_WHATSAPP,
                email: SettingsStateData[0].email || import.meta.env.VITE_SITE_EMAIL,
                siteName: SettingsStateData[0].siteName || import.meta.env.VITE_SITE_NAME
            })
        }
    }, [SettingsStateData])
    return (
        <>
            <div className="container-fluid topbar bg-light  px-5">
                <div className="row gx-0 align-items-center">
                    <div className="col-lg-10 col-6 text-center text-lg-start mb-2 mb-lg-0">
                        <div className="d-flex flex-wrap">
                            <Link to={data.googleMap} target='_blank' rel='noreferrer' className="text-muted small me-4"><i className="fas fa-map-marker-alt text-primary me-2"></i><span className='d-none d-xl-inline-block'>{data.address}</span></Link>
                            <Link to={`tel:${data.phone}`} target='_blank' rel='noreferrer' className="text-muted small me-4"><i className="fas fa-phone-alt text-primary me-2"></i><span className='d-none d-xl-inline-block'>{data.phone}</span></Link>
                            <Link to={`https://wa.me/${data.whatsapp}`} target='_blank' rel='noreferrer' className="text-muted small me-4"><i className="fab fa-whatsapp text-primary me-2" style={{ fontSize: 18 }}></i><span className='d-none d-xl-inline-block'>{data.whatsapp}</span></Link>
                            <Link to={`mailto:${data.email}`} target='_blank' rel='noreferrer' className="text-muted small me-0"><i className="fas fa-envelope text-primary me-2"></i><span className='d-none d-xl-inline-block'>{data.email}</span></Link>
                        </div>
                    </div>
                    <div className="col-lg-2 col-6 text-center text-lg-end">
                        <div className="p-2 d-inline-flex align-items-center">
                            {
                                localStorage.getItem("login") ?
                                    <div className="dropdown">
                                        <a href="#" className="dropdown-toggle text-dark" data-bs-toggle="dropdown"><small><i className="fa fa-home text-primary me-2"></i> My Dashboard</small></a>
                                        <div className="dropdown-menu rounded">
                                            <Link to={localStorage.getItem("role") === "Buyer" ? "/profile" : "/admin"} className="dropdown-item"><i className="fas fa-user-alt me-2"></i> My Profile</Link>
                                            <Link to="/cart" className="dropdown-item"><i className="fas fa-comment-alt me-2"></i> Cart</Link>
                                            <Link to="/checkout" className="dropdown-item"><i className="fas fa-shopping-bag me-2"></i> Checkout</Link>
                                            <button className="dropdown-item" onClick={logout}><i className="fas fa-power-off me-2"></i> Log Out</button>
                                        </div>
                                    </div> :
                                    <Link to="/login">Login</Link>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid position-relative p-0">
                <nav className="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
                    <Link to="/" className="navbar-brand p-0">
                        <h1 className="text-light"><i className="fas fa-shopping-bag me-3"></i>{data.siteName}</h1>
                        {/* <img src="img/logo.png" alt="Logo"/> */}
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span className="fa fa-bars"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="navbar-nav ms-auto py-0">
                            <NavLink to="/" className="nav-item nav-link">Home</NavLink>
                            <NavLink to="/about" className="nav-item nav-link">About</NavLink>
                            <NavLink to="/shop" className="nav-item nav-link">Shop</NavLink>
                            <NavLink to="/features" className="nav-item nav-link">Features</NavLink>
                            <NavLink to="/testimonials" className="nav-item nav-link">Testimonial</NavLink>
                            <NavLink to="/faqs" className="nav-item nav-link">Faq</NavLink>
                            <NavLink to="/contactus" className="nav-item nav-link">ContactUs</NavLink>
                            {/* <NavLink to="/admin" className="nav-item nav-link">Admin</NavLink> */}
                            {/* <div className="nav-item dropdown">
                                <a href="#" className="nav-link" data-bs-toggle="dropdown">
                                    <span className="dropdown-toggle">Pages</span>
                                </a>
                                <div className="dropdown-menu m-0">
                                    <a href="feature.html" className="dropdown-item">Our Features</a>
                                    <a href="team.html" className="dropdown-item">Our team</a>
                                    <a href="testimonial.html" className="dropdown-item">Testimonial</a>
                                    <a href="offer.html" className="dropdown-item">Our offer</a>
                                    <a href="FAQ.html" className="dropdown-item">FAQs</a>
                                    <a href="404.html" className="dropdown-item">404 Page</a>
                                </div>
                            </div>
                            <a href="contact.html" className="nav-item nav-link">Contact Us</a> */}
                        </div>
                        <a href="#" className="btn btn-primary rounded-pill py-2 px-4 my-3 my-lg-0 flex-shrink-0">Get Started</a>
                    </div>
                </nav>
            </div>
        </>
    )
}
