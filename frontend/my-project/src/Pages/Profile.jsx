import React from 'react'
import { useState } from 'react'
import StepName from '../Steps/StepName'
import StepAvtar from '../Steps/StepAvtar'

const steps = {
  1:StepName,
  2:StepAvtar
}

const Profile = () => {
   const [step,setStep] = useState(1)

   const ProfileComponent = steps[step]

   const onNext = ()=>{
       setStep((step)=> step+1)
   }

  return (
    <div>
      <ProfileComponent onNext={onNext}/>
    </div>
  )
}

export default Profile