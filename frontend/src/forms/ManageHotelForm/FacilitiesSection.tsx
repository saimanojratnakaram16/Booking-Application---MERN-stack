import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";

const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Facilities</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 px-2">
        {hotelFacilities.map((type, idx) => (
          <label
            key={idx}
            className="text-sm flex gap-1 text-gray-700 items-center"
          >
            <input
              type="checkbox"
              value={type}
              {...register("facilities", { validate: (facilities) =>{
                if(facilities && facilities.length > 0) return true;
                else return "Atleast one facility is required"
              } })}
            />
            <span className="pl-2">{type}</span>
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-500">{errors.facilities.message}</span>
      )}
    </div>
  );
};

export default FacilitiesSection;
