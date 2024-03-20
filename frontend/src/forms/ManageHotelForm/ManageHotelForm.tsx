import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import { HotelType } from "../../../../backend/src/models/hotel";
import { useEffect } from "react";

export type HotelFormData = {
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    adultCount: number;
    childCount: number;
    facilities: string[];
    pricePerNight: number;
    starRating: number;
    imageFiles: FileList;
    imageUrls: string[];
}

type Props = {
  hotel?:HotelType;
  onSave: (hotelFormData: FormData)=>void;
  isLoading: boolean;
}


const ManageHotelForm = ({onSave, isLoading, hotel}:Props) => {
  const formMethods = useForm<HotelFormData>();
  const {handleSubmit, reset} = formMethods;

  useEffect(()=>{
    console.log(hotel)
    reset(hotel);
  },[hotel,reset]);

  const onSubmit =handleSubmit((formDataJson: HotelFormData)=>{
    const formData =new FormData();
    if(hotel){
      formData.append("hotelId",hotel._id);
    }
    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append("pricePerNight", formDataJson.pricePerNight.toString());
    formData.append("adultCount", formDataJson.adultCount.toString());
    formData.append("childCount", formDataJson.childCount.toString());
    formData.append("starRating", formDataJson.starRating.toString());

    formDataJson.facilities.forEach((facility,index)=>{
      formData.append(`facilities[${index}]`,facility)
    })

    if(formDataJson.imageUrls){
      formDataJson.imageUrls.forEach((url,idx)=>{
        formData.append(`imageUrls[${idx}]`,url);
      })
    }
    Array.from(formDataJson.imageFiles).forEach((imageFile)=>{
      formData.append(`imageFiles`,imageFile);
    });
    onSave(formData);
  })
  return (
    <FormProvider {...formMethods}>
      <form className="lg:w-1/2 mx-auto px-2 flex flex-col gap-4 my-6 py-2" onSubmit={onSubmit}>
      <DetailsSection/>
      <TypeSection/>
      <FacilitiesSection/>
      <GuestsSection/>
      <ImagesSection/>
      <span className="flex justify-end">
        <button disabled={isLoading} type="submit" className="bg-blue-600 text-white font-bold hover:bg-blue-500 px-4 py-2 disabled:bg-gray-500">
          {isLoading? "Saving": "Save"}</button>
      </span>
      </form>
    </FormProvider>
  )
};

export default ManageHotelForm;
