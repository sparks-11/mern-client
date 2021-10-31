import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders } from '../redux/apiCalls'
import {format} from "timeago.js" 

const Order = () => {


const user = useSelector(state=>state.user.currentUser)
const dispatch = useDispatch()
const order = useSelector(state => state.order.orders)
  
useEffect(() => {
  getOrders(user._id,dispatch)
},[dispatch])

  return (
  
    <>
        {order.map((item) => (
            
        <div className="flex items-center justify-around pb-2 text-left bg-red-300" key={item._id}>
            <div className="flex items-center">
              <div  className="w-20 overflow-hidden text-left">
                {item.products.map((el) => {
                  <div className="flex flex-col">
                    return (
                    <div className="flex items-center justify-between">
                      <h3>{el.productId}</h3>
                      <h3>{el.quantity}</h3>
                    </div>)
                  </div>
                    })}
              </div>
          </div>
          <div>
                <h3>{format( item.createdAt)}</h3>
          </div>
          <div>
                <h3>{item.amount}</h3>
          </div>
          <div>
          <button className="bg-gray-300 font-semibold shadow-sm hover:shadow-md p-2 rounded-lg">{item.status}
          </button>
          </div>
        </div>
          ))
        }
    </>
  )
}

export default Order
