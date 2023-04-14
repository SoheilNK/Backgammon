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
    <div className="grid-container-bar">
      <div className={outAllowed1}>
        {whiteOut >= 0 ? (
          <DropOut id="whiteOut">
            <span>{whiteOut}</span>
            {Array.from(Array(whiteOut).keys()).map((i) => (
              <Checker
                title={"wHit_" + i}
                key={"wihtOut_" + i}
                clr={"White"}
                parent={"Out"}
                disabled={true}
              />
            ))}
          </DropOut>
        ) : (
          <div className="whiteOut"></div>
        )}
      </div>
      <div className={outAllowed2}>
        {blackOut >= 0 ? (
          <DropOut id="blackOut">
            <span>{blackOut}</span>
            {Array.from(Array(blackOut).keys()).map((i) => (
              <Checker
                title={"bHit_" + i}
                key={"blackOut_" + i}
                clr={"Black"}
                parent={"Out"}
                disabled={true}
              />
            ))}
          </DropOut>
        ) : (
          <div className="blackOut"></div>
        )}
      </div>
    </div>
  );
}
interface DroppableProps {
  id: string;
  children: React.ReactNode;
}
function DropOut({ id, children }: DroppableProps) {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{ border: isOver ? "2px solid #ccc" : "2px solid transparent" }}
    >
      {children}
    </div>
  );
}
