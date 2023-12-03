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
          <p>
            Hello again! I'm Soheil. As I continue on my journey with the{" "}
            <a
              href="https://www.getcoding.ca/"
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              target="_blank"
            >
              Get Coding{" "}
            </a>
            program, I've made some exciting advancements in the third module.
            Building upon my previous work with Vite, React, and TypeScript,
            I've now expanded my project into an online multiplayer game. This
            latest development involved integrating a robust backend using
            Node.js, TypeScript, Express, Cognito, MySQL, JWT, WebSocket, and
            TypeORM. My sincere thanks go to my coach,{" "}
            <a
              href="https://www.linkedin.com/in/brandon-bemister-40240866/"
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              target="_blank"
            >
              {" "}
              Brandon Bemister{" "}
            </a>
            , for his invaluable support and guidance in this module.
          </p>

          <p>
            Reflecting on my progress from the second module, I appreciate the
            foundational skills I developed using technologies like dnd kit,
            Tailwind, React Three Fibre, and React Router. The mentorship from
            <a
              href="https://www.linkedin.com/in/mitchell-hynes/"
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              target="_blank"
            >
              {" "}
              Mitchell Hynes{" "}
            </a>{" "}
            during this phase played a critical role in preparing me for the
            more complex challenges I faced in the subsequent module.
          </p>
          <p>
            Additionally, I'm thrilled to share that the game has been
            successfully deployed on AWS, showcasing my growing capabilities in
            both front-end and back-end development. My journey in programming
            is a testament to my dedication to continual learning and
            improvement in this ever-evolving field.
          </p>
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
