import React, { useEffect } from "react";
import useAllHotels from "../Hooks/useAllHotels";
import { useSelector } from "react-redux";
import LatestDestinationCard from "./LatestDestinationCard";

const Home = () => {
  const { handleGetAllRegisteredHotels } = useAllHotels();

  const allRegisteredHotels = useSelector(
    (state) => state?.allHotels?.allRegisteredHotelsData?.hotels
  );

  const topRowHotels = allRegisteredHotels?.slice(0, 2) || [];

  const bottomRowHotels = allRegisteredHotels?.slice(2) || [];

  useEffect(() => {
    const initial = async () => {
      await handleGetAllRegisteredHotels();
    };
    initial();
  }, []);
  return (
    <div className="space-y-3">
      <h2 className="text-3xl font-bold">Latest Destinations</h2>
      <p>Most Recent Destinations added by our hosts</p>
      <div className="grid gap-4">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {topRowHotels?.map((hotel) => (
            <LatestDestinationCard key={hotel?._id} hotel={hotel} />
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {bottomRowHotels?.map((hotel) => (
            <LatestDestinationCard key={hotel?._id} hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
