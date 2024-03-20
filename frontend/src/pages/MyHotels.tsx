import { useQuery } from "react-query"
import { Link } from "react-router-dom"
import * as apiClient from '../api-client';
import HotelItemCard from "../components/HotelItemCard";
import { useAppContext } from "../contexts/AppContext";

const MyHotels = () => {
  const { showToast } = useAppContext();
    const {data:hotelData} = useQuery("fetchMyHotels", apiClient.fetchMyHotels,{
        onError:()=>{
          showToast({ message: "Error loading hotels", type: "ERROR" });
        }
    })

  return (
    <div className="space-y-5 mx-auto my-4 p-3 center w-full lg:w-3/4">
        <span className="flex justify-between flex-wrap items-center">
            <h1 className="text-3xl font-bold my-3">My Hotels</h1>
            <Link to="/add-hotel" className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-300">
                Add Hotel
            </Link>
        </span>
      <div className="flex flex-cols gap-8">
        {hotelData ? hotelData?.map((hotel,idx)=> <HotelItemCard hotelData={hotel} key={idx}/>): <span>No Hotels Found</span>}
      </div>
    </div>
  )
}

export default MyHotels
