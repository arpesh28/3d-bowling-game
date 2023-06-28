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
    this.position = new THREE.Vector3(0, 2, 8);
    this.world = this.experience.world;
    //  Resource
    this.resource = this.resources.items.bowling_ball;

    this.setModel();
    this.setGeometry();
    this.setMaterial();
    this.setMesh();
    this.setPhysics();
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
    this.scene.add(this.mesh);
  }

  setModel() {
    this.model = this.resource.scene;
    this.model.position.copy(this.position);
    this.model.scale.set(0.2, 0.2, 0.2);
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
    this.world.physics.addBody(this.ballBody);
  }
  setBallMaterial() {
    this.ballMaterial = new CANNON.Material("ball");
  }
}
