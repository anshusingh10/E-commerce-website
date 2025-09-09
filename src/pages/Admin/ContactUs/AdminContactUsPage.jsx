import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import $ from 'jquery';
import 'datatables.net'
import 'datatables.net-dt/css/dataTables.dataTables.min.css'

import Breadcrum from '../../../components/Breadcrum'
import AdminSidebar from '../../../components/AdminSidebar'



import { deleteContactUs, getContactUs, } from '../../../Redux/ActionCreators/ContactUsActionCreators'
import { Link } from 'react-router-dom';

export default function AdminContactUsPage() {
    let [data, setData] = useState([])
    let ContactUsStateData = useSelector(state => state.ContactUsStateData)
    let dispatch = useDispatch()

    function deleteRecord(id) {
        if (window.confirm("Are you sure you want to delete this record?")) {
            dispatch(deleteContactUs({ id: id }))
            getAPIData()
        }
    }

    function getAPIData() {
        dispatch(getContactUs())
        if (ContactUsStateData.length)
            setData(ContactUsStateData)
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
    }, [ContactUsStateData.length])
    return (
        <>
            <Breadcrum title="Admin" />
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3 mb-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9 mb-3">
                        <h5 className='bg-primary text-light text-center p-2'>ContactUs</h5>
                        <div className="table-responsive"><table id='DataTable' className='table table-bordered table-striped table-hover'>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Subject</th>
                                    <th>Date</th>
                                    <th>Active</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            < tbody>
                                {
                                    data.map(item => {

                                        return <tr key={item.id}>

                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.subject}</td>
                                            <td>{new Date(item.date).toLocaleDateString()}</td>


                                            <td className={`${item.active ? 'text-success' : 'text-danger'}`} >{item.active ? "Yes" : "No"}</td>
                                            <td><Link to={`/admin/contactus/show/${item.id}`} className='btn btn-primary'><i className='fa fa-eye'></i></Link></td>
                                            <td>{item.active && localStorage.getItem("role") !== "Super Admin" ? null : <button className='btn btn-danger' onClick={() => deleteRecord(item.id)}><i className='fa fa-trash'></i></button>}</td>

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
