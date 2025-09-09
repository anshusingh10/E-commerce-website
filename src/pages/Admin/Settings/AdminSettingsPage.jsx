import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';


import Breadcrum from '../../../components/Breadcrum'
import AdminSidebar from '../../../components/AdminSidebar'

import { getSettings, createSettings, updateSettings } from '../../../Redux/ActionCreators/SettingsActionCreators'




export default function AdminSettingsPage() {
    let [data, setData] = useState({
        map: "",
        googleMap: "",
        address: "",
        phone: "",
        whatsapp: "",
        email: "",
        siteName: "",
        facebook: "",
        twitter: "",
        instagram: "",
        linkedin: "",
        youtube: ""

    })
    let SettingsStateData = useSelector(state => state.SettingsStateData)
    let dispatch = useDispatch()

    function getInputData(e) {
        let { name, value } = e.target
        setData((old) => {
            return {
                ...old,
                [name]: value
            }
        })

    }

    function postData(e) {
        e.preventDefault()
        if (SettingsStateData.length)
            dispatch(updateSettings({ ...data, id: SettingsStateData[0].id }))
        else
            dispatch(createSettings({ ...data }))

    }
    function getAPIData() {
        dispatch(getSettings())
        if (SettingsStateData.length) {
            setData({
                map: SettingsStateData[0].map ?? "",
                googleMap: SettingsStateData[0].googleMap ?? "",
                address: SettingsStateData[0].address ?? "",
                phone: SettingsStateData[0].phone ?? "",
                whatsapp: SettingsStateData[0].whatsapp ?? "",
                email: SettingsStateData[0].email ?? "",
                siteName: SettingsStateData[0].siteName ?? "",
                facebook: SettingsStateData[0].facebook ?? "",
                twitter: SettingsStateData[0].twitter ?? "",
                instagram: SettingsStateData[0].instagram ?? "",
                linkedin: SettingsStateData[0].linkedin ?? "",
                youtube: SettingsStateData[0].youtube ?? ""


            })
        }
    }

    useEffect(() => {
        getAPIData();

    }, [SettingsStateData.length])
    return (
        <>
            <Breadcrum title="Admin" />
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3 mb-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9 mb-3">
                        <h5 className='bg-primary text-light text-center p-2'>Settings</h5>
                        <form onSubmit={postData}>
                            <div className="row">
                                 <div className="col-md-12 mb-3" >
                                    <label>Contact Us Page Map Url</label>
                                    <input type="url" name="map" value={data.map} onChange={getInputData} className='form-control border-3 border-primary' placeholder='Contact Us Page Map url' />
                                </div>
                                <div className="col-md-12 mb-3" >
                                    <label>Google Map Url</label>
                                    <input type="url" name="googleMap" value={data.googleMap} onChange={getInputData} className='form-control border-3 border-primary' placeholder='googleMap url' />
                                </div>
                                <div className="col-md-12 mb-3" >
                                    <label>Address</label>
                                    <input type="text" name="address" value={data.address} onChange={getInputData} className='form-control border-3 border-primary' placeholder='Address' />
                                </div>
                                <div className="col-md-6 mb-3" >
                                    <label>Phone</label>
                                    <input type="text" name="phone" value={data.phone} onChange={getInputData} className='form-control border-3 border-primary' placeholder='Phone Number' />
                                </div>
                                <div className="col-md-6 mb-3" >
                                    <label>Whatsapp</label>
                                    <input type="text" name="whatsapp" value={data.whatsapp} onChange={getInputData} className='form-control border-3 border-primary' placeholder='Whatsapp Number' />
                                </div>
                                <div className="col-md-6 mb-3" >
                                    <label>Email</label>
                                    <input type="email" name="email" value={data.email} onChange={getInputData} className='form-control border-3 border-primary' placeholder='Email address' />
                                </div>
                                <div className="col-md-6 mb-3" >
                                    <label>Site Name</label>
                                    <input type="text" name="siteName" value={data.siteName} onChange={getInputData} className='form-control border-3 border-primary' placeholder='Site Name' />
                                </div>
                            </div>
                            <div className="col-md-12 mb-3" >
                                <label>Facebook Profile URL</label>
                                <input type="url" name="facebook" value={data.facebook} onChange={getInputData} className='form-control border-3 border-primary' placeholder='Facebook Profile url' />
                            </div>
                            <div className="col-md-12 mb-3" >
                                <label>Instagram Profile URL</label>
                                <input type="url" name="googleMap" value={data.instagram} onChange={getInputData} className='form-control border-3 border-primary' placeholder='instagram Profile URL' />
                            </div>
                            <div className="col-md-12 mb-3" >
                                <label>Twitter Profile URL</label>
                                <input type="url" name="googleMap" value={data.twitter} onChange={getInputData} className='form-control border-3 border-primary' placeholder='Twitter Profile URL' />
                            </div>
                            <div className="col-md-12 mb-3" >
                                <label>Linkedin Profile URL</label>
                                <input type="url" name="linkedin" value={data.linkedin} onChange={getInputData} className='form-control border-3 border-primary' placeholder='Linkedin Profile URL' />
                            </div>
                            <div className="col-md-12 mb-3" >
                                <label>Youtube Profile URL</label>
                                <input type="url" name="youtube" value={data.youtube} onChange={getInputData} className='form-control border-3 border-primary' placeholder='youtube Profile URL' />
                            </div>

                            <div className="col-12">
                                <button type="submit" className='btn btn-primary w-100'>Submit</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}
