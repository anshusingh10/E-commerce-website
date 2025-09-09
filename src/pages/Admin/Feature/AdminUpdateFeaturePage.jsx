
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

import FormValidator from '../../../Validations/FormValidator';
import Breadcrum from '../../../components/Breadcrum'
import AdminSidebar from '../../../components/AdminSidebar'


import { getFeature, updateFeature } from '../../../Redux/ActionCreators/FeatureActionCreators'



export default function AdminupdateFeaturePage() {
  let { id } = useParams()

  let [data, setData] = useState({
    name: "",
    icon: "",
    description: "",
    active: true
  })

  let [errorMessage, setErrorMessage] = useState({
    name: "",
    icon: "",
    description: ""

  })

  let [show, setShow] = useState(false)
  let navigation = useNavigate()
  let FeatureStateData = useSelector(state => state.FeatureStateData)
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
    else {
      let item = FeatureStateData.find(x => x.id !== x.id && x.name.toLowerCase() === data.name.toLowerCase())
      if (item) {
        setErrorMessage((old) => {
          return {
            ...old,
            "name": "This Feature with same name  is already exist"
          }
        })
        setShow(true)
        return
      }
      dispatch(updateFeature({ ...data }))
      // let formData = new FormData()
      // formData.append("_id",data._id)
      // formData.append("name",data.name)
      // formData.append("icon",data.icon)
      // formData.append("description",data.description)
      // formData.append("active",data.active)
      // dispatch(UpdateFeature(formData))
      navigation("/admin/feature")
    }
  }
  useEffect(() => {
    (() => {
      dispatch(getFeature())
      if (FeatureStateData.length) {
        let item = FeatureStateData.find(x => x.id === id)
        if (item)
          setData({ ...item })
        else
          navigation("/admin/feature")
      }

    })()
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
            <h5 className='bg-primary text-light text-center p-2'>Update Feature <Link to="/admin/feature"><i className='fa fa-arrow-left-long text-light float-end'></i></Link></h5>
            <form onSubmit={postData}>
              <div className="row">

                <div className="col-12 mb-3">
                  <label>Name*</label>
                  <input type="text" name="name" onChange={getInputData} value={data.name} placeholder='Feature Name' className={`form-control border-3 ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`} />
                  {show && errorMessage.name ? <p className='text-danger text-capitalize'>{errorMessage.name}</p> : null}
                </div>
                <div className="col-12 mb-3   ">
                  <label>Description*</label>
                  <textarea name="description" onChange={getInputData} value={data.description} placeholder='Description...' className={`form-control border-3 ${show && errorMessage.message ? 'border-danger' : 'border-primary'}`} textarea />
                  {show && errorMessage.message ? <p className='text-danger text-capitalize'>{errorMessage.message}</p> : null}
                </div>
                <div className="col-md-6 mb-3">
                  <label>Icon*</label>
                  <input type="text" name="icon" onChange={getInputData} placeholder='Icon...' value={data.icon} className={`form-control border-3 ${show && errorMessage.icon ? 'border-danger' : 'border-primary'}`} />
                  {show && errorMessage.icon ? <p className='text-danger text-capitalize'>{errorMessage.pic}</p> : null}
                </div>

                <div className="col-md-6 mb-3">
                  <label>Active*</label>
                  <select name="active" onChange={getInputData} value={data.active ? "1" : 0} className='form-select border-3  border-primary'>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                </div>

                <div className="col-12 mb-3">
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
