"use client";

import { useEffect } from "react";

let idleTimeout: NodeJS.Timeout | null = null;
const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;

export default function PingServer() {
  useEffect(() => {
    document.addEventListener("mousemove", resetIdleTimer);
    document.addEventListener("keydown", resetIdleTimer);
    document.addEventListener("scroll", resetIdleTimer);

    idleTimeout = setTimeout(keepServerAwake, 14.5 * 60 * 1000);

    return () => {
      document.removeEventListener("mousemove", resetIdleTimer);
      document.removeEventListener("keydown", resetIdleTimer);
      document.removeEventListener("scroll", resetIdleTimer);

      if (idleTimeout) clearTimeout(idleTimeout);
    };
  }, []);

  return null;
}

function resetIdleTimer() {
  if (idleTimeout) clearTimeout(idleTimeout);
  idleTimeout = setTimeout(keepServerAwake, 14.5 * 60 * 1000);
}

function keepServerAwake() {
  fetch(`${apiUrl}/attraction/keep-server-live`)
    .then((response) => {
      if (response.ok) {
        console.log("Server is awake!");
      } else {
        console.error("Server response error:", response.status);
      }
    })
    .catch((error) => console.error("Error pinging server:", error));
}
