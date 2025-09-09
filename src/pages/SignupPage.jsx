import { useState } from 'react'
import Breadcrum from '../components/Breadcrum'
import FormValidator from '../Validations/FormValidator'
import { Link, useNavigate } from 'react-router-dom'





export default function SignupPage() {
    let [data, setData] = useState({
        name: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        cpassword: ''
    })
    let [errorMessage, setErrorMessage] = useState({
        name: "Full Name field is Mandatory",
        username: "User Name field is Mandatory",
        email: "Email field is Mandatory",
        phone: "Phone Number  field is Mandatory",
        password: "Password field is Mandatory",

    })
    let [show, setShow] = useState(false)
    let navigate = useNavigate()

    function getInputData(e) {
        let { name, value } = e.target
        setShow(false)
        setErrorMessage((old) => {
            return {
                ...old,
                [name]: FormValidator(e)
            }
        })
        setData((old) => {
            return {
                ...old,
                [name]: value
            }
        })

    }
    async function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find(x => x !== "")
        if (error)
            setShow(true)
        else {
            if (data.password === data.cpassword) {

                let response = await fetch(`${import.meta.env.VITE_SITE_BACKEND_SERVER}user`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }

                })
                response = await response.json()
                let item = response.find(x => x.username === data.username || x.email === data.email)
                if (item) {
                    setShow(true)
                    setErrorMessage((old) => {
                        return {
                            ...old,
                            'username': item.username === data.username ? "Username already exists" : "",
                            'email': item.email === data.email ? "Email  Address already exists" : ""
                        }
                    })
                }
                else {
                    let response = await fetch(`${import.meta.env.VITE_SITE_BACKEND_SERVER}user`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            name: data.name,
                            email: data.email,
                            username: data.username,
                            phone: data.phone,
                            password: data.password,
                            role: "Buyer",
                            active: true
                        })

                    })
                    response = await response.json()
                    navigate("/login")

                }
            }
            else {

                setErrorMessage((old) => {
                    return {
                        ...old,
                        'password': "Password and Confirm Password should be same"
                    }
                })
            }

        }
    }

    return (
        <>
            <Breadcrum title="Create your free Account" />
            <div className="container my-3">
                <div className="row">
                    <div className="col-md-8 col-sm-10 col-11 m-auto">
                        <h5 className='bg-primary tect-center text-light p-2'> SignUp-Create your free Account</h5>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <input type="text" name="name" onChange={getInputData} placeholder="Full Name" className={`form-control border-3 ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}

                                </div>
                                <div className="col-md-6 mb-3">
                                    <input type="text" name="phone" onChange={getInputData} placeholder="Phone Number" className={`form-control border-3 ${show && errorMessage.phone ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input type="text" name="username" onChange={getInputData} placeholder="user Name" className={`form-control border-3 ${show && errorMessage.username ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.username ? <p className='text-danger'>{errorMessage.username}</p> : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input type="email" name="email" onChange={getInputData} placeholder="Email Adddress" className={`form-control border-3 ${show && errorMessage.email ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email}</p> : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input type="password" name="password" onChange={getInputData} placeholder="Password" className={`form-control border-3 ${show && errorMessage.password ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.password ? <p className='text-danger'>{errorMessage.password}</p> : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input type="password" name="cpassword" onChange={getInputData} placeholder=" Confirm Password" className={`form-control border-3 ${show && errorMessage.password ? 'border-danger' : 'border-primary'}`} />

                                </div>
                                <div className="mb-3">
                                    <button type="submit" className='btn btn-primary w-100'>Signup</button>
                                </div>
                            </div>
                        </form>
                        <Link to="/login" >Already have an account? Login</Link>
                    </div>
                </div>
            </div>
        </>
    )
}
