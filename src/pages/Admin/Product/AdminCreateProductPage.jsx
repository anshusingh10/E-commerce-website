import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import FormValidator from '../../../Validations/FormValidator'
import ImageValidator from '../../../Validations/ImageValidator'

import Breadcrum from '../../../components/Breadcrum'
import AdminSidebar from '../../../components/AdminSidebar'

import { createProduct } from "../../../Redux/ActionCreators/ProductActionCreators"
import { getMaincategory } from "../../../Redux/ActionCreators/MaincategoryActionCreators"
import { getSubcategory } from "../../../Redux/ActionCreators/SubcategoryActionCreators"
import { getBrand } from "../../../Redux/ActionCreators/BrandActionCreators"

let rte
export default function AdminCreateProductPage() {
  let refdiv = useRef(null)
  let [data, setData] = useState({
    name: "",
    maincategory: "",
    subcategory: "",
    brand: "",
    color: "",
    size: "",
    basePrice: "",
    discount: "",
    finalPrice: "",
    stock: true,
    stockQuantity: "",
    pic: [],
    active: true
  })

  let [errrorMessage, setErrorMessage] = useState({
    name: "Name Field is Mendatory",
    color: "Color Field is Mendatory",
    size: "Size Field is Mendatory",
    basePrice: "Base Price Field is Mendatory",
    discount: "Discount Field is Mendatory",
    stockQuantity: "Stock Quantity Field is Mendatory",
    pic: "Pic Field is Mendatory",
  })

  let [show, setShow] = useState(false)

  let navigation = useNavigate()
  let dispatch = useDispatch()

  let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
  let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
  let BrandStateData = useSelector(state => state.BrandStateData)


  function getInputData(e) {
    let name = e.target.name
    let value = name === "pic" ? Array.from(e.target.files).map(x => "product/" + x.name) : e.target.value
    // let value = name === "pic" ? e.target.files : e.target.value

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
    let error = Object.values(errrorMessage).find(item => item !== "")
    if (error) {
      setShow(true)
    }
    else {
      let bp = parseInt(data.basePrice)
      let d = parseInt(data.discount)
      let fp = parseInt(bp - bp * d / 100)
      let stockQuantity = parseInt(data.stockQuantity)

      dispatch(createProduct({
        ...data,
        maincategory: data.maincategory || MaincategoryStateData[0].name,
        subcategory: data.subcategory || SubcategoryStateData[0].name,
        brand: data.brand || BrandStateData[0].name,
        basePrice: bp,
        discount: d,
        finalPrice: fp,
        stockQuantity: stockQuantity,
        description: rte.getHTMLCode()
      }))

      // let formData = new FormData()
      // formData.append("name",data.name)
      // formData.append("maincategory",data.maincategory || MaincategoryStateData[0]._id)
      // formData.append("subcategory",data.subcategory || SubcategoryStateData[0]._id)
      // formData.append("brand",data.brand || BrandStateData[0]._id)
      // formData.append("color",data.color)
      // formData.append("size",data.size)
      // formData.append("basePrice",data.basePrice)
      // formData.append("discount",data.discount)
      // formData.append("finalPrice",data.finalPrice)
      // formData.append("stock",data.stock)
      // formData.append("stockQuantity",data.stockQuantity)
      // formData.append("pic",data.pic)
      // formData.append("active",data.active)
      // formData.append("description",rte.getHTMLCode())
      // dispatch(createProduct(formData))

      navigation("/admin/product")
    }
  }

  useEffect(() => {
    (() => {
      dispatch(getMaincategory())
    })()
  }, [MaincategoryStateData.length])

  useEffect(() => {
    (() => {
      dispatch(getSubcategory())
    })()
  }, [SubcategoryStateData.length])

  useEffect(() => {
    (() => {
      dispatch(getBrand())
    })()
  }, [BrandStateData.length])

  useEffect(() => {
    rte = new window.RichTextEditor(refdiv.current);
    rte.setHTMLCode("");
  }, [])

  return (
    <>
      <Breadcrum title="Admin" />
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-3 mb-3">
            <AdminSidebar />
          </div>
          <div className="col-md-9 mb-3">
            <h5 className='bg-primary text-light text-center p-2'>Create Product <Link to="/admin/product"><i className='fa fa-arrow-left-long text-light float-end'></i></Link></h5>
            <form onSubmit={postData}>
              <div className="row">

                <div className="col-12 mb-3">
                  <label>Name*</label>
                  <input type="text" name="name" onChange={getInputData} placeholder='Full Name' className={`form-control border-3 ${show && errrorMessage.name ? 'border-danger' : 'border-primary'}`} />
                  {show && errrorMessage.name ? <p className='text-danger text-capitalize'>{errrorMessage.name}</p> : null}
                </div>

                <div className="col-md-3 mb-3">
                  <label>Maincategory*</label>
                  <select name="maincategory" onChange={getInputData} className='form-control border-3 border-primary'>
                    {
                      MaincategoryStateData.filter(x => x.active).map((item) => {
                        return <option key={item.id}>{item.name}</option>
                        // return <option key={item.id} value={item._id}>{item.name}</option>
                      })
                    }
                  </select>
                </div>

                <div className="col-md-3 mb-3">
                  <label>Subcategory*</label>
                  <select name="subcategory" onChange={getInputData} className='form-control border-3 border-primary'>
                    {
                      SubcategoryStateData.filter(x => x.active).map((item) => {
                        return <option key={item.id}>{item.name}</option>
                        // return <option key={item.id} value={item._id}>{item.name}</option>
                      })
                    }
                  </select>
                </div>

                <div className="col-md-3 mb-3">
                  <label>Brand*</label>
                  <select name="brand" onChange={getInputData} className='form-control border-3 border-primary'>
                    {
                      BrandStateData.filter(x => x.active).map((item) => {
                        return <option key={item.id}>{item.name}</option>
                        // return <option key={item.id} value={item._id}>{item.name}</option>
                      })
                    }
                  </select>
                </div>

                <div className="col-md-3 mb-3">
                  <label>Stock*</label>
                  <select name="stock" onChange={getInputData} className='form-control border-3 border-primary'>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label>Color*</label>
                  <input type="text" name="color" onChange={getInputData} placeholder='Product Color' className={`form-control border-3 ${show && errrorMessage.color ? 'border-danger' : 'border-primary'}`} />
                  {show && errrorMessage.color ? <p className='text-danger text-capitalize'>{errrorMessage.color}</p> : null}
                </div>

                <div className="col-md-6 mb-3">
                  <label>Size*</label>
                  <input type="text" name="size" onChange={getInputData} placeholder='Size' className={`form-control border-3 ${show && errrorMessage.size ? 'border-danger' : 'border-primary'}`} />
                  {show && errrorMessage.size ? <p className='text-danger text-capitalize'>{errrorMessage.size}</p> : null}
                </div>

                <div className="col-md-6 mb-3">
                  <label>Base Price*</label>
                  <input type="number" name="basePrice" onChange={getInputData} placeholder='Base Price' className={`form-control border-3 ${show && errrorMessage.basePrice ? 'border-danger' : 'border-primary'}`} />
                  {show && errrorMessage.basePrice ? <p className='text-danger text-capitalize'>{errrorMessage.basePrice}</p> : null}
                </div>

                <div className="col-md-6 mb-3">
                  <label>Discount*</label>
                  <input type="number" name="discount" onChange={getInputData} placeholder='Discount' className={`form-control border-3 ${show && errrorMessage.discount ? 'border-danger' : 'border-primary'}`} />
                  {show && errrorMessage.discount ? <p className='text-danger text-capitalize'>{errrorMessage.discount}</p> : null}
                </div>

                <div className="col-12 mb-3">
                  <label>Description*</label>
                  <div ref={refdiv} className='border-3 border-primary'></div>
                </div>

                <div className="col-md-4 mb-3">
                  <label>Stock Quantity*</label>
                  <input type="number" name="stockQuantity" onChange={getInputData} placeholder='Stock Quantity' className={`form-control border-3 ${show && errrorMessage.stockQuantity ? 'border-danger' : 'border-primary'}`} />
                  {show && errrorMessage.stockQuantity ? <p className='text-danger text-capitalize'>{errrorMessage.stockQuantity}</p> : null}
                </div>

                <div className="col-md-4 mb-3">
                  <label>Pic*</label>
                  <input type="file" name="pic" multiple onChange={getInputData} className={`form-control border-3 ${show && errrorMessage.pic ? 'border-danger' : 'border-primary'}`} />
                  {show && errrorMessage.pic ? <p className='text-danger text-capitalize'>{errrorMessage.pic}</p> : null}
                </div>

                <div className="col-md-4 mb-3">
                  <label>Active*</label>
                  <select name="active" onChange={getInputData} className='form-select border-3  border-primary'>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                </div>

                <div className="col-12 mb-3">
                  <button type="submit" className='btn btn-primary w-100'>Create</button>
                </div>
              </div>
            </form>
          </div>
        </div >
      </div >
    </>
  )
}
