import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";

const TypeSection = () => {
  const { register, watch, formState:{errors} } = useFormContext<HotelFormData>();
  const typeWatch = watch("type");

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Type</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 px-2">
        {hotelTypes.map((type, idx) => (
          <label
            key={idx}
            className={
              (typeWatch === type ? "bg-blue-200" : "bg-slate-200") +
              " cursor-pointer rounded-md px-4 py-2 text-sm"
            }
          >
            <input
              className="hidden"
              type="radio"
              value={type}
              {...register("type", { required: "This field is required" })}
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className='text-red-500'>{errors.type.message}</span>
      )}
    </div>
  );
};

export default TypeSection;
