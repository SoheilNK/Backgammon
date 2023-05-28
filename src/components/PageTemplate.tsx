import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";

export default function CreatePage(Content: React.FunctionComponent) {
  return (
    <div className="  w-screen flex flex-col min-h-screen bg-slate-100 ">
      <Navbar title={"SoSep Backgammon"} />
      <div className=" w-screen  bg-slate-100  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
        <div className="container m-auto p-4 flex-grow">
          <div className=" relative sm:w-3/4 bg-white  rounded-md p-8 m-auto  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
            <Content />
          </div>
        </div>
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
