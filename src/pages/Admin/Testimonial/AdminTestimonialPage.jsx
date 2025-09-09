import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

import $ from 'jquery';
import 'datatables.net'
import 'datatables.net-dt/css/dataTables.dataTables.min.css'

import Breadcrum from '../../../components/Breadcrum'
import AdminSidebar from '../../../components/AdminSidebar'

import { getTestimonial, deleteTestimonial } from '../../../Redux/ActionCreators/TestimonialActionCreators'




export default function AdminTestimonialPage() {
    let TestimonialStateData = useSelector(state => state.TestimonialStateData)
    let dispatch = useDispatch()

    function deleteRecord(id) {
        if (window.confirm("Are you sure you want to delete this record?")) {
            dispatch(deleteTestimonial({ id: id }))
            getAPIData()
        }

    }

    function getAPIData() {
        dispatch(getTestimonial())

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
    }, [TestimonialStateData.length])
    return (
        <>
            <Breadcrum title="Admin" />
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3 mb-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9 mb-3">
                        <h5 className='bg-primary text-light text-center p-2'>Testimonial <Link to="/admin/testimonial/create"><i className='fa fa-plus text-light float-end'></i></Link></h5>
                        <div className="table-responsive"><table id='DataTable' className='table table-bordered table-striped table-hover'>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Pic</th>
                                    <th>Message</th>
                                    <th>Active</th>
                                    <th></th>
                                    <th></th>

                                </tr>
                            </thead>
                            < tbody>
                                {
                                    TestimonialStateData.map(item => {

                                        return <tr key={item.id}>

                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>
                                                <Link to={`${import.meta.env.VITE_SITE_BACKEND_SERVER}${item.pic}`} target="_blank" rel='noreferrer'>
                                                    <img src={`${import.meta.env.VITE_SITE_BACKEND_SERVER}${item.pic}`} width={100} height={80} className='rounded' />
                                                </Link>
                                            </td>
                                            <td><div className='testimonial-message'>{item.message}</div></td>
                                            <td className={`${item.active ? 'text-success' : 'text-danger'}`}>{item.active ? "Yes" : "No"}</td>
                                            <td><Link to={`/admin/testimonial/update/${item.id}`} className='btn btn-primary'><i className='fa fa-edit'></i></Link></td>
                                            <td>{localStorage.getItem("role") === "Super Admin" ? <button className='btn btn-danger' onClick={() => deleteRecord(item.id)}><i className='fa fa-trash'></i></button> : null}</td>
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
