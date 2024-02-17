import { RegisterFormFields } from "./pages/Register";
import { LogInFormFields } from "./pages/SignIn";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const register = async (formData: RegisterFormFields) => {
    const response = await fetch(`${API_BASE_URL}/api/users/register`,{
        method: 'POST',
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    const responseBody = await response.json();

    if(!response.ok) {
        throw new Error(responseBody.message);
    }
}

export const logIn = async (formData: LogInFormFields) =>{
    const response = await fetch(`${API_BASE_URL}/api/auth/login`,{
        method: 'POST',
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    const responseBody = await response.json();
    if(!response.ok){
        throw new Error(responseBody.message);
    }
}

export const validateToken = async() =>{
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`,{
       credentials: "include", 
    });
    if(!response.ok) {
        throw("Invalid token");
    }
    return response.json();
}

export const signOut = async() =>{
    const response = await fetch(`${API_BASE_URL}/api/auth/signOut`,{
        credentials: "include", 
        method: "POST",
    });
    if(!response.ok){
        throw new Error("Error signing out");
    }
}