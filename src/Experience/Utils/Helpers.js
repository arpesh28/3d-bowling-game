import * as THREE from "three";
import Experience from "../Experience";

export default class Helpers {
  constructor() {
    this.experience = new Experience();
    this.resources = this.experience.resources;
    this.world = this.experience.world;
    this.environment = this.world.environment;
    this.scene = this.experience.scene;

    this.setAxes();
  }
  setAxes() {
    this.axesHelper = new THREE.AxesHelper(5);
    // this.scene.add(this.axesHelper);
  }
  setLightHelper(type, light) {
    if (type === "sunlightHelper") {
      this.sunLightHelper = new THREE.DirectionalLightHelper(light, 20);
      // this.sunLightHelper.visible = false
      this.scene.add(this.sunLightHelper);
    } else if (type === "spotLightHelper") {
      this.spotlightHelper = new THREE.SpotLightHelper(light);
      // this.spotlightHelper.visible = false;
      this.scene.add(this.spotlightHelper);
    }
  }
}
