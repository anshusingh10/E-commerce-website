import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Profile({ title }) {
    let [user, setUser] = useState({})
    let navigate = useNavigate()
    useEffect(() => {
        (async () => {
            let response = await fetch(`${import.meta.env.VITE_SITE_BACKEND_SERVER}user/${localStorage.getItem("userid")}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }

            })
            response = await response.json()
            if (response)
                setUser({ ...response })
            else
                navigate("/login")
        })()
    }, [])
    return (
        <div className='row'>
            <div className={`${title === "Checkout" ? 'd-none' : 'col-md-6'}`}>
                {
                    user.pic ?
                        <img src={`${import.meta.env.VITE_SITE_BACKEND_SERVER}${user.pic}`} alt="" className='w-100' height={460} />
                        :
                        <img src="/img/noimage.jpg" alt="" className='w-100' height={460} />
                }
            </div>
            <div className={`${title === "Checkout" ? 'col-12' : 'col-md-6'}`}>
                <h5 className='bg-primary text-light p-2 text-center'>{title === "Checkout" ? "Billing Address" : `${title} Section`}</h5>
                <div className="table-responsive">
                    <table className='table table-bordered table-striped table-hover'>
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <td>{user.name}</td>
                            </tr>
                            <tr>
                                <th>User Name</th>
                                <td>{user.username}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>{user.email}</td>
                            </tr>
                            <tr>
                                <th>Phone</th>
                                <td>{user.phone}</td>
                            </tr>
                            <tr>
                                <th>Role</th>
                                <td>{user.role}</td>
                            </tr>
                            {
                                title === "Buyer" || title === "Checkout" ?
                                    <>
                                        <tr>
                                            <th>Address</th>
                                            <td>{user.address}</td>
                                        </tr>
                                        <tr>
                                            <th>Pin</th>
                                            <td>{user.pin}</td>
                                        </tr>
                                        <tr>
                                            <th>City</th>
                                            <td>{user.city}</td>
                                        </tr>
                                        <tr>
                                            <th>State</th>
                                            <td>{user.state}</td>
                                        </tr>
                                    </> : null
                            }
                            <tr>
                                <td colSpan={2}><Link to="/update-profile" className='btn btn-primary w-100'>Update Profile</Link></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
