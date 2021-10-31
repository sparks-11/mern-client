import {useLocation} from 'react-router-dom';
import {  useSelector } from "react-redux";
import { format } from "timeago.js"

const SingleOrder = () => {

  const location = useLocation()
  const orderId = location.pathname.split("/")[2]
  const order = useSelector(state=>state.order.orders.find(order=>order._id === orderId))
  const user = useSelector(state=>state.user.currentUser)
  const products = useSelector(state=>state.product.products)

  

  const requires = products.filter(el => {
    return order.products.find(element => {
      return element.productId === el._id
    })
  })
  

  return (

    <>
      <div className="top-20 mx-20 z-30">
        
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center">
            <h3 className="text-2xl font-bold text-gray-500">OrderId :   </h3>
            <h3 className="text-2xl font-bold pl-4">{order._id }</h3>
          </div>
          <div className="flex items-center">
            <h3 className="text-2xl font-bold text-gray-500">Placed Time : </h3>
            <h3 className="text-2xl font-bold pl-4">{format(order.createdAt)}</h3>
          </div>
          <div className="flex items-center">
            <h3 className="text-2xl font-bold text-gray-500">Status : </h3>
            <h3 className="text-2xl font-bold pl-4">{order.status}</h3>
          </div>
        </div>



        <div className="flex ">
          <div className="w-4/12 shadow-md p-4 ml-4 ">

            <div className="flex items-center pl-6 py-8">
              <img className="w-20 h-20 rounded-full object-cover shadow-md" src={user.img} alt="profile" />
              <div  className="ml-6">
                <h3 className="text-lg font-bold ">{user.name}</h3>
                <h5 className="text-md text-gray-500 font-normal">Software Engineer</h5>
              </div>
            </div>

            <div className="p-6 py-8 font-semibold">
              <h3 className="text-sm text-gray-500 ">Account Details</h3>
              <div className="flex items-center pl-6 pt-3 ">
                <img className="h-6" src="/images/icons8_user.ico" alt="user" />
                <h4 className="text-md font-normal m-2">{ user.name}</h4>
              </div>
              <div className="flex items-center pl-6 pt-3 ">
                <img className="h-6" src="/images/icons8_user.ico" alt="user" />
                <h4 className="text-md font-normal m-2">{`isAdmin : ${user.isAdmin}`} </h4>
              </div>
              <div className="flex items-center pl-6 pt-3 ">
                <img className="h-6" src="/images/icons8_planner.ico" alt="calender" />
                <h4 className="text-md font-normal m-2">{user.dob}</h4>
              </div>
            </div>

            <div className="p-6 py-8 font-semibold">
              <h3 className="text-sm text-gray-500 ">Contact</h3>
              <div className="flex items-center  pl-6 pt-3 ">
                <img className="h-6" src="/images/icons8_iphone.ico" alt="mobile" />
                <h4 className="text-md font-normal m-2">{user.mobile} </h4>
              </div>
              <div className="flex items-center pl-6 pt-3">
                <img className="h-6" src="/images/icons8_mail_2.ico" alt="mail" />
                <h4 className="text-md font-normal m-2">{ user.email}</h4>
              </div>
              <div className="flex items-center pl-6 pt-3">
                <img className="h-6" src="/images/icons8_marker.ico" alt="location" />
                <h4 className="text-md font-normal m-2">{ user.address}</h4>
              </div>
            </div>

          </div>
          
          <div className="flex-1 mx-6 shadow-md bg-gray-50">
            <h3 className="text-xl font-bold p-9">products</h3>

            <div className="flex flex-col">

              <div className=" flex justify-around items-center text-md font-bold mx-8 ">
                <h3 >ProductImage</h3>
                <h3 >ProductName</h3>
                <h3 >Quantity</h3>
                <h3 >Amount</h3>
                <h3 >net Amount</h3>
              </div>

              {requires.map((item) => {
                const piece = order.products.filter((el) => {
                  return el.productId === item._id
                })
                return (
                  <div key={item._id} className="flex justify-around items-center text-lg bg-white text-gray-500 mx-8 h-16 rounded-lg hover:shadow-md my-4">
                    <img className="w-16 h-16 rounded-full object-cover"
                      src={item.img}
                    alt="profile" />
                    <h3 >{item.title}</h3>
                    <h3 >{piece[0].quantity }</h3>
                    <h3 >{item.price }</h3>
                    <h3 >{piece[0].quantity * item.price }</h3>
                  </div>
                )
              })}


              <div className=" flex place-content-end text-md font-bold mx-8 px-10 ">
                <h3 >Total :  </h3>
                <h3 >{order.amount}</h3>
              </div>

            </div>
          </div>
          
          </div>
        </div>
    </>
  )
}

export default SingleOrder;
