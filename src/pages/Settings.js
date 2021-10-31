import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../firebase";
import { deleteUser, updateUser } from '../redux/apiCalls';
import { Link } from 'react-router-dom';


const Settings = () => {

  const user = useSelector(state=>state.user.currentUser)
  const userId = user._id
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

  //handleDelete
  const handleDelate = (id) => {
    console.log("delete option")
    // deleteUser(id,dispatch)
  };



//handle update 
  const handleUpdate = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
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
      const data = (fileName ? {...inputs, img:downloadURL} : {...inputs});
        console.log(data)
      // updateUser(userId, data, dispatch);
    });
  }
);

}

  return (
    <>
      {!user ?
      <div className="flex-1  py-8 mx-auto items-center text-center justify-center">
        <Link to="/login">
        <button className="bg-green-400 text-white p-2 px-4 rounded-lg  hover:shadow-lg" onClick={handleDelate(user._id)}>Login</button>
        </Link>
      </div> 
      :
        <div className='container mx-auto lg:w1/2 w-full pb24'>
          
          <div className="flex-1 mx-6 shadow-md ">
            <h3 className="text-xl font-bold p-9">Edit</h3>

            <div className="flex justify-around">
            <div className="">

              <div className="pl-9 pb-6">
                <h2 className="text-xl text-gray-300 font-bold pb-4">UserName</h2>
                  <input className="border-b-2 outline-none w-60 text-gray-600 font-semibold text-lg" type="text" placeholder={user.name} name="name" onChange={ handleChange} />
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
                    <img className="w-48 h-40 rounded-lg object-cover shadow-md" src={user.img} alt="profile" />
                    <label
                      className="bg-green-300 text-white p-2 px-4 rounded-lg mt-2 ml-14 cursor-pointer hover:shadow-lg"
                      htmlFor="file"
                    >Upload</label>
                    <input type="file" id="file" style={{display:"none"}} onChange={e=>setFile((e.target.files[0]))} />
                  </div>
                  <div className="flex justify-evenly gap-8">
                    <button className="bg-deep-blue text-white p-2 px-4 rounded-lg  hover:shadow-lg" onClick={handleUpdate}>Update</button>
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

export default Settings
