import { Link} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../firebase";
import { updateUser} from '../redux/apiCalls';

const SingleUser = () => {


  const user = useSelector(state=>state.user.currentUser)
  const [updating, setIsUpdating] = useState(false)
  
// update Action
  const [inputs, setInputs]= useState([])
  const [file, setFile]=useState(null)
  const dispatch = useDispatch()

// handling changes 
  const handleChange = (e) => {
    setInputs(prev => {
      return {...prev, [e.target.name]:e.target.value}
    })
  }

//handle update 
  const handleUpdate = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false)
    },4000);

    // Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded

    // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    // console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        // console.log('Upload is paused');
        break;
      case 'running':
        // console.log('Upload is running');
        break;
      default: ;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      const data = {...inputs, img:downloadURL};
        // console.log(user,data)
      updateUser(user._id, data, dispatch);


    });
  }
);

  }

  return (

    <>{!user ?
        <div className="flex flex-col items-center mx-auto justify-center  p-6">
          <h3 className="text-2xl font-bold">User <span className="text-3xl text-red-400">Not </span>Found</h3>
        <div className="w-80 flex items-center justify-between py-10">
          <Link to="/login">
          <button className="bg-green-400 text-white p-2 px-4 rounded-lg  hover:shadow-lg">login</button>
          </Link>
          <Link to="/register">
          <button className="bg-deep-blue text-white p-2 px-4 rounded-lg  hover:shadow-lg">Register</button>
          </Link>
        </div>
        </div>
      :
      
      <div className="top-20 mx-20 z-30">
        
        <div className="flex items-center justify-between p-6">
          <h3 className="text-2xl font-bold">Edit User</h3>
        </div>

        <div className="flex ">
          <div className="w-4/12 shadow-md p-4 ml-4 ">

            <div className="flex items-center pl-6 py-8">
              <img className="w-20 h-20 rounded-full object-cover shadow-md" src={user.img} alt="profile" />
              <div  className="ml-6">
                <h3 className="text-lg font-bold ">{user.name}</h3>
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
          
            <div className="flex-1 mx-6 shadow-md ">
            <h3 className="text-xl font-bold p-9">Edit</h3>

            <div className="flex justify-between">
            <div className="">

              <div className="pl-9 pb-6">
                <h2 className="text-xl text-gray-300 font-bold pb-4">UserName</h2>
                  <input className="border-b-2 outline-none w-60 text-gray-600 font-semibold text-lg" type="text" placeholder={user.name} name="name" onChange={ handleChange} />
              </div>

              <div className="pl-9 pb-6">
                <h2 className="text-xl text-gray-300 font-bold pb-4">IsAdmin</h2>
                  <select className="border-b-2 outline-none w-60 text-gray-600 font-semibold text-lg" type="text" name="isAdmin" onChange={ handleChange}>
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                  </select>
              </div>
            
              <div className="pl-9 pb-6">
                <h2 className="text-xl text-gray-300 font-bold pb-4">Date-Of-Birth</h2>
                <input className="border-b-2 outline-none w-60 text-gray-600 font-semibold text-lg" type="text" placeholder={user.dob}  name="dob" onChange={ handleChange}/>
              </div>

              <div className="pl-9 pb-6">
                <h2 className="text-xl text-gray-300 font-bold pb-4">Email</h2>
                <input className="border-b-2 outline-none w-60 text-gray-600 font-semibold text-lg" type="text" placeholder={user.email} name="email" onChange={ handleChange}/>
              </div>

              <div className="pl-9 pb-6">
                <h2 className="text-xl text-gray-300 font-bold pb-4">Phone</h2>
                <input className="border-b-2 outline-none w-60 text-gray-600 font-semibold text-lg" type="text" placeholder={user.mobile} name="mobile"onChange={ handleChange} />
              </div>

              <div className="pl-9 pb-6">
                <h2 className="text-xl text-gray-300 font-bold pb-4">Address</h2>
                <input className="border-b-2 outline-none w-60 text-gray-600 font-semibold text-lg" type="text" placeholder={user.address} name="address"onChange={ handleChange} />
              </div>

              </div>
            
              <div className="w-48">
                <div className="flex flex-col items-center gap-44 justify-between ">
                  <div className="py-8 mr-4">
                    <h2 className="text-xl text-gray-300 font-bold pb-4">must upload</h2>
                    <img className="w-48 h-40 rounded-lg object-cover shadow-md" src={user.img} alt="profile" />
                    <input type="file" id="file" onChange={e=>setFile((e.target.files[0]))} />
                  </div>
                  <button className={`bg-deep-blue text-white ${updating ? "cursor-wait" : "cursor-pointer"} p-2 px-4 rounded-lg  hover:shadow-lg`} onClick={handleUpdate} >Update</button>
                </div>
              </div>

            </div>
            

            </div>
            

          </div>
        </div>

     }

    </>
  )
}

export default SingleUser;
