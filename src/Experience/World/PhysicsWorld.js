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
    this.physics.gravity = new CANNON.Vec3(0, -9.82, 0);
    this.setDefaultMaterial();
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
  setBallContactMaterial(ballMaterial) {
    this.ballDefaultContactMaterial = new CANNON.ContactMaterial(
      this.defaultMaterial,
      ballMaterial,
      { friction: 0.2, restitution: 0.6 }
    );
    this.physics.addContactMaterial(this.ballDefaultContactMaterial);
  }
  setPinBallContactMaterial(ballMaterial, pinMaterial) {
    this.pinBallContactMaterial = new CANNON.ContactMaterial(
      pinMaterial,
      ballMaterial,
      { friction: 0.2, restitution: 2 }
    );
    this.physics.addContactMaterial(this.pinBallContactMaterial);
  }
  setPinPinContactMaterial(pinMaterial) {
    this.pinPinContactMaterial = new CANNON.ContactMaterial(
      pinMaterial,
      pinMaterial,
      { friction: 0.2, restitution: 1.5 }
    );
    this.physics.addContactMaterial(this.pinPinContactMaterial);
  }
}
