import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'


import ImageValidator from '../../../Validations/ImageValidator'
import FormValidator from '../../../Validations/FormValidator'

import Breadcrum from '../../../components/Breadcrum'
import AdminSidebar from '../../../components/AdminSidebar'




import { getSubcategory, updateSubcategory } from '../../../Redux/ActionCreators/SubCategoryActionCreators'



export default function AdminUpdateSubcategoryPage() {
  let { id } = useParams()

  let [data, setData] = useState({
    name: "",
    pic: "",
    active: true
  })

  let [errorMessage, setErrorMessage] = useState({
    name: "",
    pic: "",
  })

  let [show, setShow] = useState(false)
  let navigation = useNavigate()

  let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
  let dispatch = useDispatch()

  function getInputData(e) {
    let name = e.target.name
    let value = name === "pic" ? "subcategory/" + e.target.files[0].name : e.target.value
    // when we work on real backend then we will use this line
    // let value = name === "pic" ? e.target.files[0] : e.target.value

    setErrorMessage((old) => {
      return {
        ...old,
        [name]: name === "pic" ? ImageValidator(e) : FormValidator(e)
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
      let item = SubcategoryStateData.find(x => x.id !== id && x.name.toLowerCase() === data.name.toLowerCase())
      if (item) {
        setErrorMessage((old) => {
          return {
            ...old,
            "name": "This Subcategory with same name  is already exist"
          }
        })
        setShow(true)
        return
      }
      dispatch(updateSubcategory({ ...data }))
      // let formData = new FormData()
      // formData.append("_id",data._id)
      // formData.append("name",data.name)
      // formData.append("pic",data.pic)
      // formData.append("active",data.active)
      // dispatch(createSubcategory(formData))

      navigation("/admin/subcategory")
    }
  }
  useEffect(() => {
    (() => {
      dispatch(getSubcategory())
      if (SubcategoryStateData.length) {
        let item = SubcategoryStateData.find(x => x.id === id)
        if (item)
          setData({ ...item })
        else
          navigation("/admin/subcategory")
      }


    })()
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
            <h5 className='bg-primary text-light text-center p-2'>Update Subcategory <Link to="/admin/subcategory"><i className='fa fa-arrow-left-long text-light float-end'></i></Link></h5>
            <form onSubmit={postData}>
              <div className="row">

                <div className="col-12 mb-3">
                  <label>Name*</label>
                  <input type="text" name="name" value={data.name} onChange={getInputData} placeholder='Subcategory Name' className={`form-control border-3 ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`} />
                  {show && errorMessage.name ? <p className='text-danger text-capitalize'>{errorMessage.name}</p> : null}
                </div>

                <div className="col-md-6 mb-3">
                  <label>Pic</label>
                  <input type="file" name="pic" onChange={getInputData} className={`form-control border-3 ${show && errorMessage.pic ? 'border-danger' : 'border-primary'}`} />
                  {show && errorMessage.pic ? <p className='text-danger text-capitalize'>{errorMessage.pic}</p> : null}
                </div>

                <div className="col-md-6 mb-3">
                  <label>Active*</label>
                  <select name="active" value={data.active ? "1" : "0"} onChange={getInputData} className='form-select border-3  border-primary'>
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
