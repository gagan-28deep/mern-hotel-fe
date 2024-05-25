import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypesSections from "./TypesSections";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import useHotel from "../../../Hooks/useHotel.js";
import Loader from "../../Loader.jsx";
import { useSelector } from "react-redux";
const ManageAllHotelForms = ({ hotelDetails }) => {
  const hotelLoading = useSelector((state) => state?.hotel?.hotelLoading);

  const { handleCreateHotel, handleUpdateHotelById } = useHotel();
  const formData = useForm();

  const { handleSubmit, reset } = formData;

  useEffect(() => {
    reset(hotelDetails);
  }, [hotelDetails, reset]);
  const createNewHotel = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("city", data.city);
    formData.append("country", data.country);
    formData.append("description", data.description);
    formData.append("type", data.type);
    formData.append("pricePerNight", data.pricePerNight?.toString());
    formData.append("starRating", data.starRating?.toString());
    formData.append("adultCount", data.adultCount?.toString());
    formData.append("childCount", data.childCount?.toString());

    data?.facilities?.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    if (data?.imageUrls) {
      // Flatten the nested arrays in imageUrls
      const flattenedImageUrls = data.imageUrls.flat();

      // Append each URL to formData
      flattenedImageUrls.forEach((url, index) => {
        if (url) {
          // Ensure the URL is not an empty string
          formData.append(`imageUrls[${index}]`, url);
        }
      });
    }

    Array.from(data?.imageFiles)?.forEach((imageFile) => {
      formData.append("imageFiles", imageFile);
    });

    if (!hotelDetails) {
      handleCreateHotel(formData);
    }
    if (hotelDetails) {
      handleUpdateHotelById(hotelDetails?._id, formData);
    }
  };
  return (
    <FormProvider {...formData}>
      <form
        onSubmit={handleSubmit(createNewHotel)}
        className="flex flex-col gap-10"
      >
        <DetailsSection hotelDetails={hotelDetails} />
        <TypesSections />
        <FacilitiesSection />
        <GuestsSection />
        <ImagesSection />
        {hotelLoading && <Loader />}
        <span className="flex justify-end">
          <button
            disabled={hotelLoading}
            // className={
            //   hotelLoading
            //     ? "bg-gray-500 text-white p-2 rounded text-xl"
            //     : "bg-blue-500 text-white p-2 rounded hover:bg-blue-300 text-xl"
            // }
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-300 text-xl disabled:bg-gray-500"
            type="submit"
          >
            {hotelLoading ? "Saving..." : "Save"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageAllHotelForms;
