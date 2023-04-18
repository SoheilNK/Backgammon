import { useDroppable } from "@dnd-kit/core";

import { Checker } from "./Points";
import classNames from "classnames";

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


  return (
    <div className="grid-container-out">
      <div className={outAllowed1}>
        { 
          <DropOut id="whiteOut" disabled={!allowedColumns.includes(100)}>
            <span>{whiteOut}</span>
            {whiteOut >= 0 && Array.from(Array(whiteOut).keys()).map((i) => (
              <Checker
                title={"wHit_" + i}
                key={"wihtOut_" + i}
                clr={"White"}
                parent={"Out"}
                disabled={true}
              />
            ))}
          </DropOut>
        }
      </div>
      <div className={outAllowed2}>
        {
          <DropOut id="blackOut" disabled={!allowedColumns.includes(200)}>
            <span>{blackOut}</span>
            {blackOut >= 0 && Array.from(Array(blackOut).keys()).map((i) => (
              <Checker
                title={"bHit_" + i}
                key={"blackOut_" + i}
                clr={"Black"}
                parent={"Out"}
                disabled={true}
              />
            ))}
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
      className="flex flex-wrap items-center justify-center"
      ref={setNodeRef}
      // style={{ border: isOver ? "2px solid #ccc" : "2px solid transparent" }}
    >
      {children}
    </div>
  );
}
