import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import React, { ComponentType, FC } from "react";
import { Props } from "@dnd-kit/core/dist/components/DragOverlay";

interface PageClassProps {
  //   inputComponent: ComponentType;
  inputComponent: FC<Props> | ComponentType<Props>;
}


class PageClass extends React.Component<PageClassProps> {
  render() {
    const { inputComponent: InputComponent } = this.props;

    // You can perform any logic or manipulation here before rendering the output component

    // const outputProps: OutputProps = {
    //   // Pass the necessary props to the output component
    // };

return (
  <div className="  w-screen flex flex-col min-h-screen bg-slate-100 ">
    <Navbar title={"SoSep Backgammon"} />
    <div className=" w-screen  bg-slate-100  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
      <div className="container m-auto p-4 flex-grow">
        <div className=" relative sm:w-3/4 bg-white  rounded-md p-8 m-auto  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
          <InputComponent />
        </div>
      </div>
    </div>
    <div className="mt-auto">
      <Footer />
    </div>
  </div>
);  }
}

export default PageClass;








export  function CreatePage(Content: React.FunctionComponent) {
  
}
