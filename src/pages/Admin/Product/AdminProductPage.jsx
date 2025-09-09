import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

import $ from 'jquery';
import 'datatables.net'
import 'datatables.net-dt/css/dataTables.dataTables.min.css'

import Breadcrum from '../../../components/Breadcrum'
import AdminSidebar from '../../../components/AdminSidebar'

import { getProduct, deleteProduct } from '../../../Redux/ActionCreators/ProductActionCreators'




export default function AdminProductPage() {
    let ProductStateData = useSelector(state => state.ProductStateData)
    let dispatch = useDispatch()

    function deleteRecord(id) {
        if (window.confirm("Are you sure you want to delete this record?")) {
            dispatch(deleteProduct({ id: id }))
            getAPIData()
        }

    }

    function getAPIData() {
        dispatch(getProduct())

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
    }, [ProductStateData.length])
    return (
        <>
            <Breadcrum title="Admin" />
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3 mb-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9 mb-3">
                        <h5 className='bg-primary text-light text-center p-2'>Product <Link to="/admin/product/create"><i className='fa fa-plus text-light float-end'></i></Link></h5>
                        <div className="table-responsive"><table id='DataTable' className='table table-bordered table-striped table-hover'>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Maincategory</th>
                                    <th>Subcategory</th>
                                    <th>Brand</th>
                                    <th>Color</th>
                                    <th>Size</th>
                                    <th>Base Price</th>
                                    <th>Discount</th>
                                    <th>Final Price</th>
                                    <th>Stock</th>
                                    <th>Stock Quantity</th>
                                    <th>Pic</th>
                                    <th>Active</th>
                                    <th></th>
                                    <th></th>

                                </tr>
                            </thead>
                            < tbody>
                                {
                                    ProductStateData.map(item => {

                                        return <tr key={item.id}>

                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.maincategory}</td>
                                            <td>{item.subcategory}</td>
                                            <td>{item.brand}</td>
                                            <td>{item.color}</td>
                                            <td>{item.size}</td>
                                            <td>&#8377;{item.basePrice}</td>
                                            <td>{item.discount}%off</td>
                                            <td>&#8377;{item.finalPrice}</td>
                                            <td>{item.stock ? "Yes" : "No"}</td>
                                            <td>{item.stockQuantity}</td>

                                            <td>
                                                <div className="table-product-images">
                                                    {item.pic?.map((pic, index) => (
                                                        <Link key={index} to={`${import.meta.env.VITE_SITE_BACKEND_SERVER}${pic}`} target="_blank" rel='noreferrer'>
                                                            <img src={`${import.meta.env.VITE_SITE_BACKEND_SERVER}${pic}`} width={70} height={50} className='rounded' />
                                                        </Link>
                                                    ))}
                                                </div>
                                            </td>

                                            <td className={`${item.active ? 'text-success' : 'text-danger'}`}>{item.active ? "Yes" : "No"}</td>
                                            <td><Link to={`/admin/product/update/${item.id}`} className='btn btn-primary'><i className='fa fa-edit'></i></Link></td>
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
