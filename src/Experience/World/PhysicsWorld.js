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
    this.physics.gravity.set(0, -9.82, 0);
  }
  setDefaultMaterial() {
    this.defaultMaterial = new CANNON.Material("default");
  }
}
