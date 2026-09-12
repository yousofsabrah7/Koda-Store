import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faXmark,
  faTriangleExclamation,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";

const Toastuser = ({ message, type = "success" }) => {
  const icons = {
    success: faCheck,
    error: faXmark,
    warning: faTriangleExclamation,
    info: faCircleInfo,
  };

  const styles = {
    success: "border-green-500 text-green-600",
    error: "border-red-500 text-red-600",
    warning: "border-yellow-500 text-yellow-600",
    info: "border-blue-500 text-blue-600",
  };

  return (
   <div className={`
  fixed top-5 left-1/2 -translate-x-1/2
  bg-surface-card text-text-primary
  px-5 py-3 rounded-xl shadow-lg z-50
  border-l-4 flex items-center gap-3 min-w-[280px]
  ${styles[type]}
`}>
  <FontAwesomeIcon icon={icons[type]} />
  <span className="text-text-primary">{message}</span>
</div>
  );
};

export default Toastuser;