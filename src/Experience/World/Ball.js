//  libs
import * as THREE from "three";
import * as CANNON from "cannon-es";

//  custom classes
import Experience from "../Experience";

export default class Ball {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.gui = this.experience.gui.dat.addFolder("Ball");
    this.position = new THREE.Vector3(0, 2, 12);
    this.world = this.experience.world;
    //  Resource
    this.resource = this.resources.items.bowling_ball;

    this.setModel();
    this.setGeometry();
    this.setMaterial();
    this.setMesh();
    this.setPhysics();
    this.debug();
  }
  debug() {
    this.gui.add(this.ballBody.position, "x", -3, 3, 0.1);
    this.gui.add(this.ballBody.position, "y", 0.12, 10, 0.01);
    this.gui.add(this.ballBody.position, "z", -40, 30, 0.1);
  }
  setGeometry() {
    this.geometry = new THREE.SphereGeometry(0.523);
  }
  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      visible: false,
      color: 0xffffff,
    });
  }
  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.copy(this.position);
    this.mesh.castShadow = true;
    this.scene.add(this.mesh);
  }

  setModel() {
    this.model = this.resource.scene;
    this.model.position.copy(this.position);
    this.model.scale.set(0.2, 0.2, 0.2);
    this.model.castShadow = true;
    this.model.receiveShadow = true;
    this.model.traverse((child) => {
      child.receiveShadow = true;
      child.castShadow = true;
    });
    this.scene.add(this.model);
  }
  setPhysics() {
    this.setShape();
    this.setBallMaterial();
    this.setBody();
  }
  setShape() {
    this.ballShape = new CANNON.Sphere(0.523);
  }
  setBody(child) {
    this.ballBody = new CANNON.Body({
      mass: 1,
      shape: this.ballShape,
      material: this.ballMaterial,
    });
    this.ballBody.position.copy(this.position);
    this.world.physicsWorldObjects.push({
      mesh: this.mesh,
      body: this.ballBody,
    });
    this.world.modelObjects.push({ model: this.model, body: this.ballBody });
    this.world.physics.addBody(this.ballBody);
  }
  setBallMaterial() {
    this.ballMaterial = new CANNON.Material("ball");
  }
}
