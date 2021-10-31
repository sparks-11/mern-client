import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/cartRedux';



const Product = (props) => {


  const { product } = props;
  const [isAdding, setIsAdding] = useState(false);


  const dispatch = useDispatch();
  const addToCart = (event, product) => {
        event.preventDefault();
    dispatch(addProduct({ product:product , price:product.price }));

    setIsAdding(true);
    setTimeout(() => {
      setIsAdding(false)
    },1000);
  }

  return (
    <>
  <Link to={`products/${product._id}`}>
        <div className="text-center bg-gray-50">
          <img
            className="object-contain w-72 rounded-md px-4 py-4"
            src={product.img}
            alt="product-img"
          />
          <h2 className="text-lg font-bold py-2">{product.title}</h2>
          <span className="bg-gray-custom text-deep-blue py-1 rounded-full text-sm font-bold px-4">{product.size}</span>
          <div className="flex place-content-between items-center p-2 mt-4 ">
            <span className="font-bold text-lg">${ product.price}</span>
            <button
              disabled={isAdding}
              onClick={(e)=>{addToCart(e,product)}}
              className={`${isAdding ? "bg-green-500" : "bg-deep-blue"} px-4 py-1 font-bold  text-gray-custom rounded-md hover:bg-logo-blue ease-linear`}
            >add{`${isAdding ? "ed": ""}`}
            </button>
          </div>
        </div>
  </Link>

    </>
  )
}

export default Product;
