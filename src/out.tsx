import { useDroppable } from "@dnd-kit/core";

import { Checker } from "./Points";
import classNames from "classnames";
import { styled } from "@chakra-ui/react";

interface OutProps {
  whiteOut: number;
  blackOut: number;
  currentPlayer: string;
  allowedColumns: number[];
}
export default function Out({
  whiteOut,
  blackOut,
  currentPlayer,
  allowedColumns,
}: OutProps): JSX.Element {
  const outAllowed1 = classNames("out", {
    outAllowed: allowedColumns.includes(100),
  });
  const outAllowed2 = classNames("out", {
    outAllowed: allowedColumns.includes(200),
  });


  let d = 0;
  var r = document.querySelector(":root") as HTMLElement;
  var rs = getComputedStyle(r);
  var checker = parseInt(rs.getPropertyValue("--checkerSize")) * 18; //convert rem to px
  // r.style.setProperty("--fontSize", "40px");
  

  return (
    <div className="flex flex-row">
      <div className={outAllowed1}>
        {
          <DropOut id="whiteOut" disabled={!allowedColumns.includes(100)}>
            {whiteOut >= 0 &&
              Array.from(Array(whiteOut).keys()).map(
                (i) => (
                  whiteOut <= 6
                    ? (d = checker * i)
                    : (d = ((checker * 6) / whiteOut) * i),
                  (
                    <div
                      key={"wihtOut_" + i}
                      style={{ right: d + "px" }}
                      className={"absolute top-0 bottom-0"}
                    >
                      <Checker
                        title={"wHit_" + i}
                        clr={"White"}
                        parent={"Out"}
                        disabled={true}
                      />
                    </div>
                  )
                )
              )}
          </DropOut>
        }
      </div>
      <div className=" m-auto checker">
        <img src="pitcherPlant.png" />
      </div>
      <div className={outAllowed2}>
        {
          <DropOut id="blackOut" disabled={!allowedColumns.includes(200)}>
            {blackOut >= 0 &&
              Array.from(Array(blackOut).keys()).map(
                (i) => (
                  blackOut <= 6
                    ? (d = checker * i)
                    : (d = ((checker * 6) / blackOut) * i),
                  (
                    <div
                      key={"blackOut_" + i}
                      style={{ left: d + "px" }}
                      className={"absolute top-0 bottom-0"}
                    >
                      <Checker
                        title={"bHit_" + i}
                        clr={"Black"}
                        parent={"Out"}
                        disabled={true}
                      />
                    </div>
                  )
                )
              )}
          </DropOut>
        }
      </div>
    </div>
  );
}
interface DropOutProps {
  id: string;
  children: React.ReactNode;
  disabled: boolean;
}
function DropOut({ id, children, disabled }: DropOutProps) {
  const { isOver, setNodeRef } = useDroppable({ id, disabled });

  return (
    <div
      className=" relative flex flex-wrap min-h-full  items-center justify-center"
      ref={setNodeRef}
      // style={{ border: isOver ? "2px solid #ccc" : "2px solid transparent" }}
    >
      {children}
    </div>
  );
}
