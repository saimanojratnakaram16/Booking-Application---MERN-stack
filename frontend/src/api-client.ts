import { RegisterFormFields } from "./pages/Register";
import { LogInFormFields } from "./pages/SignIn";
import { HotelType } from "../../backend/src/models/hotel";

const API_BASE_URL =
  import.meta.env.MODE === "production"
    ? ""
    : import.meta.env.VITE_API_BASE_URL;

export const register = async (formData: RegisterFormFields) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const logIn = async (formData: LogInFormFields) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw "Invalid token";
  }
  return response.json();
};

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/signOut`, {
    credentials: "include",
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("Error signing out");
  }
};

export const addMyHotel = async (hotelFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    method: "POST",
    credentials: "include",
    body: hotelFormData,
  });
  if (!response.ok) {
    throw new Error("Failed to add Hotel");
  }
  return response.json();
};

export const fetchMyHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error Fetching hotels");
  }
  return response.json();
};

export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching details");
  }
  return response.json();
};

export const updateMyHotel = async(hotelFormData: FormData) =>{
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`,{
        method: "PUT",
        credentials:"include",
        body: hotelFormData
    })

    if(!response.ok){
        throw new Error("Failed to update Hotel")
    }

    return response.json();
}
