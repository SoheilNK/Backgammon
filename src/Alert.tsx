import { useState } from "react";
interface AlertProps {
    alertMessage: string;
    onAlert: (alertMessage: string) => void;
}
export function Alert(
    { alertMessage, onAlert }: AlertProps
) {
  if (alertMessage === "") {
    return null;
  } else {
    return (
      <div className="absolute z-10 visible top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  ">
        <div className=" flex-col text-yellow-200 text-lg px-8  max-w-md smx-auto rounded-xl bg-blue-800  shadow-lg sm:flex sm:items-center   sm:py-1 text-center ">
          <h2>{alertMessage}</h2>
          <button
            onClick={() => onAlert("")}
            className="bg-blue-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
          >
            ok
          </button>
        </div>
      </div>
    );
  }
}
