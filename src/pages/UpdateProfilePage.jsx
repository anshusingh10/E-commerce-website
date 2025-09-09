import { useEffect, useState } from 'react'
import Breadcrum from '../components/Breadcrum'
import FormValidator from '../Validations/FormValidator'
import { useNavigate } from 'react-router-dom'





export default function UpdateProfilePage() {
    let [data, setData] = useState({
        name: '',
        username: '',
        email: '',
        phone: '',
        address: '',
        pin: '',
        city: '',
        state: '',
        pic: ''
    })
    let [errorMessage, setErrorMessage] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        pic: "",

    })
    let [show, setShow] = useState(false)
    let navigate = useNavigate()

    function getInputData(e) {
        let name = e.target.name
        let value = name === "pic" ? "product/" + e.target.files[0].name : e.target.value

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
            let response = await fetch(`${import.meta.env.VITE_SITE_BACKEND_SERVER}user`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }

            })
            response = await response.json()
            let item = response.find(x => x.id !== data.id && (x.username === data.username || x.email === data.email))
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
                let response = await fetch(`${import.meta.env.VITE_SITE_BACKEND_SERVER}user/${data.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ ...data })

                })
                response = await response.json()
                if (data.role === "Buyer")
                    navigate("/profile")
                else
                    navigate("/admin")

            }
        }
    }
    useEffect(() => {
        (async () => {
            let response = await fetch(`${import.meta.env.VITE_SITE_BACKEND_SERVER}user/${localStorage.getItem("userid")}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }

            })
            response = await response.json()
            setData({ ...data, ...response })
        })()
    },[])
    return (
        <>
            <Breadcrum title="Update your Profile Details" />
            <div className="container my-3">
                <div className="row">
                    <div className="col-md-8 col-sm-10 col-11 m-auto">
                        <h5 className='bg-primary tect-center text-light p-2'> SignUp-Create your free Account</h5>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <input type="text" name="name" value={data.name} onChange={getInputData} placeholder="Full Name" className={`form-control border-3 ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}

                                </div>
                                <div className="col-md-6 mb-3">
                                    <input type="text" name="phone" value={data.phone} onChange={getInputData} placeholder="Phone Number" className={`form-control border-3 ${show && errorMessage.phone ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input type="text" name="username" value={data.user} onChange={getInputData} placeholder="user Name" className={`form-control border-3 ${show && errorMessage.username ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.username ? <p className='text-danger'>{errorMessage.username}</p> : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input type="email" name="email" value={data.email} onChange={getInputData} placeholder="Email Adddress" className={`form-control border-3 ${show && errorMessage.email ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email}</p> : null}
                                </div>
                                <div className="mb-3">
                                    <textarea name="address" value={data.address} onChange={getInputData} placeholder='Address...' className="form-control border-3 border-primary"></textarea>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input type="text" name="city" value={data.city} onChange={getInputData} placeholder='City Name' className='form-control border-3 border-primary' />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input type="text" name="pin" value={data.pin} onChange={getInputData} placeholder='Pin Code' className='form-control border-3 border-primary' />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input type="file" name="pic" onChange={getInputData} className='form-control border-3 border-primary' />
                                </div>

                                <div className="mb-3">
                                    <button type="submit" className='btn btn-primary w-100'>Update</button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}
