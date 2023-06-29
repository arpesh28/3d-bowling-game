//  libs
import * as THREE from "three";
import * as CANNON from "cannon-es";

//  custom classes
import Experience from "../Experience";
import Environment from "./Environment";
import Ball from "./Ball";
import Floor from "./Floor";
import Pins from "./Pins";
import PhysicsWorld from "./PhysicsWorld";

export default class World extends PhysicsWorld {
  constructor() {
    super();
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.physicsWorldObjects = [];
    this.modelObjects = [];
    //  Wait for resources
    this.resources.on("resourcesReady", () => {
      //  Setup
      this.floor = new Floor();
      this.ball = new Ball();
      this.pins = new Pins();
      this.environment = new Environment();

      //  Set Contacts
      this.setBallContactMaterial(this.ball.ballMaterial);
      this.setPinBallContactMaterial(
        this.ball.ballMaterial,
        this.pins.pinMaterial
      );
      this.setPinPinContactMaterial(this.pins.pinMaterial);
      window.addEventListener("click", () => {
        this.ball.ballBody.applyImpulse(new CANNON.Vec3(0, 0, -50));
      });
    });
  }
  update() {
    this.physics.step(1 / 60, this.experience.time.delta, 3);
    for (const object of this.physicsWorldObjects) {
      object.mesh.position.copy(object.body.position);
      object.mesh.quaternion.copy(object.body.quaternion);
    }
    for (const object of this.modelObjects) {
      object.model.position.copy(object.body.position);
      object.model.quaternion.copy(object.body.quaternion);
    }
  }
}
