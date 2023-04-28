import React from "react";

const AboutBackgammon: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <h1 className=" text-xl text-black text-clip font-bold  m-4">
          About Backgammon
        </h1>
      </div>
      <div className="py-8 px-8 sm:w-3/4 mx-auto rounded-xl bg-white border-2 shadow-lg sm:flex sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 sm:py-4">
        <div className="text-center sm:text-left space-y-2">
          <p className="">
            Backgammon is a classic two-player board game that involves strategy
            and luck. The objective of the game is to move all of your checkers
            around the board and into your home board before your opponent does
            the same.
          </p>
          <p>
            The board is divided into four quadrants, each with six points, for
            a total of 24 points. The points are numbered from 1 to 24, starting
            from the top right quadrant and moving in a counterclockwise
            direction. Each player has 15 checkers of their own color, which
            they move around the board according to the roll of two dice.
          </p>
          <p>
            Backgammon has a long history, with evidence of its existence dating
            back more than 5,000 years. It has been played by people from all
            over the world, and is considered a challenging and rewarding game
            that requires skill, strategy, and a bit of luck.
          </p>
          <p>
            This Backgammon game was built using React and TypeScript, two
            powerful technologies for building fast, responsive web
            applications. I hope you enjoy playing the game and improving your
            Backgammon skills!
          </p>
        </div>
      </div>
      <div className="py-8 px-8 sm:w-3/4 mx-auto rounded-xl bg-white border-2 shadow-lg sm:flex sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 sm:py-4">
        <p className="text-center sm:text-left space-y-2">
          To learn more about this game and it's rulls, please visit the
          following links:
          <br />
          <br />
          <a
            href="https://www.bkgm.com/rules.html"
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            target="_blank"
          >
            Backgammon Rules
          </a>
          <br />
          <a
            href="https://en.wikipedia.org/wiki/Backgammon"
            className="font-medium text-blue-600 dark:text-blue-500
            hover:underline"
            target="_blank"
          >
            Backgammon Wikipedia
          </a>
        </p>
      </div>
    </div>
  );
};

export default AboutBackgammon;
