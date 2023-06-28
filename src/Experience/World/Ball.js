//  libs
import * as THREE from "three";
import * as CANNON from "cannon-es";
import { createCannonShape } from "../misc/misc";

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
    this.setPhysics();
    this.setPhysics();
  }

  setModel() {
    this.model = this.resource.scene;
    this.model.scale.set(0.2, 0.2, 0.2);
    this.model.position.set(0, 3, 5);
    this.scene.add(this.model);
  }
  setPhysics() {
    this.setShape();
  }
  setShape() {
    this.model.traverse((child) => {
      if (child && child.isMesh && child.geometry) {
        // Create Cannon.js shape for the mesh
        this.ballShape = createCannonShape(child, child.geometry);
        this.setBody(child);
      }
    });
  }
  setBody(child) {
    this.ballBody = new CANNON.Body({
      mass: 1,
      shape: this.ballShape,
      material: this.experience.world.defaultMaterial,
    });
    this.ballBody.position.copy(child.position);
    this.ballBody.quaternion.copy(child.quaternion);
    this.experience.world.physics.addBody(this.ballBody);
    this.experience.world.physicsWorldObjects.push({
      mesh: child,
      body: this.ballBody,
    });
  }
}
