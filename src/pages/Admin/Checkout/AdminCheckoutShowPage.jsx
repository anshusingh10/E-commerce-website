import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import Breadcrum from '../../../components/Breadcrum'
import AdminSidebar from '../../../components/AdminSidebar'
import Cart from '../../../components/Cart'


import { getCheckout, updateCheckout } from '../../../Redux/ActionCreators/CheckoutActionCreators'
import { useParams } from 'react-router-dom';

export default function AdminCheckoutShowPage() {
    let { id } = useParams()
    let [user, setUser] = useState({})
    let [data, setData] = useState({})
    let [flag, setFlag] = useState(false)

    let [orderStatus, setOrderStatus] = useState("")
    let [paymentStatus, setpaymentStatus] = useState("")


    let CheckoutStateData = useSelector(state => state.CheckoutStateData)
    let dispatch = useDispatch()


    function updateRecord() {
        if (window.confirm("Are you sure you want to update status:")) {
            data.orderStatus = orderStatus
            data.paymentStatus = paymentStatus
            dispatch(updateCheckout({ ...data }))
            setFlag(!flag)
        }
    }

    async function getAPIData() {
        dispatch(getCheckout())
        if (CheckoutStateData.length) {
            let item = CheckoutStateData.find(x => x.id === id)
            if (item) {
                setData(item)
                setOrderStatus(item.orderStatus)
                setpaymentStatus(item.paymentStatus)
                let response = await fetch(`${import.meta.env.VITE_SITE_BACKEND_SERVER}user/${item.user}`, {
                    method: "GET",
                    headers: {
                        "content-type": "application/json"
                    }
                })
                response = await response.json()
                setUser(response)
            } else {
                setData({})
                setOrderStatus("")
                setpaymentStatus("")
                setUser({})
            }
        }
    }

    useEffect(() => {
        getAPIData();

    }, [CheckoutStateData.length])
    return (
        <>
            <Breadcrum title="Admin" />
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3 mb-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9 mb-3">
                        <h5 className='bg-primary text-light text-center p-2'>Checkout</h5>
                        <div className="table-responsive">
                            <table id='DataTable' className='table table-bordered table-striped table-hover'>
                                <tbody>
                                    <tr>
                                        <th>Id</th>
                                        <td>{data.id}</td>
                                    </tr>
                                    <tr>
                                        <th>User</th>
                                        <td>{user.name}<br />
                                            {user.email},{user.phone}<br />
                                            {user.address}<br />
                                            {user.pin},{user.city},{user.state}<br />


                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Order Status</th>
                                        <td>{data.orderStatus}

                                            {
                                                data.orderStatus !== "Delivered" ?
                                                    <div className="d-block my-2 col-md-8">
                                                        <select value={orderStatus} onChange={(e) => setOrderStatus(e.target.value)} className='form-select border-3 border-primary'>
                                                            <option>Order is Placed</option>
                                                            <option>Order is Packed</option>
                                                            <option>Order is Ready to Shipped</option>
                                                            <option>Order is Shipped</option>
                                                            <option>Order is in Transit</option>
                                                            <option>Order is Reached At the Final Delivery Station</option>
                                                            <option>Order is Out for Delivery</option>
                                                            <option>Delivered</option>


                                                        </select>

                                                    </div> : null
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Payment Mode</th>
                                        <td>{data.paymentMode}</td>
                                    </tr>
                                    <tr>
                                        <th>Payment Status</th>
                                        <td>{data.paymentStatus}

                                            {
                                                data.paymentStatus !== "Done" ?
                                                    <div className="d-block my-2 col-md-8">
                                                        <select value={paymentStatus} onChange={(e) => setpaymentStatus(e.target.value)} className='form-select border-3 border-primary'>
                                                            <option>Pending</option>
                                                            <option>Done</option>



                                                        </select>

                                                    </div> : null
                                            }

                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Shipping</th>
                                        <td>&#8377;{data.shipping}</td>
                                    </tr>
                                    <tr>
                                        <th>Total</th>
                                        <td>&#8377;{data.total}</td>
                                    </tr>
                                    <tr>
                                        <th>Subtotal</th>
                                        <td>&#8377;{data.subtotal}</td>
                                    </tr>
                                    <tr>
                                        <th>RPPID</th>
                                        <td>{data.rppid ?? "N/A"}</td>
                                    </tr>
                                    <tr>
                                        <th>Date</th>
                                        <td>{new Date(data.date).toLocaleDateString()}</td>
                                    </tr>
                                    <tr>

                                        <td colSpan={2}>
                                            {
                                                data.orderStatus !== "Delivered" || data.paymentStatus !== "Done" ?
                                                    <button className='btn btn-primary w-100' onClick={updateRecord}>Update Status</button> : null
                                            }

                                        </td>


                                    </tr>
                                </tbody>
                            </table>
                            <div>
                                {data.products ? <Cart data={data.products} title="Order" /> : null}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
