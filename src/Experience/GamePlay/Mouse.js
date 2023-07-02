import * as THREE from "three";
import * as CANNON from "cannon-es";
import Experience from "../Experience";
import EventEmitter from "../Utils/EventEmitter";

export default class Mouse {
  constructor() {
    this.experience = new Experience();
    this.ball = this.experience.world.ball;

    this.mouseStart = new THREE.Vector2();
    this.mouseEnd = new THREE.Vector2();
    this.isDragging = false;
    this.forceFactor = 0.05;

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
      this.force = new CANNON.Vec3(this.direction.x, 0, this.direction.y).scale(
        Math.min(this.distance * this.forceFactor, 22)
      );
      console.log(this.distance * this.forceFactor);
      this.pushBall();
    }
  }

  pushBall() {
    this.ball.ballBody.applyImpulse(this.force, this.ball.ballBody.position);
  }
}
