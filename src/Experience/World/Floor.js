import * as THREE from "three";
import * as CANNON from "cannon-es";
import Experience from "../Experience";

export default class Floor {
  constructor() {
    this.experience = new Experience();
    this.physics = this.experience.world.physics;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.floorWidth = 5;
    this.floorLength = 20;
    this.floorPosition = { x: 0, y: 0, z: 0 };
    this.floorRotation = new THREE.Quaternion();
    this.floorRotation.setFromAxisAngle(
      new THREE.Vector3(-1, 0, 0),
      Math.PI * 0.5
    );
    this.setGeometry();
    this.setTextures();
    this.setMaterial();
    this.setMesh();
    this.setPhysics();
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(this.floorWidth, this.floorLength);
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
      roughnessMap: this.textures.roughnessMap,
      metalnessMap: this.textures.metalnessMap,
      side: THREE.DoubleSide,
    });
  }
  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    // this.mesh.quaternion.copy(this.floorRotation);
    this.mesh.rotation.x = -Math.PI * 0.5;
    this.mesh.position.copy(this.floorPosition);
    // this.mesh.rotation.z = Math.PI * 0.25;
    this.mesh.receiveShadow = true;
    this.scene.add(this.mesh);
  }
  setPhysics() {
    this.setShape();
    this.setBody();
  }
  setShape() {
    this.floorShape = new CANNON.Plane();
  }
  setBody() {
    this.floorBody = new CANNON.Body({
      mass: 0,
      shape: this.floorShape,
    });
    // this.floorBody.type = CANNON.Body.STATIC;
    this.floorBody.quaternion.setFromAxisAngle(
      new CANNON.Vec3(-1, 0, 0),
      Math.PI * 0.5
    );
    this.floorBody.position.set(0, 0, 0);
    this.experience.world.physicsWorldObjects.push({
      mesh: this.mesh,
      body: this.floorBody,
    });
    this.physics.addBody(this.floorBody);
  }
}
