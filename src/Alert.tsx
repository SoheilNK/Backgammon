interface AlertProps {
  alertMessage: string;
  onAlert: (alertMessage: string) => void;
}
export function Alert({ alertMessage, onAlert }: AlertProps) {
  if (alertMessage === "") {
    return null;
  } else {
    return (
      <div className="absolute top-1/2 left-1/6 transform -translate-x-1/6 -translate-y-1/2 z-20">
        <div
          style={{ backgroundColor: "#8E8268" }}
          className=" flex-col  text-lg p-2  max-w-md smx-auto rounded-xl shadow-lg sm:flex sm:items-center   sm:py-1 text-center "
        >
          <div className="flex w-full p-4 gap-4">
            <strong className="w-full p-4 bg-yellow-200 text-black rounded-md">
              {alertMessage}
            </strong>{" "}
          </div>
          <button
            onClick={() => onAlert("")}
            className="bg-blue-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded m-2"
          >
            ok
          </button>
        </div>
      </div>
    );
  }
}
