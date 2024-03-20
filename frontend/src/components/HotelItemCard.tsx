import { BsBuilding, BsMap } from "react-icons/bs"
import { HotelType } from "../../../backend/src/models/hotel"
import { BiHotel, BiMoney, BiStar } from "react-icons/bi"
import { Link } from "react-router-dom"

type Props = {
    hotelData: HotelType
}

const HotelItemCard = ({hotelData}:Props) => {
  return (
    <div className="flex flex-col justify-between border border-slate-300 rounded-md p-8">
    <h2 className="text-2xl font-bold">{hotelData.name}</h2>
    <div className="p-3 flex items-center">
            <BsMap className="mr-1"/>
            {hotelData.city}, {hotelData.country}
        </div>
    <div className="rounded-sm p-3 flex items-center">
            <BsBuilding className="mr-1"/>
            {hotelData.facilities.join(", ")}
        </div>
    <div className="whitespace-pre-line p-3">
        <h3 className="text-xl font-semibold mb-2">Details</h3>
        {hotelData.description}
        </div>
    <div className="flex flex-wrap gap-2 ">
      
        <div className="border boder-slate-300 rounded-sm p-3 flex items-center">
            <BsBuilding className="mr-1"/>
            {hotelData.type}
        </div>
        
        <div className="border boder-slate-300 rounded-sm p-3 flex items-center">
            <BiMoney className="mr-1"/>
            $ {hotelData.pricePerNight}
        </div>
        <div className="border boder-slate-300 rounded-sm p-3 flex items-center">
            <BiHotel className="mr-1"/>
             {hotelData.adultCount} adults, {hotelData.childCount} children
        </div>
        <div className="border boder-slate-300 rounded-sm p-3 flex items-center">
            <BiStar className="mr-1"/>
            {hotelData.starRating} rating
        </div>
    </div>
    <span className="flex justify-end">
        <Link className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-300" to={`/edit-hotel/${hotelData._id}`}>Edit Details</Link>
    </span>
    </div>
  )
}

export default HotelItemCard
