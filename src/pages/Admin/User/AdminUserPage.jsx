import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

import $ from 'jquery';
import 'datatables.net'
import 'datatables.net-dt/css/dataTables.dataTables.min.css'

import Breadcrum from '../../../components/Breadcrum'
import AdminSidebar from '../../../components/AdminSidebar'

import { getUser, deleteUser, updateUser } from '../../../Redux/ActionCreators/UserActionCreators'




export default function AdminUserPage() {
    let [data, setData] = useState([])
    let [flag, setFlag] = useState(false)
    let UserStateData = useSelector(state => state.UserStateData)
    let dispatch = useDispatch()

    function deleteRecord(id) {
        if (window.confirm("Are you sure you want to delete this record?")) {
            dispatch(deleteUser({ id: id }))
            getAPIData()
        }

    }
    function updateRecord(id) {
        if (window.confirm("Are you sure you want to update status:")) {
            let item = UserStateData.find(x => x.id === id)
            let index = UserStateData.findIndex(x => x.id === id)
            dispatch(updateUser({ ...item, active: !item.active }))
            data[index].active = !item.active
            setFlag(!flag)

        }
    }
    function getAPIData() {
        dispatch(getUser())
        if (UserStateData.length)
            setData(UserStateData)
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
    }, [UserStateData.length])
    return (
        <>
            <Breadcrum title="Admin" />
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3 mb-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9 mb-3">
                        <h5 className='bg-primary text-light text-center p-2'>User {localStorage.getItem("role") === "Superr Admin" ? <Link to="/admin/User/create"><i className='fa fa-plus text-light float-end'></i></Link> : null}</h5>
                        <div className="table-responsive"><table id='DataTable' className='table table-bordered table-striped table-hover'>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>UserName</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Role</th>
                                    <th>Active</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            < tbody>
                                {
                                    UserStateData.map(item => {

                                        return <tr key={item.id}>

                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.username}</td>
                                            <td>{item.email}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.role}</td>
                                            <td className={`${item.active ? 'text-success' : 'text-danger'}`} style={{ cursor: "pointer" }} onClick={() => updateRecord(item.id)}>{item.active ? "Yes" : "No"}</td>
                                            <td>{item.role === "Buyer" || localStorage.getItem("role") !== "Super Admin" ? null : <Link to={`/admin/user/update/${item.id}`} className='btn btn-primary'><i className='fa fa-edit'></i></Link>}</td>
                                            <td>{item.role === "Buyer" || localStorage.getItem("role") !== "Super Admin" ? null : <button className='btn btn-danger' onClick={() => deleteRecord(item.id)}><i className='fa fa-trash'></i></button>}</td>

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
