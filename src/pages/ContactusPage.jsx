import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Breadcrum from '../components/Breadcrum'
import FormValidator from '../Validations/FormValidator'

import { getSettings } from "../Redux/ActionCreators/SettingsActionCreators"
import { createContactUs } from "../Redux/ActionCreators/ContactUsActionCreators"


export default function ContactusPage() {
    let [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""

    })
    let [errorMessage, setErrorMessage] = useState({
        name: "Name Field is Mandatory",
        email: "Email Address Field is Mandatory",
        phone: "Phone Number Field is Mandatory",
        subject: "Subject Field is Mandatory",
        message: "Message Field is Mandatory",
    })
    let [show, setShow] = useState(false)
    let [message, setMessage] = useState("")


    let [siteData, setSiteData] = useState({
        map: "",
        googleMap: "",
        address: "",
        phone: "",
        whatsapp: "",
        email: "",
    })
    let SettingsStateData = useSelector(state => state.SettingsStateData)
    let dispatch = useDispatch()

    function getInputData(e) {
        let { name, value } = e.target;
        setErrorMessage((old) => {
            return {
                ...old,
                [name]: FormValidator(e)
            }
        })
        setData(old => {
            return {
                ...old,
                [name]: value
            }
        })
    }
    function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find(x => x !== "")
        if (error)
            setShow(true)
        else {
            dispatch(createContactUs({ ...data, active: true, date: new Date() }))
            setMessage("Thanks to Share Your Query with Us. Our Team will Contact you Soon ")
            setData({
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: ""
            })
            setErrorMessage({
                name: "Name Field is Mandatory",
                email: "Email Address Field is Mandatory",
                phone: "Phone Number Field is Mandatory",
                subject: "Subject Field is Mandatory",
                message: "Message Field is Mandatory",
            })
        }
    }

    useEffect(() => {
        if (SettingsStateData.length) {
            setSiteData({
                map: SettingsStateData[0].map || "",
                googleMap: SettingsStateData[0].googleMap || import.meta.env.VITE_SITE_MAP,
                address: SettingsStateData[0].address || import.meta.env.VITE_SITE_ADDRESS,
                phone: SettingsStateData[0].phone || import.meta.env.VITE_SITE_PHONE,
                whatsapp: SettingsStateData[0].whatsapp || import.meta.env.VITE_SITE_WHATSAPP,
                email: SettingsStateData[0].email || import.meta.env.VITE_SITE_EMAIL,
            })
        }
    }, [SettingsStateData])
    return (
        <>
            <Breadcrum title="Contact Us" />
            <div className="container-fluid contact pb-5">
                <div className="pb-5">
                    <div className="row g-5">
                        <div className="col-lg-7">
                            <div className="wow fadeInUp" data-wow-delay="0.2s">
                                <div className="bg-light rounded p-5 mb-5">
                                    <h4 className=" bg-primary text-center p-2 text-light mb-4">Get in Touch</h4>
                                    <div className="row g-4 text-center">
                                        <div className="col-md-6">
                                            <div className="contact-add-item">
                                                <div className="contact-icon text-primary mb-4">
                                                    <i className="fas fa-map-marker-alt fa-2x"></i>
                                                </div>
                                                <div>
                                                    <h4>Address</h4>
                                                    <p className='mb-0'>
                                                        <Link className="mb-0" to={siteData.googleMap} target='_blank' rel='noreferrer'>{siteData.address}</Link>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="contact-add-item">
                                                <div className="contact-icon text-primary mb-4">
                                                    <i className="fas fa-envelope fa-2x"></i>
                                                </div>
                                                <div>
                                                    <h4>Mail Us</h4>
                                                    <p className="mb-0"><Link className="mb-0" to={`mailto:${siteData.email}`} target='_blank' rel='noreferrer'>{siteData.email}</Link>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="contact-add-item">
                                                <div className="contact-icon text-primary mb-4">
                                                    <i className="fa fa-phone-alt fa-2x"></i>
                                                </div>
                                                <div>
                                                    <h4>Telephone</h4>
                                                    <p className="mb-0"><Link className="mb-0" to={`tel:${siteData.phone}`} target='_blank' rel='noreferrer'>{siteData.phone}</Link></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="contact-add-item">
                                                <div className="contact-icon text-primary mb-4">
                                                    <i className="fab fa-firefox-browser fa-2x"></i>
                                                </div>
                                                <div>
                                                    <h4>WhatsAPP</h4>
                                                    <p className="mb-0"><Link className="mb-0" to={`https://wa.me/${siteData.whatsapp}`} target='_blank' rel='noreferrer'>{siteData.whatsapp}</Link></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-lg-5 wow fadeInRight" data-wow-delay="0.2s">
                            <div className="bg-light p-5 rounded h-100 wow fadeInUp" data-wow-delay="0.2s">
                                <h4 className="bg-primary text-center p-2 text-light mb-4">Send Your Message</h4>
                                {message ? <p className='text-success text-center'>{message}</p> : null}
                                <form onSubmit={postData}>
                                    <div className="row">
                                        <div className="col-12 mb-3">
                                            <label>Name*</label>
                                            <input type="text" name="name" onChange={getInputData} value={data.name} placeholder='FullName' className={`form-control border-3 ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`} />
                                            {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label>Email*</label>
                                            <input type="email" name="email" onChange={getInputData} value={data.email} placeholder='Email Address' className={`form-control border-3 ${show && errorMessage.email ? 'border-danger' : 'border-primary'}`} />
                                            {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email}</p> : null}
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label>Phone*</label>
                                            <input type="text" name="phone" onChange={getInputData} value={data.phone} placeholder='Phone Number' className={`form-control border-3 ${show && errorMessage.phone ? 'border-danger' : 'border-primary'}`} />
                                            {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : null}
                                        </div>
                                        <div className="col-12 mb-3">
                                            <label>Subject*</label>
                                            <input type="text" name="subject" onChange={getInputData} value={data.subject} placeholder='Subject' className={`form-control border-3 ${show && errorMessage.subject ? 'border-danger' : 'border-primary'}`} />
                                            {show && errorMessage.subject ? <p className='text-danger'>{errorMessage.subject}</p> : null}
                                        </div>
                                        <div className="col-12 mb-3">
                                            <label>Message*</label>
                                            <textarea name="message" onChange={getInputData} value={data.message} placeholder='Message' rows={5} className={`form-control border-3 ${show && errorMessage.message ? 'border-danger' : 'border-primary'}`} />
                                            {show && errorMessage.message ? <p className='text-danger'>{errorMessage.message}</p> : null}
                                        </div>
                                        <div className="mb-3">
                                            <button type='submit' className='btn btn-primary w-100'>Submit</button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                        </div>
                        <div className="rounded w-100">
                            <iframe className="w-100 h-300" id="gmap_canvas" src={siteData.map} ></iframe>
                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}
