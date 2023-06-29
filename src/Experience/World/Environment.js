//  libs
import * as THREE from "three";
import { GroundProjectedSkybox } from "three/addons/objects/GroundProjectedSkybox.js";

//  custom classes
import Experience from "../Experience";

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.resource = this.resources.items.bowling_alley;
    this.gui = this.experience.gui.dat;
    this.setSunlight();
    this.setEnvironmentMap();
    this.setModel();
    this.setDebug();
  }

  setSunlight() {
    this.sunlight = new THREE.DirectionalLight("#ffffff", 4);
    this.sunlight.castShadow = true;
    this.sunlight.shadow.camera.far = 15;
    this.sunlight.shadow.mapSize.set(1024, 1024);
    this.sunlight.shadow.normalBias = 0.05;
    this.sunlight.position.set(3.5, 2, -1.25);
    this.scene.add(this.sunlight);
  }
  setDebug() {
    // this.gui.add(this.skybox, "scale", 1, 100, 1);
    this.debug = { scale: 50 };
    // this.gui.add(this.skybox, "radius", 1, 100, 1);
    // this.gui.add(this.skybox, "height", 1, 100, 0.1);
    // this.gui
    //   .add(this.debug, "scale", 1, 100, 0.1)
    //   .onChange((val) => this.skybox.scale.setScalar(val));
    this.gui.add(this.model.position, "x", -100, 100, 0.1);
    this.gui.add(this.model.position, "y", -100, 100, 0.1);
    this.gui.add(this.model.position, "z", -100, 100, 0.1);
  }
  setEnvironmentMap() {
    this.environmentMap = {};
    this.environmentMap.intensity = 0.3;
    this.environmentMap.texture = this.resources.items.stadiumMap;
    this.environmentMap.texture.mapping =
      THREE.EquirectangularReflectionMapping;
    this.environmentMap.texture.colorSpace = THREE.SRGBColorSpace;
    this.scene.environment = this.environmentMap.texture;
    // this.scene.background = this.environmentMap.texture;
    this.scene.rotation.set(0, Math.PI * 0.5, 0);
    // this.scene.position.set(0, 0, 0);

    this.setEnvironmentMap.updateMaterials = () => {
      this.scene.traverse((child) => {
        if (
          child.isMesh &&
          child.material instanceof THREE.MeshStandardMaterial
        ) {
          child.material.envMap = this.environmentMap.texture;
          child.material.envMapIntensity = this.environmentMap?.intensity;
          child.material.needsUpdate = true;
        }
      });
    };
    this.setEnvironmentMap.updateMaterials();
  }

  setModel() {
    this.model = this.resource.scene;
    this.model.position.set(-1, 5.7, 60);
    this.model.scale.set(3, 3, 3);
    this.scene.add(this.model);
  }
}
