import Toastify from "toastify-js";

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const showNotification = (message, type = "success") => {
  if (typeof message !== "string" || message.trim() === "") {
    console.error("Message must be a non-empty string");
    return;
  }

  if (typeof type !== "string" || !["success", "error", "warning"].includes(type)) {
    console.error("Invalid notification type");
    return;
  }

  const colors = {
    success: "#4caf50, #2e7d32",
    error: "#d44336, #d32f2f",
    warning: "#ff9800, #f57c00",
  }[type];

  Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    stopOnFocus: true,
    style: {
      position: "absolute",
      right: "10px",
      marginTop: "70px",
      background: `linear-gradient(to right, ${colors})`,
      color: "#fff",
      padding: "12px 24px",
      borderRadius: "8px",
      fontSize: "16px",
      boxShadow: "0px 4px 6px #0001",
    },
  }).showToast();
};

export { capitalize, showNotification };
