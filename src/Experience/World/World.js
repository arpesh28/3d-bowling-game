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

//  GamePlay
import GamePlay from "../GamePlay/GamePlay";
import Sounds from "../GamePlay/Sounds";

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
      this.sounds = new Sounds();
      this.gamePlay = new GamePlay();

      //  Set Contacts
      this.setBallContactMaterial(this.ball.ballMaterial);
      this.setPinBallContactMaterial(
        this.ball.ballMaterial,
        this.pins.pinMaterial
      );
      this.setPinPinContactMaterial(this.pins.pinMaterial);
    });
  }
  update() {
    this.physics.step(1 / 60, this.experience.time.delta, 3);
    for (const object of this.physicsWorldObjects) {
      object.mesh.position.copy(object.body.position);
      object.mesh.quaternion.copy(object.body.quaternion);
    }
  }
}
