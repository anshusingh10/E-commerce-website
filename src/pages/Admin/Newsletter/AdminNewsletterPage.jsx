import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import $ from 'jquery';
import 'datatables.net'
import 'datatables.net-dt/css/dataTables.dataTables.min.css'

import Breadcrum from '../../../components/Breadcrum'
import AdminSidebar from '../../../components/AdminSidebar'



import { deleteNewsletter, getNewsletter, updateNewsletter } from '../../../Redux/ActionCreators/NewsletterActionCreators'

export default function AdminNewsletterPage() {
    let [data, setData] = useState([])
    let [flag, setFlag] = useState(false)
    let NewsletterStateData = useSelector(state => state.NewsletterStateData)
    let dispatch = useDispatch()

    function deleteRecord(id) {
        if (window.confirm("Are you sure you want to delete this record?")) {
            dispatch(deleteNewsletter({ id: id }))
            getAPIData()
        }
    }
    function updateRecord(id) {
        if (window.confirm("Are you sure you want to update status:")) {
            let item = NewsletterStateData.find(x => x.id === id)
            let index = NewsletterStateData.findIndex(x => x.id === id)
            dispatch(updateNewsletter({ ...item, active: !item.active }))
            data[index].active = !item.active
            setFlag(!flag)

        }
    }

    function getAPIData() {
        dispatch(getNewsletter())
        if (NewsletterStateData.length)
            setData(NewsletterStateData)
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
    }, [NewsletterStateData.length])
    return (
        <>
            <Breadcrum title="Admin" />
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3 mb-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9 mb-3">
                        <h5 className='bg-primary text-light text-center p-2'>Newsletter</h5>
                        <div className="table-responsive"><table id='DataTable' className='table table-bordered table-striped table-hover'>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Active</th>
                                    <th></th>
                                </tr>
                            </thead>
                            < tbody>
                                {
                                    data.map(item => {

                                        return <tr key={item.id}>

                                            <td>{item.id}</td>
                                            <td>{item.email}</td>

                                            <td className={`${item.active ? 'text-success' : 'text-danger'}`} style={{ cursor: "pointer" }} title="Click To Change Status" onClick={() => updateRecord(item.id)}>{item.active ? "Yes" : "No"}</td>
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
