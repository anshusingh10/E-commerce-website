
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import FormValidator from '../../../Validations/FormValidator';
import Breadcrum from '../../../components/Breadcrum'
import AdminSidebar from '../../../components/AdminSidebar'


import { getUser, createUser } from '../../../Redux/ActionCreators/UserActionCreators'



export default function AdminCreateUserPage() {

  let [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
    role: "",
    active: true
  })

  let [errorMessage, setErrorMessage] = useState({
    name: "Name Field is Mendatory",
    username: "username Field is Mendatory",
    email: "Email Field is Mendatory",
    phone: "Phone Field is Mendatory",
    password: "Password Field is Mendatory"
  })

  let [show, setShow] = useState(false)
  let navigation = useNavigate()
  let UserStateData = useSelector(state => state.UserStateData)
  let dispatch = useDispatch()

  function getInputData(e) {
    let { name, value } = e.target

    setErrorMessage((old) => {
      return {
        ...old,
        [name]: FormValidator(e)
      }
    })
    setData((old) => {
      return {
        ...old,
        [name]: name === "active" ? (value === "1" ? true : false) : value
      }
    })
  }
  function postData(e) {
    e.preventDefault()
    let error = Object.values(errorMessage).find((item) => item !== "")
    if (error) {
      setShow(true)
    }
    else if (data.password !== data.cpassword) {
      setErrorMessage((old) => {
        return {
          ...old,
          'password': "Password and Confirm Password Doesn't Matched"
        }
      })

    }
    else {
      let item = UserStateData.find(x => x.username.toLowerCase() === data.username.toLowerCase() || x.email.toLowerCase() === data.email.toLowerCase())
      if (item) {
        setErrorMessage((old) => {
          return {
            ...old,
            "username": item.username.toLowerCase() === data.username.toLowerCase() ? "Username Already Taken" : "",
            "email": item.email.toLowerCase() === data.email.toLowerCase() ? "Email Already Taken" : "",

          }
        })
        setShow(true)
        return
      }
      dispatch(createUser({ ...data }))

      navigation("/admin/user")
    }
  }
  useEffect(() => {
    (() => {
      dispatch(getUser())
    })()
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
            <h5 className='bg-primary text-light text-center p-2'>Create User <Link to="/admin/User"><i className='fa fa-arrow-left-long text-light float-end'></i></Link></h5>
            <form onSubmit={postData}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Name*</label>
                  <input type="text" name="name" onChange={getInputData} placeholder="Full Name" className={`form-control border-3 ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`} />
                  {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}

                </div>
                <div className="col-md-6 mb-3">
                  <label>Phone*</label>
                  <input type="text" name="phone" onChange={getInputData} placeholder="Phone Number" className={`form-control border-3 ${show && errorMessage.phone ? 'border-danger' : 'border-primary'}`} />
                  {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : null}
                </div>
                <div className="col-md-6 mb-3">
                  <label>Username*</label>
                  <input type="text" name="username" onChange={getInputData} placeholder="user Name" className={`form-control border-3 ${show && errorMessage.username ? 'border-danger' : 'border-primary'}`} />
                  {show && errorMessage.username ? <p className='text-danger'>{errorMessage.username}</p> : null}
                </div>
                <div className="col-md-6 mb-3">
                  <label>Email*</label>
                  <input type="email" name="email" onChange={getInputData} placeholder="Email Adddress" className={`form-control border-3 ${show && errorMessage.email ? 'border-danger' : 'border-primary'}`} />
                  {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email}</p> : null}
                </div>
                <div className="col-md-6 mb-3">
                  <label>Password*</label>
                  <input type="password" name="password" onChange={getInputData} placeholder="Password" className={`form-control border-3 ${show && errorMessage.password ? 'border-danger' : 'border-primary'}`} />
                  {show && errorMessage.password ? <p className='text-danger'>{errorMessage.password}</p> : null}
                </div>
                <div className="col-md-6 mb-3">
                  <label>Confirm Password*</label>
                  <input type="password" name="cpassword" onChange={getInputData} placeholder=" Confirm Password" className={`form-control border-3 ${show && errorMessage.password ? 'border-danger' : 'border-primary'}`} />

                </div>
                <div className="col-md-6 mb-3">
                  <label>Role*</label>
                  <select name="role" onChange={getInputData} className='form-select border-3 border-primary'>
                    <option>Admin</option>
                    <option>Super Admin</option>
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label>Active*</label>
                  <select name="active" onChange={getInputData} className='form-select border-3 border-primary'>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                </div>
                <div className="mb-3">
                  <button type="submit" className='btn btn-primary w-100'>Create</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
