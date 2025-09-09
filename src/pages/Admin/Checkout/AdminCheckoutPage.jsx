import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import $ from 'jquery';
import 'datatables.net'
import 'datatables.net-dt/css/dataTables.dataTables.min.css'

import Breadcrum from '../../../components/Breadcrum'
import AdminSidebar from '../../../components/AdminSidebar'



import { getCheckout } from '../../../Redux/ActionCreators/CheckoutActionCreators'
import { Link } from 'react-router-dom';

export default function AdminCheckoutPage() {
    let [data, setData] = useState([])
    let CheckoutStateData = useSelector(state => state.CheckoutStateData)
    let dispatch = useDispatch()


    function getAPIData() {
        dispatch(getCheckout())
        if (CheckoutStateData.length)
            setData(CheckoutStateData)
        else
            setData([])

        let time = setTimeout(() => {
            $('#DataTable').DataTable()
        }, 500)
        return time
    }

    useEffect(() => {
        let time = getAPIData();
        return () => {
            clearTimeout(time)

        }
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
                        <div className="table-responsive"><table id='DataTable' className='table table-bordered table-striped table-hover'>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>User id</th>
                                    <th>Order Status</th>
                                    <th>Payment Mode</th>
                                    <th>Payment Status</th>
                                    <th>RPPID</th>
                                    <th>Subtotal</th>
                                    <th>Shipping</th>
                                    <th>Total</th>
                                    <th>Date</th>
                                    <th></th>
                                    <th></th>

                                </tr>
                            </thead>
                            < tbody>
                                {
                                    data.map(item => {

                                        return <tr key={item.id}>

                                            <td>{item.id}</td>
                                            <td>{item.user}</td>
                                            <td>{item.orderStatus}</td>
                                            <td>{item.PaymentMode}</td>
                                            <td>{item.paymentStatus}</td>
                                            <td>{item.rppid ?? "N/A"}</td>
                                            <td>&#8377;{item.subtotal}</td>
                                            <td>&#8377;{item.shipping}</td>
                                            <td>&#8377;{item.total}</td>
                                            <td>{new Date(item.date).toLocaleDateString()}</td>
                                            <td className={`${item.active ? 'text-success' : 'text-danger'}`} >{item.active ? "Yes" : "No"}</td>
                                            <td><Link to={`/admin/checkout/show/${item.id}`} className='btn btn-primary'><i className='fa fa-eye'></i></Link></td>

                                        </tr>
                                    })
                                }
                            </tbody>
                        </table></div>
                    </div>
                </div>
            </div>
        </>
    )
}
