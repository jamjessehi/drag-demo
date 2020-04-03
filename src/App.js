import React, { useEffect, useRef, useState } from "react";
import Drag from "./drag";
import "./App.css";

const DragContent = () => {
  const dragRef = useRef({});

  const boxRef = useRef(null);

  useEffect(() => {
    function translate([left, top]) {
      boxRef.current.style.left = `${left}px`;
      boxRef.current.style.top = `${top}px`;
    }

    dragRef.current = new Drag(translate);

    const drag = dragRef.current;

    const makeMove = function(e) {
      drag.makeMove(e);
    };
    const makeDrop = function(e) {
      drag.makeDrop(e);
    };

    document.body.addEventListener("mousemove", makeMove, false);
    document.body.addEventListener("mouseup", makeDrop, false);
    document.body.addEventListener("mouseleave", makeDrop, false);

    return () => {
      document.body.removeEventListener("mousemove", makeMove, false);
      document.body.removeEventListener("mouseup", makeDrop, false);
      document.body.removeEventListener("mouseleave", makeDrop, false);
    };
  }, []);

  function makeHold(e) {
    const drag = dragRef.current;
    drag.makeHold(e);
  }

  return (
    <div className="container">
      <div ref={boxRef} className="box" onMouseDown={makeHold} />
    </div>
  );
};

export default () => {
  const [leave, toggleLeave] = useState(false);
  return (
    <div>
      <div className="haed">
        <div className="head-link" onClick={() => toggleLeave(!leave)}>
          {leave ? "enter DragContent" : "Leave DragContent"}
        </div>
      </div>
      {leave === false && <DragContent />}
    </div>
  );
};
