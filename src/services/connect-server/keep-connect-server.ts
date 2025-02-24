"use client";

import { useEffect } from "react";
const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;

export default function PingServer() {
  useEffect(() => {
    keepServerAwake();
    const interval = setInterval(keepServerAwake, 14 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return null;
}
function keepServerAwake() {
  fetch(`${apiUrl}/attraction/keep-server-live`)
    .then((response) => {
      if (response.ok) {
        console.log("Server is live!");
      } else {
        console.error("Server response error:", response.status);
      }
    })
    .catch((error) => console.error("Error pinging server:", error));
}
