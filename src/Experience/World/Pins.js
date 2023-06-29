import * as THREE from "three";
import * as CANNON from "cannon-es";
import Experience from "../Experience";

export default class Pins {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.world = this.experience.world;
    this.resources = this.experience.resources;
    this.pinSize = { x: 0.5, y: 0.5, z: 0.5 };

    this.resource = this.resources.items.bowling_pin;

    this.setPins();

    this.setGeometry();
    this.setMaterial();
    this.setMesh();
    this.setPhysics();
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
  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(0, 1, 0);
    this.scene.add(this.mesh);
  }
  setPhysics() {
    this.setShape();
    this.setPinMaterial();
    this.setBody();
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
  setBody() {
    this.pinBody = new CANNON.Body({
      mass: 1,
      shape: this.pinShape,
      allowSleep: true,
    });
    this.pinBody.position.copy(this.mesh.position);
    this.world.physics.addBody(this.pinBody);
    this.world.physicsWorldObjects.push({
      mesh: this.mesh,
      body: this.pinBody,
    });
    this.world.modelObjects.push({ model: this.model, body: this.pinBody });
  }
  setPinMaterial() {}
  setPins() {
    this.setModel("1", { x: 0, y: 3, z: -4 });
    // this.setModel("2", { x: -1, y: 0.55, z: 1 });
    // this.setModel("3", { x: 0, y: 0.55, z: 1 });
    // this.setModel("4", { x: 1, y: 0.55, z: 1 });
    // this.setModel("5", { x: 2, y: 0.55, z: 1 });
    // this.setModel("6", { x: -1, y: 0.55, z: 2 });
    // this.setModel("7", { x: 0, y: 0.55, z: 2 });
    // this.setModel("8", { x: 1, y: 0.55, z: 2 });
    // this.setModel("9", { x: 0, y: 0.55, z: 3 });
  }
  setModel(name, position) {
    // this.model = this.resource.scene.clone();
    this.model = this.resource.scene;
    this.model.scale.set(0.5, 0.5, 0.5);
    this.model.castShadow = true;
    this.model.receiveShadow = true;
    this.model.position.copy(position);
    this.model.traverse((child) => {
      child.receiveShadow = true;
      child.castShadow = true;
    });

    this.scene.add(this.model);
  }
}
