import React from "react";

const AboutMe: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="py-4 px-4 mx-auto rounded-xl bg-white border-2 shadow-lg flex-col sm:flex sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 sm:py-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
        <p className="text-center sm:text-left space-y-2">
          <img
            className=" inline h-28 float-left m-4 rounded-full ring-2 ring-white"
            src="me.png"
            alt="Soheil"
          />
          <img
            src="ScreenShot.jpg"
            alt="backgammon"
            className="m-auto w-36 inline- float-right"
          />
          Well, hello there! I'm Soheil, and I love learning new things and
          improving my programing skills. As part of my coursework in the second
          module of the{" "}
          <a
            href="https://www.getcoding.ca/"
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            target="_blank"
          >
            Get Coding{" "}
          </a>
          program, I developed this game. Vite, React, and Typescript were the
          primary technologies I worked with on this project, along with a
          number of libraries, including dnd kit, Tailwind, React Three Fibre,
          and React Router. I'm always expanding my knowledge and working to
          better myself. I'd also like to express my gratitude to my coach,
          <a
            href="https://www.linkedin.com/in/mitchell-hynes/"
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            target="_blank"
          >
            {" "}
            Mitchell Hynes{" "}
          </a>
          , who has been an invaluable resource throughout this endeavor.
        </p>
        <br />
        <p className="text-center sm:text-left space-y-2">
          Here is the link to the GitHub repository for this project:
          <br />
          <a
            href="https://github.com/SoheilNK/Backgammon"
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            target="_blank"
          >
            SoSep Backgammon GitHub Repository
          </a>
        </p>
      </div>
    </div>
  );
};

export default AboutMe;
