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
    this.setTextures();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(5, this.floorLength);
  }
  setTextures() {
    this.textures = {};

    this.textures.color = this.resources.items.colorFloor;
    this.textures.color.colorSpace = THREE.SRGBColorSpace;

    this.textures.aoMap = this.resources.items.aoFloor;
    this.textures.normalMap = this.resources.items.normalFloor;
    this.textures.displacementMap = this.resources.items.dispFloor;
    this.textures.roughnessMap = this.resources.items.roughFloor;
    this.textures.metalnessMap = this.resources.items.metalFloor;
  }
  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      map: this.textures.color,
      aoMap: this.textures.aoMap,
      normalMap: this.textures.normalMap,
      displacementMap: this.textures.displacementMap,
      roughnessMap: this.textures.roughnessMap,
      metalnessMap: this.textures.metalnessMap,
    });
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
