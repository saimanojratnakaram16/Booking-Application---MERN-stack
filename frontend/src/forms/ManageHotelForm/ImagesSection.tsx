import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import React from "react";

const ImagesSection = () => {
  const {register, formState:{errors}, watch, setValue} = useFormContext<HotelFormData>();

  const existingImageUrls = watch("imageUrls");

  const handleDelete = (event:React.MouseEvent<HTMLButtonElement,MouseEvent>, imageUrl:string) => {
      event.preventDefault();
      setValue("imageUrls", existingImageUrls.filter(url => url!==imageUrl))
  }
  return (
    <div>
       <h2 className="text-2xl font-bold mb-3">Images</h2>
       <div className="border rounded p-4 flex flex-col gap-4">
          {existingImageUrls && (
            <div className="flex flex-wrap gap-2">
             {existingImageUrls.map((imageUrl,idx) =>(
              <div className="relative group">
              <img className="object-cover max-h-28" src={imageUrl} key={idx} alt="property image"/>
              <button onClick={(e)=>handleDelete(e,imageUrl)} className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white">
                Delete
              </button>
            </div>
             ))}

            </div>
          )
          }
            <input type="file" multiple accept="image/*" className="w-full text-gray-700 font-normal" {...register("imageFiles", {validate: (imageFiles)=>{
                if(imageFiles.length + existingImageUrls?.length ===0) return "Atleast one image should be added";
                if(imageFiles.length + existingImageUrls?.length >6) return "Total number of images cannot exceed 6";
                return true;
            }})}/>
       </div>
       {errors.imageFiles && (
        <span className='text-red-500'>{errors.imageFiles.message}</span>
       )}
    </div>
  )
}

export default ImagesSection
