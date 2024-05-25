import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useHotel from "../Hooks/useHotel";
import ManageAllHotelForms from "./forms/manageHotelForms/ManageAllHotelForms";
import { useSelector } from "react-redux";

const EditHotels = () => {
  const { handleGetHotelById } = useHotel();
  const { id } = useParams();

  const hotelDetails = useSelector((state) => state?.hotel?.hotelData?.hotel);


  useEffect(() => {
    const initial = async () => {
      await handleGetHotelById(id);
    };
    initial();
  }, [id]);
  return <ManageAllHotelForms hotelDetails={hotelDetails} />;
};

export default EditHotels;
