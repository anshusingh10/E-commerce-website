import React from 'react'
import Breadcrum from '../components/Breadcrum'
import About from '../components/About'
import Features from '../components/Features'
import Testimonial from '../components/Testimonial'

export default function AboutPage() {
    return (
        <>
            <Breadcrum title="About Us" />
            <About />
            <Features />
            <Testimonial />
        </>
    )
}
