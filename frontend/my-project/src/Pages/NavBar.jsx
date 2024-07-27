import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../shared/Button/Button';
import { logout } from '../http';
import { useDispatch } from 'react-redux';
import { setAuth } from '../utils/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NavBar = () => {
  const diapatch = useDispatch()
  const navigate = useNavigate()

  const {user} = useSelector((store)=> store.user)


   const logOutUser = async()=>{
    try {
    const {data} = await logout()
    
      diapatch(setAuth(data))
      navigate("/login")
    
    
    
    } catch (error) {
        console.log(error);
    }
   }



  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      {/* Logo Section */}
      <div className="flex items-center">
        <Link to="/room">
          <img src="/logo.png" alt="Chat App Logo" className="w-10 h-10 mr-2" />
        </Link>
        <span className="text-xl font-bold text-gray-800">ChatApp</span>
      </div>

      {/* Navigation Links */}
      <ul className="flex space-x-6">
        <li>
          <Link to="/room" className="text-blue-600 hover:text-blue-800">
            Chats
          </Link>
        </li>
        <li>
          <Link to="/contacts" className="text-blue-600 hover:text-blue-800">
            Contacts
          </Link>
        </li>
        <li>
          <Link to="/settings" className="text-blue-600 hover:text-blue-800">
            Settings
          </Link>
        </li>
      </ul>

      {/* User Profile Section */}
      <div className="flex items-center">
        <img
          src={user.avatar}
          alt="Profile"
          className="w-10 h-10 rounded-full mr-2"
        />
        <button onClick={()=> logOutUser()} className="text-gray-800 rounded p-2 m-2 bg-gray-300 border border-gray-500">Logout</button>
      </div>
    </nav>
  );
};

export default NavBar;
