import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

import $ from 'jquery';
import 'datatables.net'
import 'datatables.net-dt/css/dataTables.dataTables.min.css'

import Breadcrum from '../../../components/Breadcrum'
import AdminSidebar from '../../../components/AdminSidebar'

import { getFeature, deleteFeature } from '../../../Redux/ActionCreators/FeatureActionCreators'




export default function AdminFeaturePage() {
    let FeatureStateData = useSelector(state => state.FeatureStateData)
    let dispatch = useDispatch()

    function deleteRecord(id) {
        if (window.confirm("Are you sure you want to delete this record?")) {
            dispatch(deleteFeature({ id: id }))
            getAPIData()
        }

    }

    function getAPIData() {
        dispatch(getFeature())

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
    }, [FeatureStateData.length])
    return (
        <>
            <Breadcrum title="Admin" />
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3 mb-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9 mb-3">
                        <h5 className='bg-primary text-light text-center p-2'>Feature <Link to="/admin/feature/create"><i className='fa fa-plus text-light float-end'></i></Link></h5>
                        <div className="table-responsive"><table id='DataTable' className='table table-bordered table-striped table-hover'>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Icon</th>
                                    <th>Description</th>
                                    <th>Active</th>
                                    <th></th>
                                    <th></th>

                                </tr>
                            </thead>
                            < tbody>
                                {
                                    FeatureStateData.map(item => {

                                        return <tr key={item.id}>

                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td><span dangerouslySetInnerHTML={{ __html: item.icon }} />
                                            </td>
                                            <td>{item.description}</td>

                                            <td className={`${item.active ? 'text-success' : 'text-danger'}`}>{item.active ? "Yes" : "No"}</td>
                                            <td><Link to={`/admin/feature/update/${item.id}`} className='btn btn-primary'><i className='fa fa-edit'></i></Link></td>
                                            <td>{localStorage.getItem("role") === "Super Admin" ? <button className='btn btn-danger' onClick={() => deleteRecord(item.id)}><i className='fa fa-trash'></i></button> : null}</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
