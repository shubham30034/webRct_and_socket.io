import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api/v1",
    withCredentials:true,
    headers: {
        "Content-Type": "application/json",
        "Accept" : "application/json"
    }
});

// list of all end points
export const sendOtp = async (data) => {
    try {
      const response = await api.post('/send-otp', data);
      return response;
    } catch (error) {
      console.error("Error sending OTP:", error);
      throw error;
    }
  };

  export const verifyOtp = async(payload)=>{
     try {
        const response = await api.post("/verify-otp",payload)
        return response
     } catch (error) {
         console.log("Error While Verify otp",error);
         throw error
     }
  }
  

  export const activateUser = async(data)=>{
    try {
      const response = await api.post("/activate-user",data,{
        headers: {
            'Content-Type' : 'multipart/form-data'
        }
    })
      return response
      
    } catch (error) {
      console.log("error while activate slice",error);
      throw error
      
    }
  }


  export const logout = async()=>{
    try {
      const response = await api.post("/logout")
      return response
      
    } catch (error) {
      
    }
  }


  api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      if (error.response && error.response.status === 401 && !originalRequest._isRetry) {
        originalRequest._isRetry = true;
        try {
          await axios.get("http://localhost:5000/api/v1/refresh", {
            withCredentials: true
          });
  
          return api.request(originalRequest);
        } catch (error) {
          console.log("Error refreshing token:", error.message);
        }
      }
      throw error;
    }
  );
  






export default api;
