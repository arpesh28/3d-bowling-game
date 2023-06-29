import * as THREE from "three";
import * as CANNON from "cannon-es";
import Experience from "../Experience";

export default class Pins {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.world = this.experience.world;
    this.resources = this.experience.resources;

    this.pinSize = { x: 0.5, y: 2, z: 0.5 };
    this.numRows = 4;
    this.rowOffset = 1;
    this.pinOffset = 0.5;
    this.pins = new THREE.Group();
    this.pinsMeshModelBody = [];
    this.scene.add(this.pins);

    this.resource = this.resources.items.bowling_pin;

    this.setGeometry();
    this.setMaterial();
    this.setShape();
    this.setPinMaterial();

    this.setPins();
  }
  setPins() {
    for (let row = 0; row < this.numRows; row++) {
      const numPins = this.numRows - row;

      for (let pin = 0; pin < numPins; pin++) {
        const x = pin - (numPins - 1) * 0.5;
        const z = row * this.rowOffset - 15;
        const position = { x, y: 1, z };
        const mesh = this.setMesh(position);
        const body = this.setBody(position);
        const model = this.setModel(position);

        this.scene.add(model, mesh);
        this.world.physics.addBody(body);
        this.world.physicsWorldObjects.push({ mesh, body });
        this.world.modelObjects.push({ model, body });
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
      visible: false,
      wireframe: true,
      color: 0xffffff,
    });
  }
  setMesh(position) {
    const mesh = new THREE.Mesh(this.geometry, this.material);
    mesh.position.copy(position);
    return mesh;
  }

  setShape() {
    this.pinShape = new CANNON.Box(
      new CANNON.Vec3(
        this.pinSize.x / 2,
        this.pinSize.y / 2,
        this.pinSize.z / 2
      )
    );
  }
  setBody(position) {
    const pinBody = new CANNON.Body({
      mass: 1,
      shape: this.pinShape,
      allowSleep: true,
      material: this.pinMaterial,
    });
    pinBody.position.copy(position);
    return pinBody;
  }
  setPinMaterial() {
    this.pinMaterial = new CANNON.Material("pin");
  }
  setModel(position) {
    const model = this.resource.scene.clone();
    model.scale.set(0.5, 0.5, 0.5);
    model.castShadow = true;
    model.receiveShadow = true;
    model.position.copy(position);
    model.traverse((child) => {
      child.receiveShadow = true;
      child.castShadow = true;
    });
    return model;
  }
}
