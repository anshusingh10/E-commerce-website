import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getSettings } from "../Redux/ActionCreators/SettingsActionCreators"
export default function About() {
    let [siteName, setSiteName] = useState(import.meta.env.VITE_SITE_NAME)
    let SettingsStateData = useSelector(state => state.SettingsStateData)
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(getSettings())
        if (SettingsStateData.length) {
            setSiteName(SettingsStateData[0].siteName)
        }
    }, [SettingsStateData.length])
    return (
        <>
            {/* <!-- About Start --> */}
            <div className="container-fluid about py-5">
                <div className="container py-5">
                    <div className="row g-5 align-items-center">
                        <div className="col-xl-7 wow fadeInLeft" data-wow-delay="0.2s">
                            <div>
                                <h4 className="text-primary">About Us</h4>
                                <h1 className="display-5 mb-4">{siteName}-Your Trusted Destination for Branded Fashion</h1>
                                <p className="mb-4">{siteName} is more than just an online shopping website—it’s your gateway to branded fashion at your fingertips. We bring together a handpicked collection of clothing, shoes, and accessories from top labels like Puma, Mufti, and Nike, all in one sleek, easy-to-use platform.
                                </p>
                                <p>Whether you're dressing for a casual outing or a stylish upgrade, we’ve got your fashion needs covered. Powered by React, {siteName} offers a seamless and responsive experience designed for modern shoppers.</p>
                                <p>Our goal is simple: provide quality products, smooth navigation, and trusted service that keeps you coming back. From secure checkout to fast delivery, every step is tailored to make your shopping journey effortless.

                                    Welcome to {siteName}—where top fashion meets convenience.</p>
                                <p>At {siteName}, we believe shopping should be easy, exciting, and full of possibilities. That’s why we created a smart, user-friendly platform where you can explore a wide variety of branded clothing, shoes, and accessories for men and women. From casual wear to sporty looks, we bring you collections from trusted brands like Mufti, Nike, Puma, and more.</p>
                            </div>
                        </div>
                        <div className="col-xl-5 wow fadeInRight" data-wow-delay="0.2s">
                            <div className="bg-primary rounded position-relative overflow-hidden">
                                <img src="/banner/banner5.jpg" className="img-fluid rounded w-100" alt="" />
                                <div className="rounded-bottom">
                                    <img src="/banner/banner10.jpg" className="img-fluid rounded-bottom w-100" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- About End --> */}

        </>
    )
}
