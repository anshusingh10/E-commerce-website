

import { Link } from 'react-router-dom';
import Breadcrum from '../components/Breadcrum';

export default function ConfirmationPage() {
    return (
        <>
            <Breadcrum title="Order Has Been Placed" />
            <div className="container-fluid my-5">
                <div className='text-center my-2'>
                    <h3> Thank You</h3>
                    <h4>Your Order Has Been Placed</h4>
                    <h5>Now You Can Track Your Order in Profile Page</h5>
                    <div className="btn-group">
                        <Link to="/profile" className='btn btn-success'>Profile</Link>
                        <Link to="/shop" className='btn btn-primary'>Shop More</Link>

                    </div>
                </div>
            </div>
        </>
    )
}
