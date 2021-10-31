import axios from "axios";

const fetchToken = () => {
  if (JSON.parse(localStorage.getItem("persist:root"))) {
    return((JSON.parse((JSON.parse(localStorage.getItem("persist:root"))).user).currentUser).token)
  } else {
    return ("")
  }
}
const BASE_URL = "https://e-com-server-side.herokuapp.com/api";

const TOKEN = fetchToken()
  
  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxN2FhYWMyZDZmOGYzMTNjZjNhMjllOSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzNTU3OTI5MiwiZXhwIjoxNjM1ODM4NDkyfQ.TJMrLJr6IsgJq13fxoaiZPVAj3H0ptlZ-J4X-wRjCAw"


export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` }
});

