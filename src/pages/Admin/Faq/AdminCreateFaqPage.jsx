
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import FormValidator from '../../../Validations/FormValidator';
import Breadcrum from '../../../components/Breadcrum'
import AdminSidebar from '../../../components/AdminSidebar'


import { getFaq, createFaq } from '../../../Redux/ActionCreators/FaqActionCreators'



export default function AdminCreateFaqPage() {

  let [data, setData] = useState({
    question: "",
    answer: "",
    active: true
  })

  let [errorMessage, setErrorMessage] = useState({
    question: "Question Field is Mendatory",
    answer: "Answer Field is Mendatory",


  })

  let [show, setShow] = useState(false)
  let navigation = useNavigate()
  let FaqStateData = useSelector(state => state.FaqStateData)
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
      let item = FaqStateData.find(x => x.question.toLowerCase() === data.question.toLowerCase())
      if (item) {
        setErrorMessage((old) => {
          return {
            ...old,
            "question": "Faq with  same Record is already exist"
          }
        })
        setShow(true)
        return
      }
      dispatch(createFaq({ ...data }))
      // let formData = new FormData()
      // formData.append("_id",data._id)
      // formData.append("question",data.name)
      // formData.append("answer",data.answer)
      // formData.append("active",data.active)
      // dispatch(createFaq(formData))
      navigation("/admin/faq")
    }
  }
  useEffect(() => {
    (() => {
      dispatch(getFaq())
    })()
  }, [FaqStateData.length])

  return (
    <>
      <Breadcrum title="Admin" />
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-3 mb-3">
            <AdminSidebar />
          </div>
          <div className="col-md-9 mb-3">
            <h5 className='bg-primary text-light text-center p-2'>Create Faq <Link to="/admin/faq"><i className='fa fa-arrow-left-long text-light float-end'></i></Link></h5>
            <form onSubmit={postData}>
              <div className="row">

                <div className="col-12 mb-3">
                  <label>Question*</label>
                  <input type="text" name="question" onChange={getInputData} placeholder='Question..' className={`form-control border-3 ${show && errorMessage.question ? 'border-danger' : 'border-primary'}`} />
                  {show && errorMessage.question ? <p className='text-danger text-capitalize'>{errorMessage.question}</p> : null}
                </div>
                <div className="col-12 mb-3   ">
                  <label>Answer*</label>
                  <textarea name="answer" onChange={getInputData} rows={5} placeholder='Answer...' className={`form-control border-3 ${show && errorMessage.message.answer ? 'border-danger' : 'border-primary'}`} textarea />
                  {show && errorMessage.message.answer ? <p className='text-danger text-capitalize'>{errorMessage.message.answer}</p> : null}
                </div>


                <div className="col-md-6 mb-3">
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
        </div>
      </div>
    </>
  )
}
