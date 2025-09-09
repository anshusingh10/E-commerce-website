import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link} from 'react-router-dom'

import { getSettings } from "../Redux/ActionCreators/SettingsActionCreators"
import { getNewsletter, createNewsletter } from "../Redux/ActionCreators/NewsletterActionCreators"


export default function Footer() {
    let [email, setEmail] = useState("")
    let [message, setMessage] = useState("")

    let SettingsStateData = useSelector(state => state.SettingsStateData)
    let NewsletterStateData = useSelector(state => state.NewsletterStateData)

    let dispatch = useDispatch()

    let [data, setData] = useState({
        googleMap: "",
        address: "",
        phone: "",
        whatsapp: "",
        email: "",
        siteName: "",
        facebook: "",
        twitter: "",
        instagram: "",
        linkedin: "",
        youtube: ""
    })
    function postSubmit(e) {
        e.preventDefault()
        if (email === "")
            setMessage("please Enter avalid Email Address")
        else {
            let item = NewsletterStateData.find(x => x.email === email)
            if (!item)
                dispatch(createNewsletter({ email: email, active: true }))
            setMessage("Thanks to Subscribe Our Newsletter Service")
            setEmail("")
        }
    }
    useEffect(() => {
        if (SettingsStateData.length) {
            setData({
                googleMap: SettingsStateData[0].googleMap || import.meta.env.VITE_SITE_MAP,
                address: SettingsStateData[0].address || import.meta.env.VITE_SITE_ADDRESS,
                phone: SettingsStateData[0].phone || import.meta.env.VITE_SITE_PHONE,
                whatsapp: SettingsStateData[0].whatsapp || import.meta.env.VITE_SITE_WHATSAPP,
                email: SettingsStateData[0].email || import.meta.env.VITE_SITE_EMAIL,
                siteName: SettingsStateData[0].siteName || import.meta.env.VITE_SITE_NAME,
                facebook: SettingsStateData[0].facebook || import.meta.env.VITE_FACEBOOK,
                twitter: SettingsStateData[0].twitter || import.meta.env.VITE_TWITTER,
                instagram: SettingsStateData[0].instagram || import.meta.env.VITE_INSTAGRAM,
                linkedin: SettingsStateData[0].linkedin || import.meta.env.VITE_LINKEDIN,
                youtube: SettingsStateData[0].youtube || import.meta.env.VITE_YOUTUBE,
            })
        }
    }, [SettingsStateData])
    useEffect(() => {
        (() => {
            dispatch(getNewsletter())
        })()
    }, [NewsletterStateData.length])
    return (
        <>
            <div className="container-fluid footer py-5 wow fadeIn" data-wow-delay="0.2s">
                <div className="container py-5 border-start-0 border-end-0" style={{ border: "1px solid", borderColor: "rgb(255, 255, 255, 0.08)" }}>
                    <div className="row g-5">
                        <div className="col-md-6 col-lg-6 col-xl-4">
                            <div className="footer-item">
                                <a href="index.html" className="p-0">
                                    <h4 className="text-white"><i className="fas fa-shopping-bag me-3"></i>{data.siteName}</h4>
                                    {/* <img src="img/logo.png" alt="Logo"/>*/}
                                </a>
                                <div className="footer-item">
                                    <div className="d-flex align-items-center">
                                        <i className="fas fa-map-marker-alt text-primary me-3"></i>
                                        <Link to={data.googleMap} target='_blank' rel='noreferrer' className="text-white mb-0">{data.address}</Link>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <i className="fas fa-envelope text-primary me-3"></i>
                                        <Link to={`mailto:${data.email}`} target='_blank' rel='noreferrer' className="text-white mb-0">{data.email}</Link>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <i className="fa fa-phone-alt text-primary me-3"></i>
                                        <Link to={`tel:${data.phone}`} target='_blank' rel='noreferrer' className="text-white mb-0">{data.phone}</Link>
                                    </div>
                                    <div className="d-flex align-items-center mb-4">
                                        <i className="fab fa-whatsapp fs-5 text-primary me-3"></i>
                                        <Link to={`mailto:${data.whatsapp}`} target='_blank' rel='noreferrer' className="text-white mb-0">{data.whatsapp}</Link>
                                    </div>
                                    <div className="d-flex">
                                        <Link to={data.facebook} className="btn btn-primary btn-sm-square rounded-circle me-3" href="#"><i className="fab fa-facebook-f text-white"></i></Link>
                                        <Link to={data.twitter} className="btn btn-primary btn-sm-square rounded-circle me-3" href="#"><i className="fab fa-twitter text-white"></i></Link>
                                        <Link to={data.instagram} className="btn btn-primary btn-sm-square rounded-circle me-3" href="#"><i className="fab fa-instagram text-white"></i></Link>
                                        <Link to={data.linkedin} className="btn btn-primary btn-sm-square rounded-circle me-3" href="#"><i className="fab fa-linkedin-in text-white"></i></Link>
                                        <Link to={data.youtube} className="btn btn-primary btn-sm-square rounded-circle me-0" href="#"><i className="fab fa-youtube text-white"></i></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-2">
                            <div className="footer-item">
                                <h4 className="text-white mb-4">Quick Links</h4>
                                <Link className='text-light' to="/"><i className="fas fa-angle-right me-2"></i> Home</Link>
                                <Link className='text-light' to="/about"><i className="fas fa-angle-right me-2"></i> About Us</Link>
                                <Link className='text-light' to="/shop"><i className="fas fa-angle-right me-2"></i> Shop</Link>
                                <Link className='text-light' to="/features"><i className="fas fa-angle-right me-2"></i> Feature</Link>
                                <Link className='text-light' to="/testimonials"><i className="fas fa-angle-right me-2"></i> Testimonials</Link>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-2">
                            <div className="footer-item">
                                <h4 className="text-white mb-4">Support</h4>
                                <Link className='text-light' to="/contactus"><i className="fas fa-angle-right me-2"></i> ContactUs</Link>
                                <Link className='text-light' to="/faqs"><i className="fas fa-angle-right me-2"></i> Faqs</Link>
                                <Link className='text-light' to="/"><i className="fas fa-angle-right me-2"></i> Privacy Policy</Link>
                                <Link className='text-light' to="/"><i className="fas fa-angle-right me-2"></i> T&C</Link>
                                <Link className='text-light' to="/"><i className="fas fa-angle-right me-2"></i> Refund Policy</Link>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-4">
                            <div className="footer-item">
                                <h4 className="text-white mb-4">Newsletter</h4>
                                <p className='text-light'>{message ? message : "Subscribe Our Newsletter Service to Get Update on Latest Products and Best Deals"}</p>
                                <form onSubmit={postSubmit}>
                                    <div className="btn-group">
                                        <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Email Address' className='form-control rounded-0 rounded-start' />
                                        <button className='btn btn-primary'>Subsctibe</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid copyright py-4">
                <div className="container">
                    <div className="text-center  mb-md-0">
                        <span className="text-light"><a href="#" className="border-bottom text-white"><i className="fas fa-copyright text-light me-2"></i>{data.siteName}</a>, All right reserved.</span>
                    </div>
                </div>
            </div>
        </>
    )
}
