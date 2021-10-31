import React, { useEffect} from 'react'
import { DataGrid } from "@material-ui/data-grid";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../redux/apiCalls';
import { format } from "timeago.js"

const Order = () => {

const user = useSelector(state=>state.user.currentUser)
const dispatch = useDispatch()
const order = useSelector(state => state.order.orders)
  
useEffect(() => {
  getOrders(user._id,dispatch)
},[user._id,dispatch])


const columns = [
  { field: '_id', headerName: 'ORDER_ID', width: 200 },
  {
    field: 'Orders',
    headerName: 'User_Id',
    width: 200,
    renderCell: (params) => {
      return (
        <div className="flex items-center gap-3 text-md font-medium">
          {params.row.userId}
      </div>
    )}
  },
  { field: 'address', headerName: 'Address', width: 140 },
  {
    field: 'orders',
    headerName: "Date",
    width: 150,
    renderCell: (params) => {
      return (
        <div>
          {format(params.row.createdAt)}
        </div>
      )}
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 150,
  },
  {
    field: 'amount',
    headerName: 'Amount',
    width: 150,
  },
  {
    field: 'action',
    headerName: 'action',
    width: 120,
    renderCell : (params)=> {
      return (
          <div className="flex items-center gap-8">
            <Link to={"orders/" + params.row._id}>
            <button className="flex items-center bg-green-300 shadow-sm hover:shadow-md  p-2 rounded-lg">
                <img className="h-5" src="/images/icons8_eye.ico"alt="view" />
          </button>
          </Link>
          </div>
      )}
  },
];

  return (
    <div className="top-20 mx-20 z-30">
      <h1 className="text-3xl font-bold my-5 px-5">Orders</h1>
      <div className="w-full px-4" style={{height:"550px"}}>
        <DataGrid
          rows={order}
          columns={columns}
          pageSize={8}
          getRowId={(row)=>row._id}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          checkboxSelection
        />
      </div>
    </div>
  )
}

export default Order;
