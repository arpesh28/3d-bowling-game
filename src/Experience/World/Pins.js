import * as THREE from "three";
import * as CANNON from "cannon-es";
import Experience from "../Experience";

export default class Pins {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.model = {};

    this.resource = this.resources.items.bowling_pin;

    this.setPins();
  }

  setPins() {
    this.setModel("1", { x: -2, y: 0.55, z: 1 });
    this.setModel("2", { x: -1, y: 0.55, z: 1 });
    this.setModel("3", { x: 0, y: 0.55, z: 1 });
    this.setModel("4", { x: 1, y: 0.55, z: 1 });
    this.setModel("5", { x: 2, y: 0.55, z: 1 });
    this.setModel("6", { x: -1, y: 0.55, z: 2 });
    this.setModel("7", { x: 0, y: 0.55, z: 2 });
    this.setModel("8", { x: 1, y: 0.55, z: 2 });
    this.setModel("9", { x: 0, y: 0.55, z: 3 });
  }
  setModel(name, position) {
    this.model[name] = this.resource.scene.clone();
    this.model[name].scale.set(4, 4, 4);
    this.model[name].position.copy(position);
    this.scene.add(this.model[name]);
  }
}
