import { publicRequest, userRequest } from "../requestMethod";
import { placedOrder } from "./cartRedux";
import { addOrder, getOrder } from "./orderRedux";
import { getProductFailure, getProductStart, getProductSuccess } from "./productRedux";
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, loginFailure, loginStart, loginSuccess, logoutUser, updateUserFailure, updateUserStart, updateUserSuccess } from "./userRedux"

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data))
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const logout = async (dispatch) => {
  dispatch(logoutUser());
};

// GET PRODUCTS
export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products/find");
    dispatch(getProductSuccess(res.data))
  } catch (err) {
    dispatch(getProductFailure());
  }
};

// USER ACTION
export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUserStart());
  try {
    await userRequest.delete(`/users/delate/${id}`);
    dispatch(deleteUserSuccess(id))
  } catch (err) {
    dispatch(deleteUserFailure());
  }
};

export const updateUser = async (id, data, dispatch) => {
  dispatch(updateUserStart());
  try {
    const res = await userRequest.put(`/users/update/${id}`,data);
    dispatch(updateUserSuccess(res.data))
    if (res.status === 200) {
      alert("successfuly updated !!!" )
    }
  } catch (err) {
    dispatch(updateUserFailure());
  }
};

export const PlaceOrder = async (data,dispatch) => {
  try {
    const res = await userRequest.post(`/orders/create/`,data);
    const order = res.data.savedOrder;
    dispatch(addOrder(order))
    dispatch(placedOrder())
  } catch (err) {
    console.log(err)
  }
};

export const getOrders = async (id,dispatch) => {
  try {
    const order = await userRequest.get(`/orders/find/${id}`);
    console.log(id)
    dispatch(getOrder(order.data))
  } catch (err) {
    console.log(err)
  }
};



