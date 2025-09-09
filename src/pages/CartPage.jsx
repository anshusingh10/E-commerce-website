
import Cart from '../components/Cart';
import Breadcrum from './../components/Breadcrum';

export default function CartPage() {
  return (
    <>
      <Breadcrum title="Cart" />
      <div className="container-fluid my-2">
        <Cart title="Cart"/>
      </div>

    </>
  )
}
