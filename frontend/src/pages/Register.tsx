import React, { useRef, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../api-client';
import { useAppContext } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';


export type RegisterFormFields = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
    const {showToast} = useAppContext();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const form = useRef<RegisterFormFields>({ firstName: "", lastName: "", email: "", phone: "", password: "", confirmPassword: "" });
    const [error, setError] = useState<RegisterFormFields>({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });

    const mutation = useMutation(apiClient.register,
        {onSuccess:async() => {
            await queryClient.invalidateQueries("validateToken");
            showToast({message: "Registered successfully", type: "SUCCESS"});
            navigate("/");
        },
    onError: (error:Error) => {
        showToast({message: error.message, type: "ERROR"})
    }});
  
    const validateForm = () => {
      const { firstName, lastName, email, phone, password, confirmPassword } = form.current;
      let hasErrors = false;
  
      if (!firstName.trim()) {
        setError((prevError) => ({ ...prevError, firstName: "This field is required" }));
        hasErrors = true;
      }
  
      if (!lastName.trim()) {
        setError((prevError) => ({ ...prevError, lastName: "This field is required" }));
        hasErrors = true;
      }
  
      if (!email.trim()) {
        setError((prevError) => ({ ...prevError, email: "Email is required." }));
        hasErrors = true;
      } else if (!isValidEmail(email)) {
        setError((prevError) => ({ ...prevError, email: "Invalid email format." }));
        hasErrors = true;
      }
  
      if (!phone.trim()) {
        setError((prevError) => ({ ...prevError, phone: "Phone is required." }));
        hasErrors = true;
      }
  
      if (!password.trim()) {
        setError((prevError) => ({ ...prevError, password: "Password is required." }));
        hasErrors = true;
      }
  
      if (password !== confirmPassword) {
        setError((prevError) => ({ ...prevError, confirmPassword: "Passwords do not match." }));
        hasErrors = true;
      }
  
      if(!hasErrors) {
      setError({ firstName: "", lastName: "", email: "", phone: "", password: "", confirmPassword: "" });
      }
  
      return !hasErrors;
    };
  
    const isValidEmail = (email: string): boolean => {
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const handleSubmit=(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
         if(validateForm()){
            mutation.mutate(form.current)
         }
    }

  return (
    <div className=" mx-2 md:mx-auto my-8 p-8 border xl:w-3/5 ">
      <h1 className="text-3xl font-bold mb-6">Register</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <label className="flex-1">
            First Name
            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none" name="firstName" onChange={(e) => form.current.firstName = e.target.value} />
            {error.firstName && <p className="text-red-500">{error.firstName}</p>}
          </label>
          <label className="flex-1">
            Last Name
            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none" name="lastName" onChange={(e) => form.current.lastName = e.target.value} />
            {error.lastName && <p className="text-red-500">{error.lastName}</p>}
          </label>
        </div>
        <label>
          Email
          <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none" name="email" onChange={(e) => form.current.email = e.target.value} />
          {error.email && <p className="text-red-500">{error.email}</p>}
        </label>
        <label>
          Phone
          <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none" name="phone" onChange={(e) => form.current.phone = e.target.value} />
          {error.phone && <p className="text-red-500">{error.phone}</p>}
        </label>
        <label>
          Password
          <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none" name="password" onChange={(e) => form.current.password = e.target.value} />
          {error.password && <p className="text-red-500">{error.password}</p>}
        </label>
        <label>
          Confirm Password
          <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none" name="confirmPassword" onChange={(e) => form.current.confirmPassword = e.target.value} />
          {error.confirmPassword && <p className="text-red-500">{error.confirmPassword}</p>}
        </label>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none">Register</button>
      </form>
    </div>
  );
};

export default Register;
