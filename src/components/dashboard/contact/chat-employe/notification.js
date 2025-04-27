// notifications.js - Utility for sound and browser notifications
export const playNotificationSound = () => {
  const audio = new Audio("/notification-sound.mp3");
  audio.play().catch((err) => {
    console.log("Audio playback failed:", err);
  });
};

export const requestNotificationPermission = async () => {
  if (!("Notification" in window)) {
    console.log("This browser does not support desktop notifications");
    return false;
  }

  if (Notification.permission === "granted") {
    return true;
  }

  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    return permission === "granted";
  }

  return false;
};

export const sendBrowserNotification = (title, options = {}) => {
  if (Notification.permission === "granted") {
    const notification = new Notification(title, {
      icon: "/logo.png",
      badge: "/badge.png",
      ...options,
    });

    notification.onclick = function () {
      window.focus();
      this.close();
    };

    return notification;
  }

  return null;
};
