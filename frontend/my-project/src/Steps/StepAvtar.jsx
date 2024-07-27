import React, { useState } from 'react';
import Button from '../shared/Button/Button';
import CardLayout from '../shared/CardLayout/CardLayout';
import { useSelector,useDispatch } from 'react-redux';
import { setAvtar } from '../utils/slices/activateSlice';
import { activateUser } from '../http';
import { setAuth } from '../utils/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const StepAvtar = ({ onNext }) => {
  const [image, setImage] = useState("https://www.shutterstock.com/shutterstock/photos/1507422728/display_1500/stock-vector-cute-monkey-avatar-with-yellow-background-1507422728.jpg");
   const [file,setFile] = useState("")
  const {name,avatar} = useSelector((store)=> store.activate)
  const dispatch = useDispatch()
  const navigate = useNavigate()
 
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file)
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend= function(){
    
      setImage(reader.result)
    
      dispatch(setAvtar(reader.result))
    }
  };

  const submit = async() => {
    const data1 = {
      name:name,
      avatar : file
    }
    try {
      const {data} = await activateUser(data1)

      if(data){
        dispatch(setAuth(data))
        navigate("/room")
      }

     
      
      
    } catch (error) {
      console.log(error);
      
    }

 
  };

  return (
    <div className="flex justify-center">
      <div className="w-[40%] my-[15%]">
        <CardLayout>
          <p className="text-gray-600 mb-6">Please Choose Your Avatar <h1>{name}</h1></p>
          <div className="flex flex-col items-center mb-6">
            <div className="w-32 h-32 rounded-full border border-gray-400 mb-4 overflow-hidden">
              {image ? (
                <>
              
                <img  src={image} alt="Avatar" className="w-full h-full object-cover" />
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Avatar
                </div>
              )}
            </div>
            <label className="text-gray-700 font-medium mb-2 text-2xl cursor-pointer" htmlFor='avatar'> click here Upload Your Profile Picture</label>
            <input
            id='avatar'
              type="file"
              className="border border-gray-400 p-2 m-2 rounded hidden"
              onChange={handleFileChange}
            />
          </div>
          <div>
            <Button onClick={submit}>Next</Button>
          </div>
        </CardLayout>
      </div>
    </div>
  );
};

export default StepAvtar;
