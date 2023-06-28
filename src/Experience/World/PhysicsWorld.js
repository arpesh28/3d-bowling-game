import * as CANNON from "cannon-es";

export default class PhysicsWorld {
  constructor() {
    //  setup
    this.setWorld();
  }
  setWorld() {
    this.physics = new CANNON.World();
    this.physics.broadphase = new CANNON.SAPBroadphase(this.physics);
    this.physics.allowSleep = true;
    this.physics.gravity = new CANNON.Vec3(0, 0, -9.82);
  }
  setDefaultMaterial() {
    this.defaultMaterial = new CANNON.Material("default");
    this.defaultContactMaterial = new CANNON.ContactMaterial(
      this.defaultMaterial,
      this.defaultMaterial,
      { friction: 0.1, restitution: 0.7 }
    );
    this.physics.defaultContactMaterial = this.defaultContactMaterial;
  }
}
