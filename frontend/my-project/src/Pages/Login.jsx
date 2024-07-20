import LoginWithPhoneAndEmail from "../Steps/LoginWithPhoneAndEmail"
import Otp from "../Steps/Otp"
import { useState } from "react"
import { createContext } from "react"


const stepMap = {
  0 : LoginWithPhoneAndEmail,
  1: Otp
}


  export const NextContext = createContext()

  

const Login = () => {

   const [step,setStep] = useState(0)

   const Component = stepMap[step]

   console.log(step);

   const onNext=()=>{
    setStep(step+1)
    "hehehehehe"
   }


 return(
   <NextContext.Provider value={onNext}>
  <Component onNext={onNext}/>
  </NextContext.Provider>

)
}

export default Login