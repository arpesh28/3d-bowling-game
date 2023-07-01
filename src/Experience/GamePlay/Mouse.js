import * as THREE from "three";
import Experience from "../Experience";
import EventEmitter from "../Utils/EventEmitter";

export default class Mouse {
  constructor() {
    this.experience = new Experience();

    this.mouseStart = new THREE.Vector2();
    this.mouseEnd = new THREE.Vector2();
    this.isDragging = false;

    this.addEvents();
    this.onMouseDown();
  }

  addEvents() {
    window.addEventListener("mousedown", (e) => {
      this.onMouseDown(e);
    });
    window.addEventListener("mousemove", (e) => {
      this.onMouseDrag(e);
    });
    window.addEventListener("mouseup", (e) => {
      this.onMouseUp(e);
    });
  }

  onMouseDown(e) {
    this.isDragging = true;
    this.mouseStart.set(e?.clientX, e?.clientY);
  }

  onMouseDrag(e) {
    if (this.isDragging) {
      this.mouseEnd.set(e?.clientX, e?.clientY);
    }
  }

  onMouseUp(e) {
    if (this.isDragging) {
      this.isDragging = false;
      this.direction = new THREE.Vector2()
        .subVectors(this.mouseEnd, this.mouseStart)
        .normalize();
      this.distance = this.mouseEnd.distanceTo(this.mouseStart);
      // this.pushBall();
    }
  }

  // pushBall(isDragging, ball) {
  //   // if (isDragging !== this.isDragging) {
  //   console.log(isDragging, this.isDragging, ball);
  //   // }
  // }
}
