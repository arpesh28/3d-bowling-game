import * as THREE from "three";
import * as CANNON from "cannon-es";
import Experience from "../Experience";
export default class Mouse {
  constructor() {
    this.experience = new Experience();
    this.ball = this.experience.world.ball;
    this.pins = this.experience.world.pins;
    this.sounds = this.experience.world.sounds;

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
  removeEvents() {
    window.removeEventListener("mousedown", () => {});
    window.removeEventListener("mousemove", () => {});
    window.removeEventListener("mouseup", () => {});
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
      this.pushBall();
    }
    this.removeEvents();
  }

  pushBall() {
    this.sounds?.playSound("ballRolling");
    this.ball.ballBody.applyImpulse(this.force, this.ball.ballBody.position);
    // this.pins.bo.addEventListener("collide", (e) => {
    //   console.log(e);
    // });
  }
}
