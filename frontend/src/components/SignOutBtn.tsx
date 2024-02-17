import {useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../api-client';
import { useAppContext } from '../contexts/AppContext';
import { Link } from 'react-router-dom';

const SignOutBtn = () => {
const queryClient = useQueryClient();
const { showToast} = useAppContext()
const mutation = useMutation(apiClient.signOut,{
    onSuccess: async()=>{
        await queryClient.invalidateQueries("validateToken");
        showToast({message:"Signed out successfully",type: "SUCCESS"})
    },
    onError: (error:Error)=>{
        showToast({message:error.message,type: "ERROR"})
    }
})

    const handleSignOut = ()=>{
        mutation.mutate();
    }
  return (
    <Link to="/signIn" className="cursor-pointer flex items-center bg-white rounded-md text-blue-600 px-4 py-2 font-bold  hover:bg-gray-100" onClick={handleSignOut}>
                Sign Out
              </Link>
  )
}

export default SignOutBtn
