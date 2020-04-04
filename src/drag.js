export default class Drag {
  constructor(
    translate,
    draggable = {
      hold: false,
      start: [0, 0],
      previous: [0, 0],
      move: [0, 0]
    }
  ) {
    this.translate = translate;
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

  makeMove([x, y]) {
    if (this.draggable.hold) {
      console.log("moving...🏃‍♀️");
      const { start, previous } = this.draggable;
      const [sx, sy] = start;
      const distance = [x - sx, y - sy];
      const move = [distance[0] + previous[0], distance[1] + previous[1]];
      this.draggable.move = move;

      this.translate(move);
    }
  }
}
