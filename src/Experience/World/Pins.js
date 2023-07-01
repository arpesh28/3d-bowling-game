import * as THREE from "three";
import * as CANNON from "cannon-es";
import Experience from "../Experience";
import Pin from "./Pin";

export default class Pins {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.world = this.experience.world;
    this.resources = this.experience.resources;

    this.resource = this.resources.items.bowling_pin;

    this.pinSize = { x: 0.5, y: 2, z: 0.5 };
    this.numRows = 4;
    this.rowOffset = 1;
    this.pinOffset = 0.5;
    this.pinsMeshModelBody = [];

    this.setGeometry();
    this.setMaterial();
    this.setShape();
    this.setPinMaterial();

    this.setPins();
  }
  setPins() {
    for (let row = 0; row < this.numRows; row++) {
      const numPins = this.numRows - row;

      for (let pos = 0; pos < numPins; pos++) {
        const x = pos - (numPins - 1) * 0.5;
        const z = row * this.rowOffset - 15;
        const position = { x, y: 1, z };
        const pin = new Pin(
          position,
          this.geometry,
          this.material,
          this.shape,
          this.pinMaterial
        );
        this.scene.add(pin.group);
      }
    }
  }
  setGeometry() {
    this.geometry = new THREE.BoxGeometry(
      this.pinSize.x,
      this.pinSize.y,
      this.pinSize.z
    );
  }
  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      // visible: false,
      wireframe: true,
      color: 0xffffff,
    });
  }
  setShape() {
    this.shape = new CANNON.Box(
      new CANNON.Vec3(
        this.pinSize.x / 2,
        this.pinSize.y / 2,
        this.pinSize.z / 2
      )
    );
  }
  setPinMaterial() {
    this.pinMaterial = new CANNON.Material("pin");
  }
}
