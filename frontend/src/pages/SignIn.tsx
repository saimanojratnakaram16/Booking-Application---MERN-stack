import React, { useRef, useState } from 'react';
import * as apiClient from '../api-client';
import { useMutation, useQueryClient } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';

export type LogInFormFields = {
  email: string;
  password: string;
}

const SignIn = () => {
  const {showToast} = useAppContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<LogInFormFields>({email:"", password:""});

  const mutation = useMutation(apiClient.logIn, 
    {onSuccess: async() => {
        await queryClient.invalidateQueries("validateToken");
        showToast({message: "Logged In successfully", type: "SUCCESS"});
        navigate("/");
    },
    onError: () =>{
    showToast({message: "Login Failed", type: "ERROR"});
}})


  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if(validateForm()){
        mutation.mutate({email: formRef?.current?.email.value, password: formRef.current?.password.value} as LogInFormFields); 
    }
  };

  const validateForm = () =>{
    const form = formRef.current
    if (!form) {
        return false; // Handle the case where the form is null
      }
    
    const email = form.email.value;
    const password = form.password.value;
    let hasErrors = false;
    if (!email.trim()) {
        setError((prevError) => ({ ...prevError, email: "Email is required." }));
        hasErrors = true;
      } else if (!isValidEmail(email)) {
        setError((prevError) => ({ ...prevError, email: "Invalid email format." }));
        hasErrors = true;
      }
  
      if (!password.trim()) {
        setError((prevError) => ({ ...prevError, password: "Password is required." }));
        hasErrors = true;
      }
      return !hasErrors;
  }
  const isValidEmail = (email: string): boolean => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
  return (
    <div className=" mx-2 md:mx-auto my-8 p-8 border xl:w-3/5 ">
      <h1 className="text-3xl font-bold mb-6">Sign In</h1>
      <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <label>
          Email
          <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none" name="email" />
          {error?.email && <p>{error.email}</p>}
        </label>
        <label>
          Password
          <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none" name="password" />
          {error?.password && <p>{error.password}</p>}
        </label>
        <p className='mb-3'>Create a new Account? <Link className='cursor-pointer text-blue-500' to="/register">Sign Up</Link></p>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none">Sign In</button>
      </form>
    </div>
  );
}

export default SignIn;
