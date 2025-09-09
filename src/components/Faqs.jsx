import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getFaq } from "../Redux/ActionCreators/FaqActionCreators"


export default function Faqs() {
    let FaqStateData = useSelector(state => state.FaqStateData)
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(getFaq())
    }, [FaqStateData.length])
    return (
        <>
            {/* <!-- FAQs Start --> */}
            <div className="container-fluid faq-section pb-5">
                <div className="container pb-5 overflow-hidden">
                    <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style={{ maxWidth: "800px" }}>
                        <h4 className="text-primary">FAQs</h4>
                        <h1 className="display-5 mb-4">Frequently Asked Questions</h1>
                        <p className="mb-0">Have a question? We've got answers! Visit our FAQ section to find quick solutions to common queries about orders, payments, delivery, returns, and more. If you still need help, our support team is always ready to assist you.</p>
                    </div>
                    <div className="row g-5 align-items-center">
                        <div className="col-lg-6 wow fadeInLeft" data-wow-delay="0.2s">
                            <div className="accordion accordion-flush bg-light rounded p-5" id="accordionFlushSection">
                                {
                                    FaqStateData.map(item => {
                                        return <div key={item.id} className="accordion-item rounded-top">
                                            <h2 className="accordion-header" id={`flush-heading${item.id}`}>
                                                <button className="accordion-button collapsed rounded-top" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse${item.id}`} aria-expanded="false" aria-controls={`flush-collapse${item.id}`}>
                                                    {item.question}
                                                </button>
                                            </h2>
                                            <div id={`flush-collapse${item.id}`} class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushSection">
                                                <div className="accordion-body">{item.answer}</div>
                                            </div>
                                        </div>
                                    })
                                }


                            </div>
                        </div>
                        <div className="col-lg-6 wow fadeInRight" data-wow-delay="0.2s">
                            <div className="bg-primary rounded">
                                <img src="/banner/banner2.jpg" className="img-fluid w-100" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- FAQs End --> */}
        </>
    )
}
