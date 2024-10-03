"use client";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";

interface MapProps {
  address: string;
}

const ShowOnMap: React.FC<MapProps> = ({ address }) => {
  const mapStyles = {
    height: "400px",
    width: "100%",
  };
  const [location, setLocation] = useState<any>({});
  const fetchLocation = async () => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        address
      )}`
    );
    const data = await response.json();
    if (data && data.length > 0) {
      const { lat, lon } = data[0];
      setLocation([parseFloat(lat), parseFloat(lon)]);
    }
  };
  useEffect(() => {
    fetchLocation();
  }, [address]);
  const defaultCenter = {
    lat: location[0],
    lng: location[1],
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
      language="vi"
    >
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={12.5}
        center={defaultCenter}
      >
        <Marker position={defaultCenter} />
      </GoogleMap>
    </LoadScript>
  );
};

export default ShowOnMap;
