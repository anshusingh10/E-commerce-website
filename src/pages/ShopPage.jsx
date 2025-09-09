
import Breadcrum from '../components/Breadcrum'
import { getMaincategory } from "../Redux/ActionCreators/MainCategoryActionCreators"
import { getSubcategory } from "../Redux/ActionCreators/SubCategoryActionCreators"
import { getBrand } from "../Redux/ActionCreators/BrandActionCreators"
import { getProduct } from "../Redux/ActionCreators/ProductActionCreators"
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useSearchParams } from 'react-router-dom'


export default function ShopPage() {

  let [data, setData] = useState([])
  let [mc, setMc] = useState("")
  let [sc, setSc] = useState("")
  let [br, setBr] = useState("")
  let [sort, setsort] = useState("1")
  let [search, setSearch] = useState("")

  let [min, setMin] = useState(-1)
  let [max, setMax] = useState(-1)

  let [searchParams] = useSearchParams()

  let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
  let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
  let BrandStateData = useSelector(state => state.BrandStateData)
  let ProductStateData = useSelector(state => state.ProductStateData)
  let dispatch = useDispatch()

  function filterProducts(mc, sc, br) {
    setData(ProductStateData.filter(x => x.active &&
      (mc === "All" || x.maincategory === mc) &&
      (sc === "All" || x.subcategory === sc) &&
      (br === "All" || x.brand === br) &&
      (min === -1 || (x.finalPrice >= min && x.finalPrice <= max))
    ))
  }
  function postSortFilter(e) {
    let value = e.target.value
    if (value === "1")
      setData([...data].sort((x, y) => y.id.localeCompare(x.id)))
    else if (value === "2")
      setData([...data].sort((x, y) => y.finalPrice - x.finalPrice))
    else
      setData([...data].sort((x, y) => x.finalPrice - y.finalPrice))
  }
  function postSearch(e) {
    e.preventDefault()
    setData(ProductStateData.filter(x => x.active &&
      (
        (x.name?.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
          x.maincategory?.toLocaleLowerCase() === search.toLocaleLowerCase() ||
          x.subcategory?.toLocaleLowerCase() === search.toLocaleLowerCase() ||
          x.brand?.toLocaleLowerCase() === search.toLocaleLowerCase() ||
          x.color?.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
          x.description?.toLocaleLowerCase().includes(search.toLocaleLowerCase())) &&
        (min === -1 || (x.finalPrice >= min && x.finalPrice <= max))
      )
    ))
  }


  useEffect(() => {
    dispatch(getMaincategory())
  }, [MaincategoryStateData.length])

  useEffect(() => {
    dispatch(getSubcategory())
  }, [SubcategoryStateData.length])

  useEffect(() => {
    dispatch(getBrand())
  }, [BrandStateData.length])

  useEffect(() => {
    dispatch(getProduct())
    if (ProductStateData.length) {
      setData(ProductStateData.filter(x => x.active))
    }
  }, [ProductStateData.length])
  useEffect(
    () => {
      setSearch("")
      let mc = searchParams.get("mc") || "All"
      let sc = searchParams.get("sc") || "All"
      let br = searchParams.get("br") || "All"
      setMc(mc)
      setSc(sc)
      setBr(br)
      filterProducts(mc, sc, br)
    }, [searchParams])

  return (

    <>
      <Breadcrum title="Shop" />
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-3">
            <div className="list-group mb-3">
              <p className="list-group-item list-group-item-action active" aria-current="true">
                Maincategory
              </p>
              <Link to={`/shop?mc=All&sc=${sc}&br=${br}`} className="list-group-item list-group-item-action">All{mc === "All" ? <i className='fa fa-check text-primary float-end'></i> : null}</Link>
              {
                MaincategoryStateData.filter(x => x.active).map(item => {
                  return <Link key={item.id} to={`/shop?mc=${item.name}&sc=${sc}&br=${br}`} className="list-group-item list-group-item-action">{item.name}{mc === item.name ? <i className='fa fa-check text-primary float-end'></i> : null}</Link>
                })
              }
            </div>
            <div className="list-group mb-3">
              <p className="list-group-item list-group-item-action active" aria-current="true">
                Subcategory
              </p>
              <Link to={`/shop?mc=${mc}&sc=All&br=${br}`} className="list-group-item list-group-item-action">All{sc === "All" ? <i className='fa fa-check text-primary float-end'></i> : null}</Link>
              {
                SubcategoryStateData.filter(x => x.active).map(item => {
                  return <Link key={item.id} to={`/shop?mc=${mc}&sc=${item.name}&br=${br}`} className="list-group-item list-group-item-action">{item.name}{sc === item.name ? <i className='fa fa-check text-primary float-end'></i> : null}</Link>
                })
              }
            </div>
            <div className="list-group mb-3">
              <p className="list-group-item list-group-item-action active" aria-current="true">
                Brand
              </p>
              <Link to={`/shop?mc=${mc}&sc=${sc}&br=All`} className="list-group-item list-group-item-action">All{br === "All" ? <i className='fa fa-check text-primary float-end'></i> : null}</Link>
              {
                BrandStateData.filter(x => x.active).map(item => {
                  return <Link key={item.id} to={`/shop?mc=${mc}&sc=${sc}&br=${item.name}`} className="list-group-item list-group-item-action">{item.name}{br === item.name ? <i className='fa fa-check text-primary float-end'></i> : null}</Link>
                })
              }
            </div>
            <div className=" list-group mb-3">
              <p className="list-group-item list-group-item-action active" aria-current="true">
                Price Range
              </p>
              <form onSubmit={(e) => {
                e.preventDefault()
                if (search !== '')
                  postSearch(e)
                else
                  filterProducts(mc, sc, br)
              }}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input type="number" name="min" onChange={(e) => setMin(e.target.value)} value={min} placeholder='Min.Amount' className='form-control border-3 border-primary' />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input type="number" name="max" onChange={(e) => setMax(e.target.value)} value={max} placeholder='Max.Amount' className='form-control border-3 border-primary' />
                  </div>
                </div>
                <div className="btn-group w-100 mb-3">
                  <button type="button" onClick={() => {
                    setMin(-1)
                    setMax(-1)
                  }} className='btn btn-danger'>Reset</button>
                  <button type="submit" className='btn btn-primary '>Apply Filters</button></div>
              </form>
            </div>
          </div>
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-9 mb-3">
                <form onSubmit={postSearch}>
                  <div className="btn-group w-100">
                    <input type="search" name="search" onChange={(e) => setSearch(e.target.value)} value={search} placeholder="Search Products By name,category,color,brand etc" className='form-control border-3 border-primary rounded-0 rounded-start' />
                    <button type="submit" className='btn btn-primary'>Search
                    </button>
                  </div>
                </form>
              </div>
              <div className="col-md-3 mb-3">
                <select name="sort" value={sort} onChange={postSortFilter} className='form-select border-3 border-primary'>
                  <option value="1">Latest</option>
                  <option value="2">Price:High to Low</option>
                  <option value="3">Price:Low to High</option>
                </select>
              </div>

            </div>

            <div className="row">    {
              data.map(item => {
                return <div key={item.id} className="col-md-6 col-lg-4 position-relative my-2" >
                  <div className="service-item">
                    <div className="service-img">
                      <img src={`${import.meta.env.VITE_SITE_BACKEND_SERVER}${item.pic[0]}`} height={250} className="rounded-top w-100" alt="Image" />
                    </div>
                    <div className='btn-group w-100'>
                      <h6 className='bg-primary text-center w-50 p-2 text-light'> {item.brand}</h6>
                      <h6 className='bg-success text-center w-50 p-2 text-light'> {item.stockQuantity} Left In Stock</h6>
                    </div>
                    <div className="rounded-bottom p-4">
                      <Link to={`/Product/${item.id}`} className="h5 d-inline-block mb-4 text-center">{item.name}</Link>
                      <p className="mb-4"><del className='text-danger'>&#8377;{item.basePrice}</del><span className='fs-5'>&#8377;{item.finalPrice}</span><sup className='fs-5'>{item.discount}%Off</sup></p>
                      <Link className="btn btn-primary rounded-pill py-2 px-4 w-100" to={`/Product/${item.id}`}>Add to Cart</Link>
                    </div>
                  </div>
                  <div className='position-absolute text-center w-100' style={{ top: -10 }}>
                    <span className='rounded-pill bg-primary py-2 px-5 text-light '>  {item.brand}</span>
                  </div>
                </div>

              })
            }</div>
          </div>
        </div>
      </div>
    </>
  )
}
