import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getFeature } from "../Redux/ActionCreators/FeatureActionCreators"


export default function Features() {
    let FeatureStateData = useSelector(state => state.FeatureStateData)
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(getFeature())
    }, [FeatureStateData.length])
    return (
        <>
            {/* <!-- Features Start --> */}
            <div className="container-fluid feature pb-5">
                <div className="container pb-5">
                    <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style={{ maxWidth: "800px" }}>
                        <h4 className="text-primary">Our Features</h4>
                        <h1 class="display-5 mb-4">Shop  Branded  Fashion forEvery Age and Style</h1>
                        <p className="mb-0">Apni Dukan offers a diverse collection of top-brand clothing, footwear, and accessories to suit men, women, and kids—no matter your age, size, or style.


                        </p>
                    </div>
                    <div className="row g-4">

                        {
                            FeatureStateData.map(item => {
                                return < div key={item.id} className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp" data- wow-delay="0.8s" >
                                    <div className="feature-item p-4">
                                        <div className="feature-icon p-4 mb-4">
                                            <span className='fs-1 text-primary' dangerouslySetInnerHTML={{ __html: item.icon }}></span>
                                        </div>
                                        <h4>{item.name}</h4>
                                        <p className="mb-4" style={{ height: 120 }}>{item.description}
                                        </p>
                                        <Link className="btn btn-primary rounded-pill py-2 px-4" to="/shop">Shop Now</Link>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div >
            {/* <!-- Features End --> */}

        </>
    )
}
