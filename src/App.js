import React, { useEffect, useRef, useState } from "react";
import Drag from "./drag";
import "./App.css";

const DragContent = () => {
  const dragRef = useRef({});

  const boxWrapRef = useRef(null);
  const boxRef = useRef(null);

  useEffect(() => {
    function translate([left, top]) {
      boxRef.current.style.left = `${left}px`;
      boxRef.current.style.top = `${top}px`;
    }

    dragRef.current = new Drag(translate, {
      limit: {
        x: [0, boxWrapRef.current.offsetWidth - boxRef.current.offsetWidth],
        y: [0, boxWrapRef.current.offsetHeight - boxRef.current.offsetHeight]
      }
    });

    const drag = dragRef.current;

    const makeDrop = function() {
      drag.makeDrop();
    };

    const mouseMove = function(e) {
      const { clientX, clientY } = e;
      drag.makeMove([clientX, clientY]);
    };

    const touchMove = function(e) {
      const { clientX, clientY } = e.touches[0];
      drag.makeMove([clientX, clientY]);
    };

    const events = [
      {
        ele: document.body,
        name: "mousemove",
        fn: mouseMove
      },
      {
        ele: document.body,
        name: ["mouseup", "mouseleave", "touchend", "touchleave"],
        fn: makeDrop
      },

      {
        ele: document.body,
        name: "touchmove",
        fn: touchMove
      }
    ];

    function manageEvents(method = "addEventListener") {
      events.forEach(({ ele, name, fn }) => {
        if (Array.isArray(name)) {
          name.forEach(item => {
            ele[method](item, fn, false);
          });
        } else {
          ele[method](name, fn, false);
        }
      });
    }

    manageEvents();

    return () => {
      manageEvents("removeEventListener");
    };
  }, []);

  function makeHold([x, y]) {
    const drag = dragRef.current;
    drag.makeHold([x, y]);
  }

  function touchHold(e) {
    const { clientX, clientY } = e.touches[0];
    makeHold([clientX, clientY]);
  }

  function mouseHold(e) {
    const { clientX, clientY } = e;
    makeHold([clientX, clientY]);
  }

  return (
    <div className="container">
      <div className="box-wrap" ref={boxWrapRef}>
        <div
          ref={boxRef}
          className="box"
          onMouseDown={mouseHold}
          onTouchStart={touchHold}
        />
      </div>
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
