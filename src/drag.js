export default class Drag {
  constructor(
    translate,
    options = {
      limit: {
        x: [0, 0],
        y: [0, 0]
      }
    },
    draggable = {
      hold: false,
      start: [0, 0],
      previous: [0, 0],
      move: [0, 0]
    }
  ) {
    this.translate = translate;
    this.options = options;
    this.draggable = draggable;
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
