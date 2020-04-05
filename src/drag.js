export default class Drag {
  constructor(
    translate,
    options = {},
    draggable = {
      hold: false,
      start: [0, 0],
      previous: [0, 0],
      move: [0, 0]
    }
  ) {
    if (typeof translate !== "function") {
      throw new Error(`first arguments is not a function`);
    }

    this.translate = translate;
    this.options = options;
    this.draggable = draggable;
  }

  freshLimit(limit) {
    const { limit: initailLimit } = this.options || {};

    if (!initailLimit) {
      throw new Error(`limit doesn't initail in constructor`);
    }

    this.options.limit = limit;
    this.freshPos();
  }

  freshPos() {
    const { limit } = this.options || {};

    if (!limit) {
      return;
    }

    const { x: lx, y: ly } = limit;

    const {
      move: [mx, my]
    } = this.draggable;

    let x = mx;
    x = x > lx[0] ? x : lx[0];
    x = x < lx[1] ? x : lx[1];

    let y = my;
    y = y > ly[0] ? y : ly[0];
    y = y < ly[1] ? y : ly[1];

    this.translate([x, y]);
  }

  makeHold([x, y]) {
    console.log("hold it 🤏");
    this.draggable.hold = true;
    this.draggable.start = [x, y];
  }

  makeDrop() {
    if (this.draggable.hold) {
      console.log("drop it ✋");
      const { move } = this.draggable;
      this.draggable.hold = false;
      this.draggable.previous = move;
    }
  }

  limit([x, y]) {
    const { limit } = this.options || {};

    if (!limit) {
      return [x, y];
    }

    const { limit: { x: lx, y: ly } = {} } = this.options || {};

    let mx = x > lx[0] ? x : 0;
    mx = mx < lx[1] ? mx : lx[1];

    let my = y > ly[0] ? y : 0;
    my = my < ly[1] ? my : ly[1];

    return [mx, my];
  }

  makeMove([x, y]) {
    if (this.draggable.hold) {
      console.log("moving...🏃‍♀️");
      const { start, previous } = this.draggable;
      const [sx, sy] = start;
      const distance = [x - sx, y - sy];
      let mx = distance[0] + previous[0];
      let my = distance[1] + previous[1];

      const move = this.limit([mx, my]);

      this.draggable.move = move;

      this.translate(move);
    }
  }
}
