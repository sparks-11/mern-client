import React, { useEffect, useState } from 'react'
import Product from './Product';


const Products = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://e-com-server-side.herokuapp.com/api/products/find')
    .then(res=>res.json())
      .then(products => {
        setProducts(products)
    })
  },[])

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
