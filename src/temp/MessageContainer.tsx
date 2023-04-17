import { useState } from "react";
import classNames from "classnames";


export function MessageContainer(): JSX.Element {
  const [messages, setMessages] = useState<string[]>([]);
  const [showFlash, setShowFlash] = useState(false);

  // function to add a new message to the container
  const addMessage = (newMessage: string): void => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setShowFlash(true);
    // remove the flash after 1.5 seconds
    setTimeout(() => {
      setShowFlash(false);
    }, 1500);
  };

  return (
    <div className="relative">
          <button className="bg-blue-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => addMessage("New message")}>Add message
              
          </button>
          
          
      <div
        className={classNames(
          "absolute right-0 top-0 w-5 h-5 rounded-full bg-green-500",
          {
            "opacity-0": !showFlash,
            "opacity-100": showFlash,
            "animate-ping": showFlash,
          }
        )}
      ></div>

      {/* message container */}
      <div className="p-4 bg-gray-100 border border-gray-200 rounded-lg">
        {messages.map((message, index) => (
          <div key={index} className="mb-2">
            {message}
          </div>
        ))}
      </div>
    </div>
  );
}
