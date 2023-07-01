import * as THREE from "three";
import * as CANNON from "cannon-es";
import Experience from "../Experience";

export default class Pin {
  constructor(position, geometry, material, shape, pinMaterial) {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.world = this.experience.world;
    this.resources = this.experience.resources;

    //  Constructor Props
    this.position = position;
    this.geometry = geometry;
    this.material = material;
    this.shape = shape;
    this.pinMaterial = pinMaterial;

    this.resource = this.resources.items.bowling_pin;

    this.group = new THREE.Group();
    this.scene.add(this.group);

    this.setWireframe();
    this.setModel();
    this.setBody();
  }

  setWireframe() {
    this.wireframe = new THREE.Mesh(this.geometry, this.material);
    // this.wireframe.position.set(0, 0, 0);
    this.group.add(this.wireframe);
  }

  setBody() {
    this.body = new CANNON.Body({
      mass: 1,
      shape: this.shape,
      allowSleep: true,
      material: this.pinMaterial,
    });
    this.body.position.copy(this.position);
    this.world.physics.addBody(this.body);
    this.world.physicsWorldObjects.push({
      mesh: this.group,
      body: this.body,
    });
  }
  setModel() {
    this.model = this.resource.scene.clone();
    this.model.scale.set(0.5, 0.5, 0.5);
    this.model.castShadow = true;
    this.model.receiveShadow = true;
    this.model.position.copy(this.wireframe.position);
    this.model.position.set(0, -1, 0);
    this.model.quaternion.copy(this.wireframe.quaternion);
    this.model.traverse((child) => {
      child.receiveShadow = true;
      child.castShadow = true;
    });

    this.group.add(this.model);
  }
}
