import React, {useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeProduct } from '../redux/cartRedux';
import { useSelector } from "react-redux";
import { PlaceOrder } from '../redux/apiCalls';

const Cart = () => {

    const cart = useSelector(state => state.cart)
    const [items,setItems]=useState(cart.products)
    const dispatch = useDispatch();
    const user =useSelector(state=>state.user.currentUser)

  const [inputs, setInputs]= useState([])

// handling changes 
  const handleChange = (e) => {
    setInputs(prev => {
      return {...prev, [e.target.name]:e.target.value}
    })
  }

  const handleDelete = (product) => {
    setItems(items.filter(item => item._id !== product._id));
    dispatch(removeProduct({ product: product, price: product.price }));
  }
  
  const handleOrderNow = () =>{

  function findOcc(arr, key){
  let products = [];
    
  arr.forEach((x)=>{
       
    // Checking if there is any object in products
    // which contains the key value
     if(products.some((val)=>{ return val["productId"] == x[key] })){
         
       // If yes! then increase the occurrence by 1
       products.forEach((k)=>{
         if(k["productId"] === x[key]){ 
           k["quantity"]++
         }
      })
         
     }else{
       // If not! Then create a new object initialize 
       // it with the present iteration key's value and 
       // set the occurrence to 1
       let a = {}
       a["productId"] = x[key]
       a["quantity"] = 1
       products.push(a);
     }
  })
    
  return products
}
  
let key = "_id"
const products =findOcc(items, key)
console.log(products )

const data =  {...inputs, userId:user._id, amount:cart.total, products }
console.log(data)
PlaceOrder(data,dispatch)


}


  return (
    !cart.products.length ?
      <img
        className="mx-auto "
        src="/images/plastic-pallets.jpg"
        alt="empty-img"
      />
    :
    <div className='container mx-auto lg:w1/2 w-full pb24'>
      <h1 className="my-12 font-bold">Cart Items</h1>
      <ul>

        {
          cart.products.map(product => {
            return (
            <li className="mb-12" key={product._id}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img className="h-16" src={product.img} alt="product" />
                  <span className="font-bold ml-4 w-48" >{ product.title}</span>
                </div>
                <div >
                    <b className="px-4">
                      {`$ ${product.price}`}
                    </b>
                </div>
                  <span>
                  </span>
                  <button className="bg-red-600 px-4 py-2 rounded-full leading-none text-gray-custom"
                    onClick={() => { handleDelete(product) }}
                  >DELETE</button>
              </div>
            </li>
            )
          })
        }
        </ul >
        <div className="flex justify-between">
          <div className="">

              <div className="pl-9 pb-6">
                <h2 className="text-xl text-gray-300 font-bold pb-4">please enter to confirm</h2>
                <h2 className="text-xl text-gray-300 font-bold pb-4">Phone</h2>
                <input className="border-b-2 outline-none w-60 text-gray-600 font-semibold text-lg" type="text" placeholder={user.mobile} name="mobile"onChange={ handleChange} />
              </div>

              <div className="pl-9 pb-6">
                <h2 className="text-xl text-gray-300 font-bold pb-4">Address</h2>
                <input className="border-b-2 outline-none w-60 text-gray-600 font-semibold text-lg" type="text" placeholder={user.address} name="address"onChange={ handleChange} />
              </div>
          </div>
          <div>
            <div className="text-right">
              <b>Grand Total</b> :{` ${cart.total}`}
            </div>
            <div className="mt-6 text-right">
                <button className="bg-deep-blue text-gray-custom px-4 py-2 rounded-2xl"
                  onClick={handleOrderNow}
                  >Order Now</button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Cart;

