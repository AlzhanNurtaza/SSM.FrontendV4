import { AuthBindings } from "@refinedev/core";
import axios from "axios";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const API_URL = import.meta.env.VITE_API_URL + "/api/UserAuth";


export const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY + "";

export const authProvider: AuthBindings = {

  login: async ({ username, email, password }) => {
    if ((username || email) && password) {
      localStorage.setItem(TOKEN_KEY, username);
      return {
        success: true,
        redirectTo: "/",
      };
    }

    return {
      success: false,
      error: {
        name: "LoginError",
        message: "Invalid username or password",
      },
    };
  },
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        id: 1,
        name: "John Doe",
        avatar: "https://i.pravatar.cc/300",
      };
    }
    return null;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
  register:  async ({ email,password, firstName,lastName,middleName,iin , department,image}) => {
    const returnUrl = window.location.origin + "/login";


    try {
      
      const response = await axios.post(API_URL + "/Register", {email,password, firstName,lastName,middleName,iin ,returnUrl, department,image});
      if(!response?.data?.succeeded){
        return {
          success:false, 
          error: {
            name: "Cannot register user. Make sure you password format is correct",
            message: "Register Error"
          }
        }
      }
      toast.success('Account created. You will get confirmation email.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
      return {
        success: true,
        redirectTo:"/login"
        
      };
    }
    catch(error) {
      
      return {
        success: false,
        error: {
          name: "Cannot register user",
          message: "Error, Make sure your format is correct or account already exists"
        }
      }
    }
  },
  // ---
};
