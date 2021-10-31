import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/apiCalls';
import Product from './Product';


const Products = () => {


  const dispatch = useDispatch()
  const products = useSelector(state=>state.product.products)
  useEffect(() => {
    getProducts(dispatch)
  }, [dispatch])

  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   fetch('https://e-com-server-side.herokuapp.com/api/products/find')
  //   .then(res=>res.json())
  //     .then(products => {
  //       setProducts(products)
  //   })
  // },[])

  return (
    <div className="container mx-auto pb-24">
      <h1 className=" text-lg my-8 font-bold">Products</h1>
      <div className="px-20 flex flex-wrap sm:grid-cols-1 my-8 gap-24">
        {
          products.map(product => <Product key={product._id} product={product} />)
        }
      </div>
    </div>

  )
}

export default Products;
