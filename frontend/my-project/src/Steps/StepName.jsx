import React from 'react'
import CardLayout from "../shared/CardLayout/CardLayout"
import TextInput from '../shared/input/TextInput'
import { useState } from 'react'
import Button from '../shared/Button/Button'
import {useDispatch,useSelector} from "react-redux"
import { setName } from '../utils/slices/activateSlice'



const StepName = ({onNext}) => {

  const dispatch = useDispatch()
  const {name} = useSelector((store)=> store.activate)
  const[fullName,setFullName] = useState(name)

 

  const submit =()=>{
    if(!fullName){
      return
    }
    console.log(name,"name to bta");

    dispatch(setName(fullName))


    onNext()
  }

  return (
    <div className=' flex justify-center'>
    <div className=' w-[40%]  my-[15%]'>
      <div>
        <CardLayout>
       
      <p className='text-gray-600 mb-6'>Please Enter your full Name</p>
      <div className='flex flex-col items-center mb-6'>
        <label className='text-gray-700 font-medium mb-2'>Enter Your Full Name</label>
       <TextInput  
       value={fullName}
        onChange={(e)=> setFullName(e.target.value)}
       />
      </div>
      <div>
       <Button onClick={submit}/>
      </div>
        </CardLayout>
    </div>
    </div>
    </div>
  )
}

export default StepName