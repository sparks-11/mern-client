import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { addProduct } from "../redux/cartRedux";


const SingleProduct = () => {

  const [product, setProduct] = useState({});
  const params = useParams();
  const history = useHistory();
  const [isAdding, setIsAdding] = useState(false);
  const dispatch = useDispatch()

  const addToCart = (event, product) => {
    event.preventDefault();
    dispatch(addProduct({ product: product, price: product.price }));

    setIsAdding(true);
    setTimeout(() => {
    setIsAdding(false)
    },1000);
  }

  
  useEffect(() => {
    fetch(`https://e-com-server-side.herokuapp.com/api/products/find/${params._id}`)
      .then(res => res.json())
      .then(product => setProduct(product))
  }, [params._id]);

  return (
    <div className="container mx-auto mt-12">
      <button className='mb-12 font-bold' onClick={()=>{history.goBack()}}>Back</button>
      <div className="flex"> 
        <img className="w-80" src={product.img} alt="product" />
        <div className="ml-16">
          <h1 className="text-xl font-bold">{product.title}</h1>
          <div className="text-md">{product.size}</div>
          <div className="font-bold mt-2">$ {product.price}</div>
          <button
            className="bg-deep-blue text-gray-custom rounded-md py-1 px-4 mt-4"
              disabled={isAdding}
              onClick={(e)=>{addToCart(e,product)}}
              className={`${isAdding ? "bg-green-500" : "bg-deep-blue"} px-4 py-1 font-bold  text-gray-custom rounded-md`}
          >add{isAdding ? "ed" : ''} to Cart</button>

        </div>
      </div>
    </div>
      )
}

export default SingleProduct;
