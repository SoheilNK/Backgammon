import Navbar from "./Navbar";
import { Footer } from "./Footer";
import React, { ComponentType, FC } from "react";
import { Props } from "@dnd-kit/core/dist/components/DragOverlay";

interface PageClassProps {
  inputComponent: FC<Props> | ComponentType<Props>;
}

class PageClass extends React.Component<PageClassProps> {
  render() {
    const { inputComponent: InputComponent } = this.props;

    return (
      <div
        id="PageClass"
        className="w-screen flex flex-col min-h-screen bg-slate-100  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
      >
        <Navbar title={"SoSep Backgammon"} />
        <div className=" bg-slate-100  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
          <div className="xl:container mx-auto px-4 flex-grow">
            <div className=" relative xl:w-3/4 p-1 bg-white  rounded-md  m-auto  dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
              <InputComponent />
            </div>
          </div>
        </div>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    );
  }
}

export default PageClass;

export function CreatePage(Content: React.FunctionComponent) {}
