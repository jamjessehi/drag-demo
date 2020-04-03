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

  makeHold(e) {
    console.log("hold it 🤏");
    this.draggable.hold = true;
    const { clientX, clientY } = e;
    this.draggable.start = [clientX, clientY];
  }

  makeDrop() {
    if (this.draggable.hold) {
      console.log("drop it ✋");
      const { move } = this.draggable;
      this.draggable.hold = false;
      this.draggable.previous = move;
    }
  }

  makeMove(e) {
    if (this.draggable.hold) {
      console.log("moving...🏃‍♀️");
      const { clientX, clientY } = e;
      const { start, previous } = this.draggable;
      const [x, y] = start;
      const distance = [clientX - x, clientY - y];
      const move = [distance[0] + previous[0], distance[1] + previous[1]];
      this.draggable.move = move;

      this.translate(move);
    }
  }
}
