import * as THREE from "three";
import Experience from "../Experience";

export default class Floor {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.floorWidth = 5;
    this.floorLength = 20;
    this.setGeometry();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(5, this.floorLength);
  }
  setMaterial() {
    this.material = new THREE.MeshBasicMaterial({ color: "#ffffff" });
  }
  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x = -Math.PI * 0.5;
    this.mesh.position.z = this.floorLength / 2;
    // this.mesh.rotation.z = Math.PI * 0.25;
    this.mesh.receiveShadow = true;
    this.scene.add(this.mesh);
  }
}
