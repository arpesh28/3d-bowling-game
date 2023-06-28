//  libs
import * as THREE from "three";

//  custom classes
import Experience from "../Experience";
import Environment from "./Environment";
import Ball from "./Ball";
import Floor from "./Floor";
import Pins from "./Pins";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    //  Wait for resources
    this.resources.on("resourcesReady", () => {
      //  Setup
      this.floor = new Floor();
      this.ball = new Ball();
      this.pins = new Pins();
      this.environment = new Environment();
    });
  }
}
