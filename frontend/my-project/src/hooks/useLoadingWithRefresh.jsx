import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from "axios"
import { useDispatch } from 'react-redux'
import { setAuth } from '../utils/slices/userSlice'

export const useLoadingWithRefresh = () => {
    const[loading,setLoading] = useState(true)
    const dispatach = useDispatch()

    useEffect(()=>{
      const gg = async()=>{
        try {
            const {data} = await axios.get("http://localhost:5000/api/v1/refresh",{
                withCredentials:true
             })

             console.log(data);

             dispatach(setAuth(data))
             setLoading(false)

            

             
        } catch (error) {
             console.log(error);
             setLoading(false)
        }
         
      }
      gg()
 },[])
    
    return {loading}
}

