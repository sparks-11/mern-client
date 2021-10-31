import { publicRequest, userRequest } from "../requestMethod";
import { placedOrder } from "./cartRedux";
import { addOrder, getOrder } from "./orderRedux";
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
    await userRequest.put(`/users/update/${id}`,data);
    dispatch(updateUserSuccess({id, data}))
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
    dispatch(getOrder(order.data))
  } catch (err) {
    console.log(err)
  }
};



