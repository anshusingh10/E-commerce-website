import React from 'react'
import Breadcrum from '../components/Breadcrum'
import Faqs from '../components/Faqs'
import Testimonial from '../components/Testimonial'
import Features from '../components/Features'

export default function FaqsPage() {
    return (
        <>
            <Breadcrum title="FAQs" />
            <Faqs />
            <Features />
            <Testimonial />
        </>
    )
}
