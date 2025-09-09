import { useState } from 'react'
import Breadcrum from '../components/Breadcrum'
import { Link, useNavigate } from 'react-router-dom'





export default function LoginPage() {
    let [data, setData] = useState({

        username: '',
        password: '',
    })
    let [errorMessage, setErrorMessage] = useState("")
    let navigate = useNavigate()

    function getInputData(e) {
        let { name, value } = e.target
        setErrorMessage("")
        setData((old) => {
            return {
                ...old,
                [name]: value
            }
        })

    }
    async function postData(e) {
        e.preventDefault()
        let response = await fetch(`${import.meta.env.VITE_SITE_BACKEND_SERVER}user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }

        })
        response = await response.json()
        let user = response.find(
            (x => (x.username === data.username || x.email === data.username) && x.password === data.password)
        )
        if (user && user.active === false)
            setErrorMessage("Your Account has been Block,Please write a Contact us Query to Unblock Your Account")
        else if (user) {
            localStorage.setItem("login", true)
            localStorage.setItem("name", user.name)
            localStorage.setItem("userid", user.id)
            localStorage.setItem("role", user.role)
            if (user.role === "Buyer")
                navigate("/profile")
            else
                navigate("/admin")

        }
        else {
            setErrorMessage("Invalid Username or Password")
        }
    }

    return (
        <>
            <Breadcrum title=" Login-to Access Your Accountt" />
            <div className="container my-3">
                <div className="row">
                    <div className="col-md-8 col-sm-10 col-11 m-auto">
                        <h5 className='bg-primary tect-center text-light p-2'> Login-to Access Your Account</h5>
                        <form onSubmit={postData}>
                            <div className="row">

                                <div className="mb-3">
                                    <input type="text" name="username" onChange={getInputData} placeholder="user Name Or Email Address" className={`form-control border-3 ${errorMessage ? 'border-danger' : 'border-primary'}`} />
                                    {errorMessage ? <p className='text-danger'>{errorMessage}</p> : null}
                                </div>

                                <div className="mb-3">
                                    <input type="password" name="password" onChange={getInputData} placeholder="Password" className={`form-control border-3 border-primary`} />
                                </div>

                                <div className="mb-3">
                                    <button type="submit" className='btn btn-primary w-100'>Login</button>
                                </div>
                            </div>
                        </form>
                        <div className="d-flex justify-content-between">
                            <Link to="#" >Forget Password?</Link>
                            <Link to="/signup" >Doesn't have an account? Signup</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
