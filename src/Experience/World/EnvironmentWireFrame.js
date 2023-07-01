import * as THREE from "three";
import * as CANNON from "cannon-es";
import Experience from "../Experience";

export default class EnvironmentWireFrame {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.world = this.experience.world;
    this.gui = this.experience.gui.dat.addFolder("Arena");

    this.group = new THREE.Group();
    this.scene.add(this.group);

    this.setBox();
    this.setPhysics();
  }

  setBox() {
    this.setShape();

    //  Back Plane
    this.backPlane = this.setPhysics();
    this.backPlane.position.z = -19.5;
    this.world.physics.addBody(this.backPlane);

    //  Left Plane
    this.leftPlane = this.setPhysics();
    this.leftPlane.quaternion.setFromAxisAngle(
      new CANNON.Vec3(0, 1, 0),
      Math.PI * 0.5
    );
    this.leftPlane.position.x = -6.3;
    this.world.physics.addBody(this.leftPlane);

    //  Right Plane
    this.rightPlane = this.setPhysics();
    this.rightPlane.quaternion.setFromAxisAngle(
      new CANNON.Vec3(0, 1, 0),
      -Math.PI * 0.5
    );
    this.rightPlane.position.x = 6.3;
    this.world.physics.addBody(this.rightPlane);
  }
  setShape() {
    this.shape = new CANNON.Plane();
  }

  setPhysics() {
    const body = new CANNON.Body({
      mass: 0,
      shape: this.shape,
    });
    return body;
  }
}
