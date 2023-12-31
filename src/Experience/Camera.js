//  libs
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

//  custom classes
import Experience from "./Experience";

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.gui = this.experience.gui.dat;

    this.setInstance();
    this.setOrbitControls();
    this.setDebug();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );
    this.instance.position.set(0, 10, 24);
    this.scene.add(this.instance);
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
    // this.controls.enablePan = false;
    // this.controls.enableRotate = false;
    this.controls.enabled = false;
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }
  setDebug() {
    this.gui.add(this.instance.position, "x", -Math.PI * 2, Math.PI * 2, 0.05);
  }
  update() {
    this.controls.update();
  }
}
