import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

import $ from 'jquery';
import 'datatables.net'
import 'datatables.net-dt/css/dataTables.dataTables.min.css'

import Breadcrum from '../../../components/Breadcrum'
import AdminSidebar from '../../../components/AdminSidebar'

import { getSubcategory, deleteSubcategory } from '../../../Redux/ActionCreators/SubCategoryActionCreators'




export default function AdminSubcategoryPage() {
    let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
    let dispatch = useDispatch()

    function deleteRecord(id) {
        if (window.confirm("Are you sure you want to delete this record?")) {
            dispatch(deleteSubcategory({ id: id }))
            getAPIData()
        }

    }

    function getAPIData() {
        dispatch(getSubcategory())

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
    }, [SubcategoryStateData.length])
    return (
        <>
            <Breadcrum title="Admin" />
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3 mb-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9 mb-3">
                        <h5 className='bg-primary text-light text-center p-2'>Subcategory <Link to="/admin/subcategory/create"><i className='fa fa-plus text-light float-end'></i></Link></h5>
                        <div className="table-responsive"><table id='DataTable' className='table table-bordered table-striped table-hover'>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Pic</th>
                                    <th>Active</th>
                                    <th></th>
                                    <th></th>

                                </tr>
                            </thead>
                            < tbody>
                                {
                                    SubcategoryStateData.map(item => {

                                        return <tr key={item.id}>

                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>
                                                <Link to={`${import.meta.env.VITE_SITE_BACKEND_SERVER}${item.pic}`} target="_blank" rel='noreferrer'>
                                                    <img src={`${import.meta.env.VITE_SITE_BACKEND_SERVER}${item.pic}`} width={100} height={80} className='rounded' />
                                                </Link>
                                            </td>
                                            <td className={`${item.active ? 'text-success' : 'text-danger'}`}>{item.active ? "Yes" : "No"}</td>
                                            <td><Link to={`/admin/subcategory/update/${item.id}`} className='btn btn-primary'><i className='fa fa-edit'></i></Link></td>
                                            <td>{localStorage.getItem("role")==="Super Admin"?<button className='btn btn-danger' onClick={() => deleteRecord(item.id)}><i className='fa fa-trash'></i></button>:null}</td>
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
