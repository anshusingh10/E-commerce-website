import Breadcrum from '../../components/Breadcrum'
import AdminSidebar from '../../components/AdminSidebar'
import Profile from '../../components/Profile'

export default function AdminHomePage() {
    return (
        <>
            <Breadcrum title="Admin" />
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3 mb-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9 mb-3">
                        <Profile title="Admin" />
                    </div>
                </div>
            </div>
        </>
    )
}
