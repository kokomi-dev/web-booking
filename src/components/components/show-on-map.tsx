"use client";
import { useEffect, useState } from "react";
import Map, { Marker } from "react-map-gl";
import Image from "next/image";

import "mapbox-gl/dist/mapbox-gl.css";
import mapPin from "@/assets/images/map-pin.png";
interface MapProps {
  address: string;
}

const ShowOnMap: React.FC<MapProps> = ({ address }) => {
  const [location, setLocation] = useState<number[]>([]);

  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  const fetchLocation = async () => {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        address
      )}.json?access_token=${accessToken}`
    );
    const data = await response.json();
    if (!data) {
      return setLocation([0, 0]);
    }
    if (data.features && data.features.length > 0) {
      const [longitude, latitude] = data.features[0].center;
      setLocation([parseFloat(longitude), parseFloat(latitude)]);
    }
  };
  useEffect(() => {
    fetchLocation();
  }, [address]);
  if (!location || location.length === 0) {
    return;
  }
  return (
    <Map
      initialViewState={{
        longitude: location[0],
        latitude: location[1],
        zoom: 11,
      }}
      style={{ width: "100%", height: 420, borderRadius: "12px" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={accessToken}
      maxZoom={16}
      minZoom={9}
    >
      <Marker longitude={location[0]} latitude={location[1]} anchor="bottom">
        <Image
          src={mapPin}
          alt="icon map gim địa chỉ"
          width={60}
          height={60}
          className="size-9"
        />
      </Marker>
    </Map>
  );
};

export default ShowOnMap;
