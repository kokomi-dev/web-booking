"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import mapPin from "@/assets/images/map-pin.png";
import "mapbox-gl/dist/mapbox-gl.css?inline";
const Map = dynamic(() => import("react-map-gl"), { ssr: false });
const Marker = dynamic(() => import("react-map-gl").then((mod) => mod.Marker), {
  ssr: false,
});

interface MapProps {
  address: string;
}

const ShowOnMap: React.FC<MapProps> = ({ address }) => {
  const [location, setLocation] = useState<number[]>([]);
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  const fetchLocation = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          address
        )}.json?access_token=${accessToken}`
      );
      const data = await response.json();
      if (data?.features?.length) {
        const [longitude, latitude] = data.features[0].center;
        setLocation([longitude, latitude]);
      } else {
        setLocation([0, 0]);
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  }, [address, accessToken]);

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  if (!location.length) {
    return <div className="w-full h-[420px] bg-gray-200 rounded-lg"></div>;
  }

  return (
    <Map
      initialViewState={{
        longitude: location[0],
        latitude: location[1],
        zoom: 13,
      }}
      style={{ width: "100%", height: 420, borderRadius: "12px" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={accessToken}
      maxZoom={16}
      minZoom={10}
    >
      <Marker longitude={location[0]} latitude={location[1]} anchor="bottom">
        <Image
          src={mapPin}
          alt="icon map pin"
          width={36}
          height={36}
          loading="lazy"
        />
      </Marker>
    </Map>
  );
};

export default ShowOnMap;
