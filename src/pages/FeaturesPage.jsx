import React from 'react'
import Breadcrum from '../components/Breadcrum'
import Features from '../components/Features'
import Testimonial from '../components/Testimonial'
import Faqs from '../components/Faqs'

export default function FeaturesPage() {
  return (
    <>
      <Breadcrum title="Features" />
      <Features />
      <Testimonial />
      <Faqs />

    </>
  )
}
