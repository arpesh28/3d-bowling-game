import * as THREE from "three";
import Experience from "../Experience";

export default class Helpers {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.setAxes();
  }
  setAxes() {
    this.axesHelper = new THREE.AxesHelper(5);
    this.scene.add(this.axesHelper);
  }
}
