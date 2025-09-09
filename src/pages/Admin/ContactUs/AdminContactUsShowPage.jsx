import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import Breadcrum from '../../../components/Breadcrum'
import AdminSidebar from '../../../components/AdminSidebar'



import { deleteContactUs, getContactUs, updateContactUs } from '../../../Redux/ActionCreators/ContactUsActionCreators'
import { useNavigate, useParams } from 'react-router-dom';

export default function AdminContactUsShowPage() {
    let { id } = useParams()
    let [data, setData] = useState({})
    let [flag, setFlag] = useState(false)
    let navigate = useNavigate()

    let ContactUsStateData = useSelector(state => state.ContactUsStateData)
    let dispatch = useDispatch()

    function deleteRecord() {
        if (window.confirm("Are you sure you want to delete this record?")) {
            dispatch(deleteContactUs({ id: id }))
            navigate("/admin/contactus")
            getAPIData()
        }
    }
    function updateRecord() {
        if (window.confirm("Are you sure you want to update status:")) {

            dispatch(updateContactUs({ ...data, active: !data.active }))
            data.active = !data.active
            setFlag(!flag)
        }
    }

    function getAPIData() {
        dispatch(getContactUs())
        if (ContactUsStateData.length) {
            setData(ContactUsStateData.find(x => x.id === id))
        }
    }

    useEffect(() => {
        getAPIData();

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
                        <div className="table-responsive">
                            <table id='DataTable' className='table table-bordered table-striped table-hover'>
                                <tbody>
                                    <tr>
                                        <th>Id</th>
                                        <td>{data.id}</td>
                                    </tr>
                                    <tr>
                                        <th>name</th>
                                        <td>{data.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Email</th>
                                        <td>{data.email}</td>
                                    </tr>
                                    <tr>
                                        <th>Phone</th>
                                        <td>{data.phone}</td>
                                    </tr>
                                    <tr>
                                        <th>Subject</th>
                                        <td>{data.subject}</td>
                                    </tr>
                                    <tr>
                                        <th>Message</th>
                                        <td>{data.message}</td>
                                    </tr>
                                    <tr>
                                        <th>Date</th>
                                        <td>{new Date(data.date).toLocaleDateString()}</td>
                                    </tr>
                                    <tr>
                                        <th>Active</th>
                                        <td>{data.active ? "Yes" : "No"}</td>
                                    </tr>
                                    <tr>
                                        {
                                            <td colSpan={2}>
                                                {
                                                    data.active ?
                                                        <button className='btn btn-primary w-100' onClick={updateRecord}>Update Status</button> :
                                                        <button className='btn btn-danger w-100' onClick={deleteRecord}>Delete</button>
                                                }
                                            </td>
                                        }

                                    </tr>
                                </tbody>
                            </table></div>
                    </div>
                </div>
            </div>
        </>
    )
}
