//  libs
import * as THREE from "three";
import * as CANNON from "cannon-es";

//  custom classes
import Experience from "../Experience";

export default class Ball {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    //  Resource
    this.resource = this.resources.items.bowling_ball;

    this.setModel();
  }

  setModel() {
    this.model = this.resource.scene;
    this.model.scale.set(0.2, 0.2, 0.2);
    this.model.position.set(0, 1, 18);
    this.scene.add(this.model);
  }
}
